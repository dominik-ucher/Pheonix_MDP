'use client';

import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BsLayoutSidebarInset } from 'react-icons/bs';
import Logo from '../../img/logo.png';

export default function DefaultNavbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

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
          <img className="h-12" src={Logo} alt="Logo" />  
        </Link>
        <div className='hidden md:flex md:items-center md:justify-center flex'>
          <div className='flex space-x-4'>
            <Link className='text-lg text-white p-3 hover:bg-gray-700' to="/">Home</Link>
            <Link className='text-lg text-white p-3 hover:bg-gray-700' to="/about">About</Link>
            <Link className='text-lg text-white p-3 hover:bg-gray-700' to="/contact">Contact</Link>
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
        </div>
      </div>
    </div>
  );
}