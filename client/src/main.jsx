import React from 'react'
import ReactDOM from 'react-dom/client'
import AppRouting from './App.jsx'
import './style.css'
import { AuthContexProvider } from './context/authContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContexProvider>
    <AppRouting />
    </AuthContexProvider>
  </React.StrictMode>,
)
