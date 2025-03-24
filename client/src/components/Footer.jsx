import React from 'react';
'use client';
import { Link } from 'react-router-dom';
import { FaRegCopyright, FaFacebook, FaInstagram } from 'react-icons/fa6';

const FooterTemp = () => {
  return (
    <>
      {/* Desktop Footer */}
      <div className="hidden md:block bg-gradient-to-r from-black via-gray-900 to-black text-white">
        <div className="container mx-auto py-6 px-4">
          <div className="flex items-center justify-between mb-6">
            {/* Navigation Links */}
            <div className="flex space-x-6">
              <Link to="/login" className="text-lg hover:text-yellow-400 transition-transform transform hover:scale-105">Login</Link>
              <Link to="/register" className="text-lg hover:text-yellow-400 transition-transform transform hover:scale-105">Register</Link>
              <Link to="/about" className="text-lg hover:text-yellow-400 transition-transform transform hover:scale-105">About</Link>
              <Link to="/contact" className="text-lg hover:text-yellow-400 transition-transform transform hover:scale-105">Contact</Link>
            </div>
            {/* Social Media Links */}
            <div className="flex space-x-6">
              <Link to="https://www.polimi.it/" className="hover:text-yellow-400 transition-transform transform hover:scale-125">
                <FaFacebook size={24} />
              </Link>
              <Link to="https://www.polimi.it/" className="hover:text-yellow-400 transition-transform transform hover:scale-125">
                <FaInstagram size={24} />
              </Link>
            </div>
          </div>
          <hr className="border-gray-500" />
          <div className="flex justify-center items-center pt-6">
            <FaRegCopyright size={16} className="mr-2 text-gray-400" />
            <Link to="/" className="text-gray-400 hover:text-yellow-400 transition">
              2025 GoldingApp
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Footer */}
      <div className="block md:hidden bg-gradient-to-b from-gray-900 to-black text-white">
        <div className="container mx-auto py-6 px-4">
          <div className="flex flex-col items-center space-y-4 mb-6">
            {/* Navigation Links */}
            <Link to="/login" className="text-lg hover:text-yellow-400 transition-transform transform hover:scale-105">Login</Link>
            <Link to="/register" className="text-lg hover:text-yellow-400 transition-transform transform hover:scale-105">Register</Link>
            <Link to="/about" className="text-lg hover:text-yellow-400 transition-transform transform hover:scale-105">About</Link>
            <Link to="/contact" className="text-lg hover:text-yellow-400 transition-transform transform hover:scale-105">Contact</Link>
            {/* Social Media Links */}
            <div className="flex space-x-6">
              <Link to="https://www.polimi.it/" className="hover:text-yellow-400 transition-transform transform hover:scale-125">
                <FaFacebook size={24} />
              </Link>
              <Link to="https://www.polimi.it/" className="hover:text-yellow-400 transition-transform transform hover:scale-125">
                <FaInstagram size={24} />
              </Link>
            </div>
          </div>
          <hr className="border-gray-500" />
          <div className="flex justify-center items-center pt-6">
            <FaRegCopyright size={16} className="mr-2 text-gray-400" />
            <Link to="/" className="text-gray-400 hover:text-yellow-400 transition">
              2025 GoldingApp
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default FooterTemp;