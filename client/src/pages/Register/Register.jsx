import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../../../img/logo.png'
import axios from "axios";
'use client';
import { Button, Label, TextInput } from 'flowbite-react';

const Register = () => {
  const axiosInstance = axios.create({baseURL: import.meta.env.VITE_REACT_APP_API_URL,});
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if any of the input fields are empty
    if (!inputs.username || !inputs.email || !inputs.password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      await axiosInstance.post("/api/auth/register", inputs);
      navigate("/login");
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <img className="w-auto h-40 p-5" src={Logo} alt="" />
      <div className="bg-gray-200 p-6 rounded-md shadow-md">
        <h2 className="flex justify-center items-center text-2xl font-bold mb-4">Register</h2>
        <form className="flex max-w-md flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="name2"
                value="Username"
              />
            </div>
            <TextInput
              id="username"
              placeholder="Username"
              required
              shadow
              type="text"
              name="username"
              onChange={handleChange}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="email2"
                value="Email"
              />
            </div>
            <TextInput
              id="email"
              placeholder="name@gmail.com"
              required
              shadow
              type="email"
              name="email"
              onChange={handleChange}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="password2"
                value="Password"
              />
            </div>
            <TextInput
              id="password"
              required
              shadow
              type="password"
              name="password"
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center gap-2">
          </div>
          <Button type="submit" onClick={handleSubmit}>
            Register Account
          </Button>
          {err && <p className='text-red-500 font-bold flex jusitfy-center items-center'>{err}</p>}
        </form>
      </div>
    </div>
  )
}

export default Register;