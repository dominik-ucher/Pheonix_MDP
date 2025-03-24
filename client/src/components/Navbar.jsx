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
  const {currentUser, logout} = useContext(AuthContext);
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
    <div className="main-container top-0 left-0 w-full z-50 bg-black" style={{ overflow: 'hidden' }} ref={sidebarRef}> 
      <div className='flex items-center justify-between p-4'>
        <Link className="flex items-center" to="/">
          <img className="h-14" src={Logo} alt="Logo" />  
          <h1 className="flex items-center justify-center px-6 text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500">GoldingApp</h1>
        </Link>
        <div className='hidden md:flex md:items-center md:justify-center flex'>
          <div className='flex space-x-4'>
            <Link className='text-lg text-white p-3 hover:bg-gray-700' to="/">Home</Link>
            <Link className='text-lg text-white p-3 hover:bg-gray-700' to="/about">About</Link>
            <Link className='text-lg text-white p-3 hover:bg-gray-700' to="/contact">Contact</Link>
            {currentUser && <span className='text-lg underline text-white p-3'>Hello, {currentUser.username}!</span>}
            <div className='flex items-center justify-center space-x-4'> 
            {currentUser && <Button color="gray" onClick="">Profile</Button>}
            {currentUser && <Button color="warning" onClick={handleLogout}>Logout</Button>}
            {!currentUser && <Button color="gray" onClick={() => navigate('/login')}>Login</Button>}
            {!currentUser && <Button color="gray" onClick={() => navigate('/register')}>Register</Button>}
            </div>
          </div>
        </div>
        <button className='md:hidden p-2' onClick={() => setSidebarOpen(!sidebarOpen)}>
          <BsLayoutSidebarInset className="h-6 w-auto" color="white" />
        </button>
      </div>

    <div className={`md:hidden fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 ${sidebarOpen ? 'block' : 'hidden'}`} onClick={() => setSidebarOpen(false)}></div>
      <div className={`fixed top-0 right-0 w-3/4 h-full bg-black p-4 transform ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out`}>
        <div className='flex flex-col space-y-4'>
          <Link className='text-sm text-white p-2 hover:bg-gray-700' to="/" onClick={() => setSidebarOpen(false)}>Home</Link>
          <Link className='text-sm text-white p-2 hover:bg-gray-700' to="/about" onClick={() => setSidebarOpen(false)}>About</Link>
          <Link className='text-sm text-white p-2 hover:bg-gray-700' to="/contact" onClick={() => setSidebarOpen(false)}>Contact</Link>
          {currentUser && <Button color="gray" className="mb-2" onClick="">Profile</Button>}
          {currentUser && <Button color="warning" className="mb-2" onClick={handleLogout}>Logout</Button>}
          {!currentUser && <Button color="gray" onClick={() => navigate('/login')}>Login</Button>}
          {!currentUser && <Button color="gray" onClick={() => navigate('/register')}>Register</Button>}
        </div>
      </div>
    </div>
  );
}