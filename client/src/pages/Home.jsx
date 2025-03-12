import React  from 'react';
import axios from 'axios'

export default function Home2() {
  const axiosInstance = axios.create({baseURL: import.meta.env.VITE_REACT_APP_API_URL,});

  return (

    <div>Home Page</div>
  );
}