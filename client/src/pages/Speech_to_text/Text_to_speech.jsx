import React from 'react';
import useTextToSpeech from '../../hooks/useTextToSpeechHook';

export default function TextToSpeech() {
    // Use the hook with a specific language 
    const {
        text,
        setText,
        isSpeaking,
        speak,
        stop,
        hasSpeechSupport,
    } = useTextToSpeech('en-US'); // Change 'en-US' to es-ES for Spanish or 'it-IT' for Italian

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    Text to Speech
                </h1>

                {/* Check if speech synthesis is supported */}
                {hasSpeechSupport ? (
                    <>
                        {/* Text area for input */}
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Enter text to speak..."
                            className="w-full p-4 text-lg border border-gray-300 rounded-lg resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
                            rows={6}
                        />

                        {/* Buttons for speaking and stopping */}
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={speak}
                                disabled={isSpeaking || !text}
                                className={`flex items-center justify-center px-6 py-3 text-lg font-semibold text-white rounded-lg transition-colors ${
                                    isSpeaking || !text ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                                }`}
                            >
                                🔊 Speak
                            </button>
                            <button
                                onClick={stop}
                                disabled={!isSpeaking}
                                className={`flex items-center justify-center px-6 py-3 text-lg font-semibold text-white rounded-lg transition-colors ${
                                    !isSpeaking ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'
                                }`}
                            >
                                ⏹️ Stop
                            </button>
                        </div>
                    </>
                ) : (
                    // Display a message if speech synthesis is not supported
                    <div className="text-center text-red-600 text-2xl font-semibold">
                        ❌ Your browser does not support text-to-speech.
                    </div>
                )}
            </div>
        </div>
    );
}