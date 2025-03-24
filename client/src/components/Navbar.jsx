'use client';

import { useState, useRef, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BsLayoutSidebarInset } from 'react-icons/bs';
import Logo from '../../img/logo.png';
import { AuthContext } from '../context/authContext';
import { Button } from 'flowbite-react';

export default function DefaultNavbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    // Add "fixed" in the className below for it to follow the screen downwards
    <header className="top-0 w-full z-50 shadow-md bg-gradient-to-r from-black via-gray-900 to-black">
      <nav ref={sidebarRef}>
        {/* Navbar container */}
        <div className="flex justify-between items-center px-6 py-4">
          {/* Logo and Title */}
          <Link to="/" className="flex items-center">
            <img src={Logo} alt="Logo" className="h-12" />
            <h1 className="ml-4 text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500">
              GoldingApp
            </h1>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-white text-lg font-semibold hover:text-yellow-400 transition-transform transform hover:scale-105">Home</Link>
            <Link to="/about"className="text-white text-lg font-semibold hover:text-yellow-400 transition-transform transform hover:scale-105">About</Link>
            <Link to="/contact" className="text-white text-lg font-semibold hover:text-yellow-400 transition-transform transform hover:scale-105">Contact</Link>
            {currentUser && (<span className="text-yellow-400 font-semibold text-lg">Hello, {currentUser.username}!</span>)}
            {currentUser && <Button color="gray" pill onClick="">Profile</Button>}
            {currentUser ? (<Button color="warning" pill onClick={handleLogout}>Logout</Button>):(<><Button color="gray" pill onClick={() => navigate('/login')} className="hover:bg-gray-700">Login</Button>
            <Button color="gray" pill onClick={() => navigate('/register')} className="hover:bg-gray-700">Register</Button></>)}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 focus:outline-none" onClick={() => setSidebarOpen(!sidebarOpen)} >
            <BsLayoutSidebarInset className="text-white text-2xl" />
          </button>
        </div>

        {/* Mobile Sidebar */}
        <div className={`fixed top-0 right-0 w-3/4 h-full bg-gradient-to-b from-gray-800 to-black p-6 shadow-lg transform ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-500 ease-in-out`}>
          <button className="text-gray-400 text-2xl mb-6 hover:text-gray-200" onClick={() => setSidebarOpen(false)}>x</button>
          <div className="flex flex-col space-y-4">
            <Link to="/" className="text-gray-300 text-lg font-medium hover:text-yellow-400 transition-transform transform hover:scale-105" onClick={() => setSidebarOpen(false)}>Home</Link>
            <Link to="/about" className="text-gray-300 text-lg font-medium hover:text-yellow-400 transition-transform transform hover:scale-105" onClick={() => setSidebarOpen(false)}>About</Link>
            <Link to="/contact" className="text-gray-300 text-lg font-medium hover:text-yellow-400 transition-transform transform hover:scale-105" onClick={() => setSidebarOpen(false)}>Contact</Link>
            {currentUser && (<Button color="gray" pill onClick={() => {navigate('/login'); setSidebarOpen(false); }}>Profile</Button>)}
            {currentUser ? (<Button color="warning" pill onClick={() => {handleLogout(); setSidebarOpen(false);}}>Logout</Button>) : (<><Button color="gray" pill onClick={() => {navigate('/login'); setSidebarOpen(false);}}>Login</Button><Button color="gray" pill onClick={() => {navigate('/register'); setSidebarOpen(false); }}>Register</Button></>)}
          </div>
        </div>
      </nav>
    </header>
  );
}