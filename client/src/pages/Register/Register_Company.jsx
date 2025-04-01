import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../../../img/logo.png'
import axios from "axios";
'use client';
import { Button, Label, TextInput } from 'flowbite-react';

const Register = () => {
  const axiosInstance = axios.create({baseURL: import.meta.env.VITE_REACT_APP_API_URL,});
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    company_name: "",
    vat_number: "",
    ateco_code: "",
    business_sector: "",
  });
  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if any of the input fields are empty
    if (!inputs.email || !inputs.username || !inputs.password || !inputs.company_name || !inputs.vat_number || !inputs.ateco_code || !inputs.business_sector) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      await axiosInstance.post("/api/auth_company/register", inputs);
      navigate("/login_company");
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500">
      {/* <img className="w-auto h-40 p-5" src={Logo} alt="" /> */}
      <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-300 w-96 mt-12 mb-12">
        <div className='flex items-center justify-center'><img src={Logo} alt="" className='w-32 mr-4'/></div>
        <h2 className="flex justify-center items-center text-2xl font-bold mb-4">Register</h2>
        <form className="flex max-w-md flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="email"
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
                htmlFor="text"
                value="Username"
              />
            </div>
            <TextInput
              id="username"
              placeholder=""
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

          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="text"
                value="Company Name"
              />
            </div>
            <TextInput
              id="company_name"
              required
              shadow
              type="text"
              name="company_name"
              onChange={handleChange}
            />
          </div>

          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="text"
                value="VAT Number"
              />
            </div>
            <TextInput
              id="vat_number"
              required
              shadow
              type="text"
              name="vat_number"
              onChange={handleChange}
            />
          </div>

          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="text"
                value="Ateco Code"
              />
            </div>
            <TextInput
              id="ateco_code"
              required
              shadow
              type="text"
              name="ateco_code"
              onChange={handleChange}
            />
          </div>

          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="text"
                value="Business Sector"
              />
            </div>
            <TextInput
              id="business_sector"
              required
              shadow
              type="text"
              name="business_sector"
              onChange={handleChange}
            />
          </div>

          <div className="flex items-center gap-2">
          </div>
          <Button type="submit" color="dark" onClick={handleSubmit}>
            Register Account
          </Button>
          {err && <p className='bg-red-100 text-red-600 font-semibold text-center p-3 rounded-lg'>{err}</p>}
        </form>
      </div>
    </div>
  )
}

export default Register;