import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Link } from 'react-router-dom';


export default function Contact() {
  

  const navigate = useNavigate(); // Initialize navigate function

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    alert('Thank you for contacting us! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-lg p-6 w-full max-w-md text-center border-t-4 border-orange-500">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Contact</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="Your Name"
              required
            />
          </div>

          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="Your Email"
              required
            />
          </div>

          <div>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="Your Message"
              rows="4"
              required
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-2 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600"
            >
              Send Message
            </button>
            <button 
              className="w-full py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 mt-2" 
              onClick={() => navigate('/')} // Now this works
            >
              Back
            </button>
          </div>
        </form>
      </div>
 
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
