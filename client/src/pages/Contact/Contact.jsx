import React, { useState } from 'react';
import { Label, TextInput, Select, Textarea, Button, Spinner } from 'flowbite-react';
import { HiMail } from 'react-icons/hi';
import Logo from '../../../img/logo.png';
import axios from 'axios';

const Contact = () => {
  const axiosInstance = axios.create({baseURL: import.meta.env.VITE_REACT_APP_API_URL,});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSent, setIsSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);  

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
  
    try {
      const response = await axiosInstance.post('/api/contact/send-email', formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 200) {
        // Handle success
        setIsSent(true);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
        setIsLoading(false);
      } else {
        // Handle failure
        console.error('Failed to send email');
      }
    } catch (error) {
      console.error('An error occurred', error);
    }
  };

  return (
    <div className="grid grid-cols-10 gap-4 md:px-20">
      <div className="col-span-10 md:col-span-5 mt-20">
        <h1 className="underline decoration-2 text-center font-bold text-4xl mt-5">Contact Us</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-2 block px-4 mt-20">
            <Label htmlFor="name" value="Name" />
          </div>
          <TextInput
            className="px-4"
            id="name"
            name="name"
            sizing="md"
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />

          <div className="mt-4 px-4">
            <div className="mb-2 block">
              <Label htmlFor="email" value="Email" />
            </div>
            <TextInput
              icon={HiMail}
              id="email"
              name="email"
              placeholder="name@gmail.com"
              value={formData.email}
              onChange={handleInputChange}
              required
              type="email"
            />
          </div>

          <div className="mb-2 block mt-4 px-4">
            <Label htmlFor="subject" value="Subject" />
          <TextInput
            id="subject"
            name="subject"
            sizing="md"
            type="text"
            value={formData.subject}
            onChange={handleInputChange}
          />
          </div>

          <div className="mt-4 px-4" id="textarea">
            <div className="mb-2 block">
              <Label htmlFor="message" value="Your Inquiry" />
            </div>
            <Textarea
              id="message"
              name="message"
              placeholder="Message..."
              value={formData.message}
              onChange={handleInputChange}
              required
              rows={4}
            />
          </div>

          <div className="px-4 mt-4">
          <Button pill size="lg" color="dark" onClick={handleSubmit} disabled={isLoading}>{isLoading ? (<Spinner aria-label="Spinner button example" />) : ('Send' )}</Button>
            {isSent && (
              <div className="text-green-500">Email Sent</div>
            )}
          </div>
        </form>
      </div>
      <div className="col-span-10 md:col-span-5 mt-20">
            <h1 className='font-bold text-xl mt-4 px-4'>Address:</h1>
            <h2 className='text-base mt-4 px-4 underline'>Piazza Leonardo da Vinci 32,</h2>
            <h2 className='text-base px-4 underline'>20133 Milano MI</h2>
            <h1 className='font-bold text-xl mt-4 px-4'>Post Box:</h1>
            <h2 className='text-base mt-4 px-4 underline'>Leonardo Campus. Building 3,</h2>
            <h2 className='text-base px-4 underline'>Piazza Leonardo da Vinci 32 (floor -1)</h2>
            <h1 className='font-bold text-xl mt-4 px-4'>Visiting Hours:</h1>
            <h2 className='text-base mt-4 px-4'>We are currently not taking drop-in visiting. To be able to arrange a meeting please fill out the Contact Form and we will get back to you as soon as possible!</h2>
            <div className='flex justify-center items-center mt-4'>
              <img src={Logo} className="w-2/3" alt="" />
            </div>
      </div>
    </div>
  );
};

export default Contact;