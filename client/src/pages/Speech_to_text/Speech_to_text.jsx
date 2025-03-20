import React, { useState } from 'react';
import axios from 'axios';
import { FaVolumeUp, FaTrash } from 'react-icons/fa'; 

// Import the custom speech recognition hook
import useSpeechRecognition from '../../hooks/useSpeechRecognitionHook';  

export default function Speech_to_text() {
    const axiosInstance = axios.create({ baseURL: import.meta.env.VITE_REACT_APP_API_URL });

    // Destructure values and functions from the custom hook
    const {
        text, 
        startListening, 
        stopListening, 
        isListening, 
        hasRecognitionSupport, 
    } = useSpeechRecognition();

    // State to handle manual text input
    const [manualText, setManualText] = useState(text);

    // Update manualText when speech recognition updates text
    React.useEffect(() => {
        setManualText(text);
    }, [text]);

    // Function to clear the text area
    const clearText = () => {
        setManualText('');
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6">
                {/* Title */}
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    Speech to Text
                </h1>

                {/* Check if speech recognition is supported */}
                {hasRecognitionSupport ? (
                    <>
                        {/* Buttons for starting and stopping speech recognition */}
                        <div className="flex justify-center gap-4 mb-6">
                            <button
                                onClick={startListening}
                                disabled={isListening}
                                className={`flex items-center justify-center px-6 py-3 text-lg font-semibold text-white rounded-lg transition-colors ${
                                    isListening ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                                }`}
                            >
                                <FaVolumeUp className="mr-2" /> Start Speaking
                            </button>
                            <button
                                onClick={stopListening}
                                disabled={!isListening}
                                className={`flex items-center justify-center px-6 py-3 text-lg font-semibold text-white rounded-lg transition-colors ${
                                    !isListening ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'
                                }`}
                            >
                                ⏹️ Stop Speaking
                            </button>
                        </div>

                        {/* Feedback message when listening */}
                        {isListening && (
                            <div className="text-center text-blue-600 text-lg mb-6">
                                🎧 Listening... Speak now.
                            </div>
                        )}

                        {/* Text area for displaying and editing recognized text */}
                        <div className="relative">
                            <textarea
                                value={manualText}
                                onChange={(e) => setManualText(e.target.value)}
                                placeholder="Your speech will appear here..."
                                className="w-full p-4 text-lg border border-gray-300 rounded-lg resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
                                rows={6}
                            />
                            {/* Clear text button (trash can icon) */}
                            {manualText && (
                                <button
                                    onClick={clearText}
                                    className="absolute top-2 right-2 p-2 text-gray-500 hover:text-red-600 transition-colors"
                                    title="Clear text"
                                >
                                    <FaTrash className="w-6 h-6" />
                                </button>
                            )}
                        </div>
                    </>
                ) : (
                    // Display a message if speech recognition is not supported
                    <div className="text-center text-red-600 text-2xl font-semibold">
                        ❌ Your browser does not support speech recognition.
                    </div>
                )}
            </div>
        </div>
    );
}