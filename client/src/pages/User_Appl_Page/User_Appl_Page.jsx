import React from 'react'
import axios from 'axios';

export default function User_Appl_Page() {
    const axiosInstance = axios.create({ baseURL: import.meta.env.VITE_REACT_APP_API_URL });

    return(
      <div>User Application Page</div>
    )
}