import React, { useEffect, useState } from 'react';
'use client';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { FaRegCopyright, FaFacebook, FaInstagram } from "react-icons/fa6";

const FooterTemp = () => {
  const axiosInstance = axios.create({baseURL: import.meta.env.VITE_REACT_APP_API_URL,});


    return (
      <>
      <div className='md:block hidden '>
      <div className='flex flex-col h-auto bg-black overflow-hidden flex-shrink-0'>
        <div className='text-md text-white flex pt-6 pb-6'>
          <Link to="/about" className='hover:underline ml-auto'>About</Link>
          <Link to="/contact" className='hover:underline ml-4'>Contact</Link>
          <Link to="https://www.polimi.it/" className='hover:underline ml-4'><FaFacebook color="white" className='w-6 h-auto'/></Link>
          <Link to="https://www.polimi.it/" className='hover:underline px-4'><FaInstagram color="white" className='w-6 h-auto'/></Link> 
        </div>
        <div className='flex justify-center'>
        <div className="w-11/12 h-px bg-white"></div>
        </div>
        <div className='flex justify-center text-md text-gray-400 pt-6 pb-6'>
          <FaRegCopyright color="gray" className="mr-2 pt-1 h-auto" />
          <Link to="/" className='hover:underline'>2025 GoldingApp</Link>
        </div>
      </div>
      </div>

      <div className='block md:hidden'>
        <div className='flex flex-col h-auto bg-black overflow-hidden flex-shrink-0'>
          <div className='text-md text-white flex flex-col p-4'>
            <div className='flex flex-col items-center mt-4'>
              <Link to="/about" className='hover:underline mb-2'>About</Link>
              <Link to="/contact" className='hover:underline mb-2'>Contact</Link>
              <Link to="https://www.polimi.it/" className='hover:underline mb-2'><FaFacebook color="white" className='w-6 h-auto'/></Link>
              <Link to="https://www.polimi.it/" className='hover:underline mb-2'><FaInstagram color="white" className='w-6 h-auto'/></Link>
            </div>
          </div>
          <div className='flex justify-center'>
          <div className="w-11/12 h-px bg-white"></div>
          </div>
          <div className='flex justify-center text-md text-gray-400 pt-6 pb-6'>
          <FaRegCopyright color="gray" className="mr-2 pt-1 h-auto" />
          <Link to="/" className='hover:underline'>2025 GoldingApp</Link>
        </div>
        </div>
      </div>
      </>
    )
}

export default FooterTemp