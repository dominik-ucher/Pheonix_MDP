import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../../../img/logo.png'
import axios from "axios";
'use client';
import { Button, FileInput, Label, TextInput } from 'flowbite-react';

const Register = () => {
  const axiosInstance = axios.create({baseURL: import.meta.env.VITE_REACT_APP_API_URL,});
  const [inputs, setInputs] = useState({
    first_name: "",
    last_name: "",
    birthdate: "",
    email: "",
    password: "",
    address: "",
    phone_number: "",
    link_to_cv: "",
  });
  const [err, setError] = useState(null);
  const [cvFile, setCvFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axiosInstance.post("/api/upload_CV", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setCvFile(res.data);
      setInputs((prev) => ({ ...prev, link_to_cv: res.data }));
    } catch (err) {
      console.error("Upload failed:", err);
      setError("Failed to upload CV");
    }
  };

  const handleDeleteCV = async () => {
    if (!cvFile) return;

    try {
      await axiosInstance.delete("/api/delete_CV", { data: { filename: cvFile } });
      setCvFile(null);
      setInputs((prev) => ({ ...prev, link_to_cv: "" }));
    } catch (err) {
      console.error("Delete failed:", err);
      setError("Failed to delete CV");
    }
  };

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if any of the input fields are empty
    if (!inputs.first_name || !inputs.last_name || !inputs.birthdate || !inputs.email || !inputs.password || !inputs.address || !inputs.phone_number || !inputs.link_to_cv) {
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
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500">
      {/* <img className="w-auto h-40 p-5" src={Logo} alt="" /> */}
      <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-300 w-96 mt-12 mb-12">
        <div className='flex items-center justify-center'><img src={Logo} alt="" className='w-32 mr-4'/></div>
        <h2 className="flex justify-center items-center text-2xl font-bold mb-4">Register</h2>
        <form className="flex max-w-md flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="text"
                value="First Name"
              />
            </div>
            <TextInput
              id="first_name"
              placeholder="John"
              required
              shadow
              type="text"
              name="first_name"
              onChange={handleChange}
            />
          </div>

          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="text"
                value="Last Name"
              />
            </div>
            <TextInput
              id="last_name"
              placeholder="Doe"
              required
              shadow
              type="text"
              name="last_name"
              onChange={handleChange}
            />
          </div>

          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="date"
                value="Birthdate"
              />
            </div>
            <input
              id="birthdate"
              type="date"
              name="birthdate"
              onChange={handleChange}
              className="shadow border rounded px-3 py-2 w-full"
            />
          </div>

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
                value="Address"
              />
            </div>
            <TextInput
              id="address"
              required
              shadow
              type="text"
              name="address"
              onChange={handleChange}
            />
          </div>

          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="text"
                value="Phone Number"
              />
            </div>
            <TextInput
              id="phone_number"
              required
              shadow
              type="text"
              name="phone_number"
              onChange={handleChange}
            />
          </div>

          <div>
            <Label htmlFor="cv" value="CV Upload" />
            {!cvFile ? (
              <FileInput id="cv" onChange={handleFileChange} />
            ) : (
              <div className="flex justify-between items-center bg-gray-100 p-2 rounded">
                <a href={`/upload/CV/${cvFile}`} target="_blank" className="text-blue-500 underline">
                  {cvFile}
                </a>
                <Button color="red" size="xs" onClick={handleDeleteCV}>Delete</Button>
              </div>
            )}
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