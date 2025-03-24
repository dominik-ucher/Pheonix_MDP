

import React from 'react';
import axios from 'axios';

export default function Home() {
  const axiosInstance = axios.create({ baseURL: import.meta.env.VITE_REACT_APP_API_URL });

  return (
    <div 
      style={{ 
        fontFamily: 'Arial, sans-serif', 
        backgroundColor: '#f9f9f9',
        padding: '40px',
        boxSizing: 'border-box',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      {/* Top section with gradient orange background */}
      <div 
        style={{
          position: 'absolute', 
          top: '0', 
          left: '0', 
          right: '0', 
          background: 'linear-gradient(135deg, #ff9a00, #e87c00)', // Gradient background
          padding: '5px 0', 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start', 
          zIndex: '10',
        }}
      >
        {/* Logo */}
        <img 
          src="/img/logoo.png" 
          alt="Phoenix Logo"
          style={{ 
            width: '130px',
            height: 'auto',
            objectFit: 'contain',
            marginLeft: '20px',
          }}
        />
      </div>

      {/* Login/Register buttons at the top right */}
      <div 
        style={{
          position: 'absolute',
          top: '10px', 
          right: '20px',
          zIndex: '20',
          display: 'flex',
          gap: '20px',
        }}
      >
        <button 
          style={{
            padding: '15px 30px',
            fontSize: '1.8rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            backgroundColor: '#ff9a00',
            color: '#e40000',
            border: 'none',
            borderRadius: '5px',
            width: '140px',
            height: '50px',
            transition: 'transform 0.3s ease', // Hover effect
          }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        >
          Login
        </button>
        <button 
          style={{
            padding: '15px 30px',
            fontSize: '1.8rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            backgroundColor: '#ff9a00',
            color: '#e40000',
            border: 'none',
            borderRadius: '5px',
            width: '140px',
            height: '50px',
            transition: 'transform 0.3s ease', // Hover effect
          }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        >
          Register
        </button>
      </div>

      {/* Content area below the orange top section */}
      <header 
        style={{ 
          textAlign: 'center',
          marginTop: '100px',
          color: '#333',
        }}
      >
        <h1 style={{ 
          fontSize: '3rem', 
          fontWeight: 'bold', 
          color: '#ff9a00', 
          marginBottom: '20px',
          lineHeight: '1.4',  // Increased line height for clarity
        }}>
          Find Your Dream Job
        </h1>
        <p style={{ 
          fontSize: '1.5rem', 
          maxWidth: '700px', 
          margin: '0 auto', 
          color: '#555',
          lineHeight: '1.5',
        }}>
          Explore job opportunities that fit your lifestyle, connect with employers, and start your next career chapter.
        </p>
      </header>
      
      {/* Job images section */}
      <section 
        style={{ 
          display: 'flex', 
          justifyContent: 'space-around', 
          width: '100%', 
          marginTop: '40px',
          gap: '40px',
          flexWrap: 'wrap',
        }}
      >
        {/* Example images for jobs related to older adults */}
        <div 
          style={{
            width: '450px', 
            textAlign: 'center',
            backgroundColor: '#fff',
            borderRadius: '10px',
            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)', // Deeper shadow
            padding: '20px',
            transition: 'transform 0.3s ease',
            border: '3px solid #ff9a00', 
          }}
        >
          <img 
            src="/img/farmer.jpg"
            alt="Community Work" 
            style={{ 
              width: '100%', 
              height: '300px', 
              objectFit: 'cover', 
              borderRadius: '8px', 
              marginBottom: '20px',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease', 
            }} 
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          />
          <h3 style={{ fontSize: '1.8rem', color: '#333' }}>Community Support</h3>
          <p style={{ fontSize: '1.2rem', color: '#555' }}>
            Engage with your community, offering support and services.
          </p>
        </div>
        
        <div 
          style={{
            width: '450px', 
            textAlign: 'center',
            backgroundColor: '#fff',
            borderRadius: '10px',
            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)', // Deeper shadow
            padding: '20px',
            transition: 'transform 0.3s ease',
            border: '3px solid #ff9a00',
          }}
        >
          <img 
            src="/img/scientist.jpg" 
            alt="Consulting Work" 
            style={{ 
              width: '100%', 
              height: '300px', 
              objectFit: 'cover', 
              borderRadius: '8px', 
              marginBottom: '20px',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease', 
            }} 
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          />
          <h3 style={{ fontSize: '1.8rem', color: '#333' }}>Consulting</h3>
          <p style={{ fontSize: '1.2rem', color: '#555' }}>
            Leverage your years of experience and offer your expertise to companies.
          </p>
        </div>
        
        <div 
          style={{
            width: '450px', 
            textAlign: 'center',
            backgroundColor: '#fff',
            borderRadius: '10px',
            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)', // Deeper shadow
            padding: '20px',
            transition: 'transform 0.3s ease',
            border: '3px solid #ff9a00',
          }}
        >
          <img 
            src="/img/remotework.jpg" 
            alt="Remote Work" 
            style={{ 
              width: '100%', 
              height: '300px', 
              objectFit: 'cover', 
              borderRadius: '8px', 
              marginBottom: '20px',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease', 
            }} 
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          />
          <h3 style={{ fontSize: '1.8rem', color: '#333' }}>Remote Work</h3>
          <p style={{ fontSize: '1.2rem', color: '#555' }}>
            Work from home or anywhere with flexible hours and tasks.
          </p>
        </div>
      </section>

      {/* Buttons section */}
      <section 
        style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '20px', 
          marginTop: '50px', 
          width: '100%',
          alignItems: 'center',
        }}
      >
        <button 
          style={{
            padding: '18px 35px', 
            fontSize: '1.6rem', 
            fontWeight: 'bold', 
            cursor: 'pointer', 
            background: 'linear-gradient(135deg, #ff9a00, #e87c00)', // Gradient background
            color: '#e40000',  
            border: 'none', 
            borderRadius: '5px', 
            width: '300px',  
            height: '60px',  
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.3s ease',
          }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        >
          Browse Jobs
        </button>
        
        <button 
          style={{
            padding: '18px 35px', 
            fontSize: '1.6rem', 
            fontWeight: 'bold', 
            cursor: 'pointer', 
            background: 'linear-gradient(135deg, #ff9a00, #e87c00)', // Gradient background
            color: '#e40000',  
            border: 'none', 
            borderRadius: '5px', 
            width: '300px',  
            height: '60px',  
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.3s ease',
          }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        >
          Upload CV
        </button>
      </section>

      {/* Footer */}
      <footer 
        style={{
          marginTop: '40px', 
          fontSize: '1.0rem',
          backgroundColor: '#ff9a00',
          padding: '20px',
          width: '100%',
          textAlign: 'center',
        }}
      >
        <p>&copy; 2025 Phoenix | 
          <a href="#" style={{ color: 'black' }}> Privacy Policy</a> | 
          <a href="#" style={{ color: 'black' }}> Contact Us</a> |

        </p>
      </footer>
    </div>
  );
}
