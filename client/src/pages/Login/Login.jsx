import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Logo from '../../../img/logo.png'
import { AuthContext } from '../../context/authContext'
'use client';
import { Button, Label, Spinner, TextInput } from 'flowbite-react';

const Login = () => {
  const axiosInstance = axios.create({baseURL: import.meta.env.VITE_REACT_APP_API_URL,});
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [err, setError] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);


  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);

    setTimeout(()=>{
      setIsLoading(false);
    }, 1000)

    e.preventDefault();
    try {
      await login(inputs)
      navigate("/");
    } catch (err) {
      setError(err.response.data);
    }
  };


  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500">
    <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-300 w-96">
    <div className='flex items-center justify-center'><img src={Logo} alt="" className='w-32 mr-4'/></div>
    <h2 className="flex justify-center items-center text-2xl font-bold mb-4">Log In</h2>
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
          type="text"
          name="email"
          onChange={handleChange}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="password"
            value="Password"
          />
        </div>
        <TextInput
          id="password"
          required
          type="password"
          name="password"
          onChange={handleChange}
        />
      </div>
      <Button type="submit" onClick={handleSubmit} disabled={isLoading} color="dark">
      {isLoading ? (<Spinner aria-label="Spinner button example" />) : ('Log In' )}
      </Button>
      {err && <p className='bg-red-100 text-red-600 font-semibold text-center p-3 rounded-lg'>{err}</p>}
      <h2>You have not signed up yet?</h2> 
      <h2>Click <Link className="font-bold underline pointer" to="/register">here</Link> to register a new user!</h2>
      <h2>Click <Link className="font-bold underline pointer" to="/register">here</Link> login as a company!</h2>
    </form>
    </div>
    </div>
  );
};

export default Login; 