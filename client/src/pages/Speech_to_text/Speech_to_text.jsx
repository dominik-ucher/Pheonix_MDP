import React from 'react';
import axios from 'axios';
import useSpeechRecognition from '../../hooks/useSpeechRecognitionHook';  

export default function Speech_to_text() {
  const axiosInstance = axios.create({ baseURL: import.meta.env.VITE_REACT_APP_API_URL });
  const {text, startListening, stopListening, isListening, hasRecognitionSupport} = useSpeechRecognition();

  return (
    <div>
      {hasRecognitionSupport ? (
        <>
          <div>
            <button onClick={startListening}>Start listening</button>
          </div>

          <div>
            <button onClick={stopListening}>Stop listening</button>
          </div>

          {isListening ? <div>Your browser is currently listening</div>: null}
          {text}
        
        </>   
      ): (
        <h1>Your browser has no speech recognition support</h1>
      )}
    </div>
  );
}
