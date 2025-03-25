import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';




export default function UserProfile() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(true);
  const [user, setUser] = useState({
    name: '',
    email: '',
    bio: '',
    description: '',
    avatar: '/img/default-avatar.png',  
    location: '',
    education: '',
    cv: null,
    experience: [],
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };



  const [isListening, setIsListening] = useState(false);
  const startListening = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech recognition is not supported in this browser. Please use Google Chrome.");
      return;
    }
  
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;
  
    recognition.onstart = () => setIsListening(true);
  
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setUser((prevUser) => ({ ...prevUser, description: prevUser.description + " " + transcript }));
    };
  
    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      alert("Error with speech recognition. Please try again.");
    };
  
    recognition.onend = () => setIsListening(false);
  
    recognition.start();
  };

  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUser({ ...user, avatar: imageUrl });
    }
  };

  const handleCVUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUser({ ...user, cv: file });
    }
  };

  const addExperience = () => {
    setUser({ ...user, experience: [...user.experience, { role: '', company: '', years: '' }] });
  };

  const handleExperienceChange = (index, field, value) => {
    const newExperience = [...user.experience];
    newExperience[index][field] = value;
    setUser({ ...user, experience: newExperience });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="bg-white shadow-xl rounded-lg p-6 w-full max-w-md text-center border-t-4 border-orange-500">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">User Profile</h1>
        <p className="text-gray-600">Manage your personal details, work experience, and profile settings.</p>

        <div className="relative mt-6">
          <img
            src={user.avatar}
            alt="User Avatar"
            className="w-40 h-40 mx-auto mb-4 border-4 border-orange-500 rounded-lg object-cover"
          />
          {isEditing && (
            <label className="cursor-pointer text-orange-600 font-semibold hover:text-orange-700">
              Change Profile Picture
              <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
            </label>
          )}
        </div>

        {isEditing ? (
          <div className="space-y-3 mt-4">
            <label className="block text-left">Full Name</label>
            <input type="text" name="name" value={user.name} onChange={handleChange} className="w-full p-2 border rounded-md" placeholder="Enter your full name" />
            
            <label className="block text-left">Email</label>
            <input type="email" name="email" value={user.email} onChange={handleChange} className="w-full p-2 border rounded-md" placeholder="Enter your email address" />
            
            <label className="block text-left">Short Bio</label>
            <input type="text" name="bio" value={user.bio} onChange={handleChange} className="w-full p-2 border rounded-md" placeholder="Write a short bio about yourself" />
            
            <div className="relative">
  <textarea 
    name="description" 
    value={user.description} 
    onChange={handleChange} 
    className="w-full p-2 border rounded-md" 
    placeholder="Provide more details about your background, skills, and interests"
  />
  <button
    type="button"
    onClick={startListening}
    className={`absolute right-2 top-2 p-2 rounded-full bg-orange-500 text-white ${
      isListening ? "animate-pulse" : ""
    }`}
  >
    🎤
  </button>
  <p className="text-black-500 text-sm mt-1">Click the microphone to dictate text.</p>
</div>

            
            <label className="block text-left">Current Location</label>
            <input type="text" name="location" value={user.location} onChange={handleChange} className="w-full p-2 border rounded-md" placeholder="City, Country" />
            
            <label className="block text-left">Education (Your highest level of education or current studies)</label>
            <input type="text" name="education" value={user.education} onChange={handleChange} className="w-full p-2 border rounded-md" placeholder="Your highest level of education" />

            <div className="mt-2">
              <label className="block text-left">Upload CV (Upload a PDF of your resume)</label>
              <label className="cursor-pointer text-red-600 font-semibold hover:text-red-700">
                Select a file
                <input type="file" accept=".pdf" className="hidden" onChange={handleCVUpload} />
              </label>
              {user.cv && <p className="text-sm mt-1 text-gray-600">Uploaded File: {user.cv.name}</p>}
            </div>

            <div className="mt-4">
              <h3 className="font-semibold text-orange-600">Work Experience (List your past roles and companies)</h3>
              {user.experience.map((exp, index) => (
                <div key={index} className="mt-2 border p-2 rounded-md">
                  <label className="block text-left">Job Title (What was your role?)</label>
                  <input type="text" placeholder="Enter job title" value={exp.role} onChange={(e) => handleExperienceChange(index, 'role', e.target.value)} className="w-full p-1 border rounded-md" />
                  
                  <label className="block text-left">Company Name (Where did you work?)</label>
                  <input type="text" placeholder="Enter company name" value={exp.company} onChange={(e) => handleExperienceChange(index, 'company', e.target.value)} className="w-full p-1 border rounded-md mt-1" />
                  
                  <label className="block text-left">Years of Experience (How long did you work there?)</label>
                  <input type="text" placeholder="Enter years worked" value={exp.years} onChange={(e) => handleExperienceChange(index, 'years', e.target.value)} className="w-full p-1 border rounded-md mt-1" />
                </div>
              ))}
              <button onClick={addExperience} className="mt-2 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 w-full text-lg font-bold">
                + Add Experience
              </button>
            </div>
          </div>
        ) : null}

              <div>
                <h2 className="text-2xl font-bold text-gray-800">{user.name || 'No name provided'}</h2>
                <p className="text-gray-600">{user.email || 'No email provided'}</p>
                <p className="mt-2 text-orange-700 font-medium">{user.bio || 'No bio added'}</p>
                <p className="mt-2 text-gray-600 text-sm">{user.description || 'No description added'}</p>
                <div className="mt-4 text-left text-gray-700">
                  <p><strong className="text-red-600">📍 Location:</strong> {user.location || 'No location added'}</p>
                  <p><strong className="text-red-600">🎓 Education:</strong> {user.education || 'No education added'}</p>
                  <p><strong className="text-red-600">📄 CV:</strong> {user.cv ? <a href={URL.createObjectURL(user.cv)} download className="text-blue-500 underline">Download CV</a> : 'No CV uploaded'}</p>
                 <p><strong className="text-red-600">💼 Experience:</strong></p>
                 {user.experience.length > 0 ? (
                    user.experience.map((exp, index) => (
                  <p key={index}>- {exp.role} at {exp.company} ({exp.years})</p>
                    ))
                 ) : (<p>No experience added</p>
                     
              )}
            </div>
          </div>
        

        <button className="mt-4 px-4 py-2 bg-orange-500 text-white font-semibold rounded-md shadow-md hover:bg-orange-600 w-full text-lg font-bold" onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </button>

      </div>
    </div>
  );
}
