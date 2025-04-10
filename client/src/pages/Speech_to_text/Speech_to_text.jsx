import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../../img/logo.png';
import axios from 'axios';
import { Button, FileInput, Label, TextInput, Textarea } from 'flowbite-react';
import { FaVolumeUp } from 'react-icons/fa';
import useSpeechRecognition from '../../hooks/useSpeechRecognitionHook';
import useTextToSpeech from '../../hooks/useTextToSpeechHook';

const Register = () => {
  const axiosInstance = axios.create({ baseURL: import.meta.env.VITE_REACT_APP_API_URL });
  const [currentStep, setCurrentStep] = useState(0);
  const [confirmed, setConfirmed] = useState(false);
  const [voiceInput, setVoiceInput] = useState('');
  const formRef = useRef(null);

  // Speech hooks
  const { 
    text: recognitionText, 
    isListening, 
    startListening, 
    stopListening, 
    hasRecognitionSupport 
  } = useSpeechRecognition();
  
  const { speak, stop: stopSpeaking, hasSpeechSupport } = useTextToSpeech('en-US');

  // CV-focused form fields
  const [inputs, setInputs] = useState({
    first_name: '',
    last_name: '',
    profession: '',
    skills: '',
    experience: '',
    education: '',
    birthdate: '',       // Manual input only
    email: '',          // Manual input only
    password: '',       // Manual input only
    phone_number: '',
    address: '',
    languages: '',
    link_to_cv: ''
  });

  const [err, setError] = useState(null);
  const navigate = useNavigate();

  // Voice-enabled fields configuration
  const voiceSteps = [
    { field: 'first_name', question: 'What is your first name?' },
    { field: 'last_name', question: 'What is your last name?' },
    { field: 'profession', question: 'What is your current profession?' },
    { field: 'skills', question: 'What are your key skills?' },
    { field: 'experience', question: 'Briefly describe your work experience' },
    { field: 'education', question: 'What is your education background?' },
    { field: 'phone_number', question: 'What is your phone number?' },
    { field: 'address', question: 'What is your address?' },
    { field: 'languages', question: 'What languages do you speak?' }
  ];

  // Manual-only fields (must be filled manually)
  const manualFields = [
    { field: 'birthdate', label: 'Birthdate', type: 'date' },
    { field: 'email', label: 'Email', type: 'email' },
    { field: 'password', label: 'Password', type: 'password' }
  ];

  // Speak current question when step changes
  useEffect(() => {
    if (currentStep < voiceSteps.length && hasSpeechSupport) {
      speakQuestion();
      setVoiceInput('');
      setConfirmed(false);
      stopListening();
    }
  }, [currentStep, hasSpeechSupport]);

  // Handle recognized speech
  useEffect(() => {
    if (recognitionText && currentStep < voiceSteps.length && !confirmed) {
      setVoiceInput(recognitionText);
    }
  }, [recognitionText]);

  // Handle voice input confirmation
  useEffect(() => {
    if (voiceInput && !confirmed && currentStep < voiceSteps.length) {
      speak(`You said ${voiceInput}. Is this correct?`);
    }
  }, [voiceInput]);

  // Function to speak the current question
  const speakQuestion = () => {
    if (currentStep < voiceSteps.length && hasSpeechSupport) {
      speak(voiceSteps[currentStep].question);
    }
  };

  const confirmField = () => {
    setInputs(prev => ({ ...prev, [voiceSteps[currentStep].field]: voiceInput }));
    setConfirmed(true);
    speak("Thank you. Let's continue.");
    setTimeout(() => {
      if (currentStep < voiceSteps.length - 1) {
        setCurrentStep(prevStep => prevStep + 1);
      }
    }, 1000);
  };

  const correctField = () => {
    setVoiceInput('');
    speak(`Please say your ${voiceSteps[currentStep].field} again.`);
    startListening();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/api/auth/register', inputs);
      navigate('/login');
    } catch (err) {
      setError(err.response.data);
    }
  };

  const handleChange = (e) => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white p-4">
      <div className="w-full max-w-4xl bg-white rounded-lg border border-gray-200 shadow-lg p-8">
        <div className='flex items-center justify-center'>
          <img src={Logo} alt="Company Logo" className='w-32 mr-4'/>
        </div>
        <h2 className="flex justify-center items-center text-2xl font-bold mb-6">Registration</h2>

        {/* Voice Registration Section */}
        {hasRecognitionSupport && hasSpeechSupport && currentStep < voiceSteps.length && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">Voice Registration (Step {currentStep + 1} of {voiceSteps.length})</h3>
              <button 
                onClick={speakQuestion} // Uses the speakQuestion function
                className="text-blue-600 hover:text-blue-800 p-2"
                aria-label="Replay question"
              >
                <FaVolumeUp className="w-5 h-5" />
              </button>
            </div>
            <div>
              <p className="mb-2 text-gray-700">{voiceSteps[currentStep].question}</p>
              {!confirmed && (
                <>
                  <div className="flex gap-2 mb-2">
                    <Button 
                      onClick={startListening} 
                      disabled={isListening}
                      className="flex items-center gap-2"
                    >
                      {isListening ? 'Listening...' : 'Speak Answer'}
                    </Button>
                    <Button 
                      onClick={stopListening} 
                      disabled={!isListening}
                      color="gray"
                    >
                      Stop
                    </Button>
                  </div>
                  {voiceInput && (
                    <div className="mt-2">
                      <p className="text-gray-700">You said: <strong>{voiceInput}</strong></p>
                      <div className="flex gap-2 mt-2">
                        <Button onClick={confirmField} color="success">
                          Yes, that's correct
                        </Button>
                        <Button onClick={correctField} color="failure">
                          No, try again
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}

        {/* CV Registration Form - Note: All answers can be manually modified in their respective fields below */}
        <div className="mb-4 text-sm text-gray-600">
          <p>All voice-provided answers appear below and can be manually modified if needed.</p>
        </div>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-4" ref={formRef} onSubmit={handleSubmit}>
          {/* Voice-enabled fields (answers can be manually edited) */}
          {voiceSteps.map((step) => (
            <div key={step.field} className={step.field === 'experience' || step.field === 'education' ? 'md:col-span-2' : ''}>
              <Label htmlFor={step.field} value={step.field.replace('_', ' ')} />
              {step.field === 'experience' || step.field === 'education' ? (
                <Textarea
                  id={step.field}
                  name={step.field}
                  value={inputs[step.field]}
                  onChange={handleChange}
                  rows={4}
                  className="border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                />
              ) : (
                <TextInput
                  id={step.field}
                  name={step.field}
                  value={inputs[step.field]}
                  onChange={handleChange}
                  className="border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                />
              )}
            </div>
          ))}

          {/* Manual-only fields (must be filled manually) */}
          {manualFields.map((field) => (
            <div key={field.field}>
              <Label htmlFor={field.field} value={field.label} />
              <TextInput
                id={field.field}
                type={field.type}
                name={field.field}
                value={inputs[field.field]}
                onChange={handleChange}
                required
                className="border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          ))}

          {/* CV File Upload */}
          <div className="md:col-span-2">
            <Label htmlFor="link_to_cv" value="Upload CV (PDF)" />
            <FileInput 
              id="link_to_cv"
              name="link_to_cv"
              accept=".pdf"
              onChange={(e) => setInputs(prev => ({ ...prev, link_to_cv: e.target.files[0] }))}
              required
            />
          </div>

          <div className="md:col-span-2">
            <Button type="submit" color="dark" className="w-full">Complete Registration</Button>
            {err && <p className='bg-red-100 text-red-600 font-semibold text-center p-3 rounded-lg mt-4'>{err}</p>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;