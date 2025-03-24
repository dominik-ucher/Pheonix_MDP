import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';


export default function AboutUs() {
  return (
    <div 
      style={{ 
        fontFamily: 'Arial, sans-serif', 
        color: 'white',
        backgroundImage: 'url(/img/logoo.png)', // Logo as the background image
        backgroundSize: 'cover', // Ensures the background fills the entire page
        backgroundPosition: 'center',
        padding: '60px 20px',
        boxSizing: 'border-box',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      {/* Transparent Overlay */}
      <div 
        style={{
          position: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Slight dark overlay
          zIndex: '0',
        }}
      />

      {/* Animated Logo - Centered */}
      <motion.div 
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '40px',
          zIndex: '1', // Ensures it stays on top of the overlay
        }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <Link to="/">
          <motion.img 
            src="/img/logoo.png" 
            alt="Phoenix Logo" 
            style={{ width: '150px', height: 'auto' }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </Link>
      </motion.div>





      {/* Content Section */}
      <motion.div 
        style={{
          zIndex: '1', // Ensures it stays on top of the overlay
          maxWidth: '800px',
          backgroundColor: 'rgba(255, 255, 255, 0.9)', // Slightly transparent background for readability
          padding: '40px',
          borderRadius: '10px',
          textAlign: 'center',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {/* Header */}
        <motion.header 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h1 style={{ fontSize: '3rem', fontWeight: 'bold', color: '#e40000' }}>
            About Phoenix
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#555', marginTop: '10px' }}>
            Connecting silver-age professionals with meaningful opportunities.
          </p>
        </motion.header>

        {/* Who We Are Section */}
        <section style={{ marginTop: '30px' }}>
          <h2 style={{ color: '#e87c00', fontSize: '2.0rem' }}>Who We Are</h2>
          <p style={{ fontSize: '1.3rem', color: '#555' }}>
            Phoenix helps silver-age professionals find meaningful job opportunities. Our platform connects experienced individuals with companies looking for skilled expertise.
          </p>
        </section>

        {/* Our Mission Section */}
        <section style={{ marginTop: '30px' }}>
          <h2 style={{ color: '#e87c00', fontSize: '2.0rem' }}>Our Mission</h2>
          <p style={{ fontSize: '1.3rem', color: '#555' }}>
            We believe experience matters. Our goal is to create a supportive space for professionals to continue contributing their knowledge while enjoying flexible work.
          </p>
        </section>
      </motion.div>

      {/* Footer Section */}
      <footer 
        style={{ 
          marginTop: '50px',
          zIndex: '1', 
          padding: '20px',
          backgroundColor: '#ff9a00', 
          fontSize: '1.0rem',
          textAlign: 'center',
          width: '100%',
          position: 'absolute',
          bottom: '0',
          borderRadius: '10px',
        }}
      >
        <p style={{ color: 'black' }}>&copy; 2025 <span style={{ color: 'black' }}>Phoenix</span> |  
          <a href="#" style={{ color: 'black', textDecoration: 'none' }}> Privacy Policy</a> | 
          <Link to="/contact" style={{ color: 'black', textDecoration: 'none' }}> Contact Us</Link> | 
          <Link to="/about" style={{ color: 'black', textDecoration: 'none' }}> About Us</Link>
        </p>
      </footer>
    </div>
  );
}
