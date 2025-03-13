import React from 'react'
import axios from 'axios';

export default function Company_Appl_Dashboard() {
    const axiosInstance = axios.create({ baseURL: import.meta.env.VITE_REACT_APP_API_URL });

    return(
      <div>Company Application Dashboard Page</div>
    )
}