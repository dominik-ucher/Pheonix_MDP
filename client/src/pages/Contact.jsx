import React from 'react';
import axios from 'axios';

export default function Contact() {
  const axiosInstance = axios.create({ baseURL: import.meta.env.VITE_REACT_APP_API_URL });

  return (
    <div>Contact Page</div>
  );
}
