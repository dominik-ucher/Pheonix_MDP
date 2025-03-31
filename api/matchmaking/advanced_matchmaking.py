from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import string
from rake_nltk import Rake
import nltk
from sentence_transformers import SentenceTransformer, util

# --- Ensure NLTK Resources Are Available ---
def ensure_nltk_resources():
    resources = ['stopwords', 'punkt']
    for resource in resources:
        try:
            nltk.data.find(f'corpora/{resource}') if resource == 'stopwords' else nltk.data.find(f'tokenizers/{resource}')
        except LookupError:
            nltk.download(resource)

ensure_nltk_resources()

# --- Preprocessing ---
translator = str.maketrans('', '', string.punctuation)

def preprocess(text: str) -> str:
    """
    Lowercases the text, removes punctuation, and strips extra whitespace.
    """
    return text.lower().translate(translator).strip()

# --- RAKE Keyword Extraction with Boosts ---
rake_instance = Rake()

def extract_keywords_with_scores(text: str, num_keywords: int = 7, boost_factor: float = 3.0) -> dict:
    """
    Extract keyword phrases from text using RAKE and compute boost factors.
    
    For each top phrase, a normalized boost is computed as:
       boost = 1 + (normalized_score) * (boost_factor - 1)
       
    Both multi-word phrases and their individual tokens are included.
    
    Args:
        text (str): Input text (e.g. job description).
        num_keywords (int): Number of top phrases to consider.
        boost_factor (float): Maximum multiplier for the most significant phrase.
        
    Returns:
        dict: Mapping from keyword (or phrase) to its boost factor.
    """
    rake_instance.extract_keywords_from_text(text)
    ranked_phrases = rake_instance.get_ranked_phrases_with_scores()  # Each as (score, phrase)
    if not ranked_phrases:
        return {}
    
    top_phrases = ranked_phrases[:num_keywords]
    max_score = max(score for score, phrase in top_phrases)
    keyword_boost = {}
    
    for score, phrase in top_phrases:
        norm = score / max_score if max_score > 0 else 0
        boost = 3.0 + norm * (boost_factor - 1.0)
        tokens = phrase.split()
        
        # If multiple tokens, add the whole phrase (joined with a space)
        if len(tokens) > 1:
            whole_phrase = ' '.join(tokens)
            keyword_boost[whole_phrase] = max(keyword_boost.get(whole_phrase, 1.0), boost)
        
        # Also add individual tokens
        for token in tokens:
            token = token.lower()
            keyword_boost[token] = max(keyword_boost.get(token, 1.0), boost)
    
    return keyword_boost

# --- TF-IDF with Boosted Keywords ---
def boosted_tfidf_similarity(jdesc: str, cover: str, keyword_boost: dict) -> float:
    """
    Computes cosine similarity between job description and cover letter texts using a TF-IDF vectorizer
    with an n-gram range of up to trigrams. If any of the auto-detected keywords/phrases occur, their
    corresponding TF-IDF components are multiplied by the boost factor.
    """
    vectorizer = TfidfVectorizer(stop_words='english', ngram_range=(1, 3), sublinear_tf=True)
    docs = [jdesc, cover]
    tfidf_matrix = vectorizer.fit_transform(docs)
    tfidf_dense = tfidf_matrix.toarray()
    
    # Apply boosts for the keywords if they exist in vocabulary.
    for keyword, boost in keyword_boost.items():
        if keyword in vectorizer.vocabulary_:
            col_index = vectorizer.vocabulary_[keyword]
            tfidf_dense[:, col_index] *= boost
    
    cos_sim = cosine_similarity(tfidf_dense[0:1], tfidf_dense[1:2])
    return cos_sim[0][0]

# --- Semantic Similarity using Sentence Embeddings ---
# Load a state-of-the-art SentenceTransformer model.
semantic_model = SentenceTransformer("all-MiniLM-L6-v2")

def semantic_similarity(jdesc: str, cover: str) -> float:
    """
    Computes semantic similarity using SentenceTransformer embeddings and cosine similarity.
    """
    j_emb = semantic_model.encode(jdesc, convert_to_tensor=True)
    cover_emb = semantic_model.encode(cover, convert_to_tensor=True)
    sim = util.cos_sim(j_emb, cover_emb).item()  # Extract scalar value
    return sim

# --- Hybrid Matchmaking Algorithm ---
def advanced_matchmaking(job_description: str,
                         cover_letter: str,
                         num_keywords: int = 10,  # Increase the number of keywords considered
                         boost_factor: float = 4.0,  # Increase the boost factor for keywords
                         semantic_weight: float = 0.85) -> float:  # Increase semantic similarity weight
    """
    Computes a composite similarity score between a job description and a cover letter.
    
    This algorithm combines:
      1. A boosted TF-IDF cosine similarity (explicit keyword matching), and 
      2. A semantic similarity based on transformer embeddings.
      
    The final score is a weighted average:
    
         final_score = (semantic_weight * semantic_sim) + ((1 - semantic_weight) * tfidf_sim)
    
    Args:
        job_description (str): The job description.
        cover_letter (str): The applicant's cover letter.
        num_keywords (int): Number of top keyword phrases to extract for boosting.
        boost_factor (float): Maximum multiplier for the most significant keywords.
        semantic_weight (float): Weight for the semantic similarity score (0 to 1).
        
    Returns:
        float: Final composite similarity percentage.
    """
    # Preprocess the texts.
    jdesc_clean = preprocess(job_description)
    cover_clean = preprocess(cover_letter)
    
    # 1. Auto-extract keywords and compute their boost factors.
    keyword_boost = extract_keywords_with_scores(jdesc_clean, num_keywords, boost_factor)
    
    # 2. Compute the boosted TF-IDF similarity.
    tfidf_sim = boosted_tfidf_similarity(jdesc_clean, cover_clean, keyword_boost)
    
    # 3. Compute the semantic similarity.
    sem_sim = semantic_similarity(jdesc_clean, cover_clean)
    
    # 4. Combine via a weighted average.
    final_score = semantic_weight * sem_sim + (1 - semantic_weight) * tfidf_sim
    
    # Normalize the score to ensure strong matches result in higher percentages.
    percentage_match = min(max(final_score * 100, 0), 100)  # Clamp between 0 and 100
    return percentage_match

# --- Example Usage ---
job_description = """
Company Description

Sopra Steria offers tailored, end-to-end corporate technology and software solutions to help clients make bold choices and deliver results. Successfully so! With more than 56.000 colleagues in 30 countries, we rank as Europe’s leading digital solutions provider. Some of the most successful companies in Europe rely on our technology due to our commitment to innovation, collaboration, and value in business development.  

The world is how we shape it. Let’s shape it together. 


Job Description

We are looking for On-site Support Engineers for our Brussels location, a Ghent/Brussels split-location role (part-time in each city), and a Back-Up Engineer covering multiple locations (Ghent, Brussels, Hasselt, and Liège).

As a local on-site Support Engineer, you will handle IT problems and respond to IT requests and incident calls via phone, mail, or the IT Service Management application. 

Performing hardware checks, repairs, cleaning and replacements (laptops & personal printers)
Managing assets in CMDB
Managing Service Point service mailbox (on rotation)
Follow-up tickets in ticketing system (Service Now)
Support of the New Starter & Leaver Service
Staffing of a physical service desk:
Performing basic software & hardware troubleshooting (password resets, O365, Windows troubleshooting, Mobile Intune, VPN issues, in-house applications, VM’s,…) 
Backoffice
Config check of laptops for new starters
Tech swaps (laptops)
On-/offboarding new starters & leavers
Meeting Room Support (back-up)
Transport of IT material between the different offices sites 

Qualifications

We’re seeking passionate colleagues who are eager to push the boundaries in digital transformation and technology consulting. At Sopra Steria, you’ll have the opportunity to grow your skills in a constructive, collaborative team environment, working on impactful projects that drive change for our clients. If you thrive on challenge and meet (most of) the qualifications below, we look forward to your application! 

You’ll have knowledge and experience of the following

Bachelor’s degree in computer science or a relevant equivalent 
Experience in providing first-line and/or second-line IT support
Good soft skills (empathy, team spirit & good communication skills)
Be a good & reliable team member
Eager to learn  
Pro-active approach
Customer first mindset
Be flexible to support other colleagues in case of sickness/leave
Preferably trilingual or English and Dutch / French 
What can we offer you

We welcome 11.000 new colleagues every year worldwide, and it’s essential to us that everyone feels supported and valued. At Sopra Steria, you’ll work on projects that make a change for our clients. And you’ll get the opportunity to grow your own skills in the process, too. Your path to excellence starts at The Sopra Steria Academy, where you’ll get exclusive development opportunities with experts and strategic partners to fast-track you to your full potential. You’ll have access to more than 250 trainings to get you there.  

You’ll become a part of a major Tech player in Europe recognized for its consulting, digital services, and software development. On top of that, you’ll join a dedicated service desk team, which handles first-line requests, manages workstations and is responsible for the M365 environments.


Additional Information

Our employees are known for making bold choices and delivering results. Work among high-level professionals at the forefront of corporate software solutions and innovation at Europe’s Leading Digital Service Provider.

We offer a generous employee benefits package that includes:

A variety of perks, such as mobility options (including a company car), insurance coverage, meal vouchers, ecocheques, and more.
Continuous learning opportunities through the Sopra Steria Academy to support your career development.
The opportunity to connect with fellow Sopra Steria colleagues at various team events.
People are the cornerstone of our success. That’s why we aspire to be bolder together. Our goal is to build high-functioning teams and healthy team environments that inspire and help each other to deliver excellence for each of our customers.

Excited about this job opportunity? Ready to shape the world with us? Great! We are looking forward to your application!

Want to know what happens next?

The recruitment process typically begins with the first step, where the recruiter screens candidates based on their qualifications and fit for the role. This is followed by the second step, where candidates undergo more in-depth evaluations, including technical assessments and an interview with the hiring manager to assess both technical skills and team compatibility. The following steps involves the company reviewing feedback and aligning on a potential offer. Finally, in the final step, the candidate receives a formal job offer.

______

Sopra Steria is an equal opportunity employer. All qualified applicants will be considered for employment without regard to age, ancestry, nationality, color, family or medical leave, gender identity or expression, genetic information, immigration status, marital status, medical condition, national origin, physical or mental disability, political affiliation, protected veteran or military status, race, ethnicity, religion, gender (including pregnancy), sexual orientation or any other characteristic protected by applicable local laws, regulations and ordinances. We foster a work environment that is inclusive and respectful of all differences.
"""

cover_letter1 = """
Dear Hiring Manager,

I am excited to apply for the On-site Support Engineer position at Sopra Steria. With a strong background in IT support and a passion for providing exceptional technical assistance, I am eager to contribute to your team and help drive innovative digital solutions.

Currently pursuing my master's degree in Information and Communication Technology at NTNU, I have developed a deep understanding of IT systems and troubleshooting methodologies. My hands-on experience includes providing first- and second-line IT support, managing hardware replacements, and resolving software issues across various platforms. Additionally, my familiarity with asset management, ticketing systems like ServiceNow, and Microsoft 365 further align with the responsibilities of this role.

Beyond my technical skills, I thrive in collaborative environments and am committed to delivering excellent customer service. My proactive mindset, flexibility, and problem-solving abilities make me well-suited for the dynamic nature of on-site IT support. Being multilingual, with proficiency in English and Dutch/French, I can effectively communicate and assist diverse teams.

Sopra Steria’s dedication to innovation and digital transformation resonates with my professional aspirations. I am particularly excited about the opportunity to work within a team that values growth, collaboration, and technological excellence.

I would welcome the opportunity to discuss how my skills and enthusiasm align with your needs. Thank you for considering my application. I look forward to the possibility of contributing to your team.

Best regards,

"""

cover_letter2 = """
Dear Hiring Manager,
I am writing to express my enthusiasm for the On-site Support Engineer position at Sopra Steria. With a strong foundation in IT support and a passion for delivering exceptional service, I am eager to contribute my skills to Europe’s leading digital solutions provider.
My background includes [briefly describe your educational qualifications, e.g., a Bachelor's degree in Computer Science], along with [insert years of experience] years of hands-on experience in first and second-line IT support. I excel in troubleshooting hardware and software issues, managing IT assets, and delivering seamless onboarding and offboarding services. Additionally, I am fluent in [languages you speak], which will allow me to communicate effectively in the dynamic multilingual environment at Sopra Steria.
Your commitment to fostering innovation and collaboration aligns perfectly with my proactive approach to IT support. I take pride in resolving complex technical challenges efficiently while maintaining a customer-first mindset. Working alongside your dedicated team, I am confident that my empathy, communication skills, and adaptability will contribute to building high-functioning teams that deliver outstanding results.
What excites me most about this role is the opportunity to grow through the Sopra Steria Academy and work on impactful projects that make a tangible difference. I am particularly impressed by your dedication to supporting your employees’ development with exclusive training programs and fostering an inclusive, respectful environment.
I would welcome the opportunity to bring my expertise to your team and help Sopra Steria shape the future of IT solutions. Thank you for considering my application. I look forward to the possibility of discussing how I can contribute to your continued success.
"""

match_pct1 = advanced_matchmaking(job_description, cover_letter1)
match_pct2 = advanced_matchmaking(job_description, cover_letter2)
print(f"Candidate Fit (Cover Letter 1): {match_pct1:.2f}%")
print(f"Candidate Fit (Cover Letter 2): {match_pct2:.2f}%")