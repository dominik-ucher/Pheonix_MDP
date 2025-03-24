import { useState, useEffect } from 'react';

const useTextToSpeech = (lang) => { //Define the language in Text_to_speech.jsx
    // State to manage the text to be spoken
    const [text, setText] = useState('');
    
    // State to track if speech synthesis is currently speaking
    const [isSpeaking, setIsSpeaking] = useState(false);

    // State to store the list of available voices
    const [voices, setVoices] = useState([]);

    // Check if the browser supports the SpeechSynthesis API
    const hasSpeechSupport = 'speechSynthesis' in window;

    // Load available voices when the component mounts
    useEffect(() => {
        if (hasSpeechSupport) {
            const loadVoices = () => {
                const availableVoices = window.speechSynthesis.getVoices();
                setVoices(availableVoices);
            };

            // Load voices when the voices change
            window.speechSynthesis.onvoiceschanged = loadVoices;

            // Load voices initially
            loadVoices();
        }
    }, [hasSpeechSupport]);

    // Function to start speaking the text
    const speak = () => {
        if (!hasSpeechSupport) {
            console.error('Speech synthesis is not supported in this browser.');
            return;
        }

        if (!text) {
            console.error('No text provided to speak.');
            return;
        }

        // Create a new SpeechSynthesisUtterance instance
        const utterance = new SpeechSynthesisUtterance(text);

        // Set the language for the utterance
        utterance.lang = lang;

        // Adjust speech parameters (if needed)
        utterance.pitch = 0.5; // Lower pitch (default is 1)
        utterance.rate = 0.5; // Slower rate (default is 1)
        utterance.volume = 3.5; // Extra volume (default is 1)

        // Select a voice for the specified language
        const selectedVoice = voices.find((voice) => voice.lang === lang);
        if (selectedVoice) {
            utterance.voice = selectedVoice;
        }

        // Set event listeners for the utterance
        utterance.onstart = () => {
            setIsSpeaking(true);
        };

        utterance.onend = () => {
            setIsSpeaking(false);
        };

        utterance.onerror = (event) => {
            console.error('Speech synthesis error:', event.error);
            setIsSpeaking(false);
        };

        // Start speaking
        window.speechSynthesis.speak(utterance);
    };

    // Function to stop speaking
    const stop = () => {
        if (hasSpeechSupport) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
        }
    };

    // Cleanup speech synthesis on component unmount
    useEffect(() => {
        return () => {
            if (hasSpeechSupport) {
                window.speechSynthesis.cancel();
            }
        };
    }, [hasSpeechSupport]);

    return {
        text,
        setText,
        isSpeaking,
        speak,
        stop,
        hasSpeechSupport,
    };
};

export default useTextToSpeech;