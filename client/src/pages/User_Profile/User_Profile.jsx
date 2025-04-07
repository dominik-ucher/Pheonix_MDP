"use client";
import { AuthContext } from "../../context/authContext";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import axios from "axios";
import { Button, FileInput, Label, TextInput } from "flowbite-react";

export default function UserProfile() {
  const axiosInstance = axios.create({baseURL: import.meta.env.VITE_REACT_APP_API_URL,});
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    birthdate: "",
    email: "",
    address: "",
    phone_number: "",
    profile_picture: "",
    link_to_CV: "",
  });

  const [logoFile, setLogoFile] = useState(null);
  const [cvFile, setCvFile] = useState(null);
  const [error, setError] = useState("");

    useEffect(() => {
      if (!currentUser || !currentUser.user_id) {
        navigate("/unauthorized_401");
        return;
      }
  
      // Fetch company data from the backend
      const fetchUserData = async () => {
        try {
          const res = await axiosInstance.get(`/api/user/${currentUser.user_id}`);
          setFormData(res.data);
          setLogoFile(res.data.logo);
        } catch (err) {
          console.error("Failed to fetch user data:", err);
          setError("Failed to load user data.");
        }
      };
  
      fetchUserData();
    }, [currentUser, navigate]);

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;
  
      const uploadData = new FormData();
      uploadData.append("file", file);
  
      try {
        const res = await axiosInstance.post("/api/upload_profile_picture", uploadData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setLogoFile(res.data);
        setFormData((prev) => ({ ...prev, logo: res.data }));
      } catch (err) {
        console.error("Upload failed:", err);
        setError("Failed to upload logo.");
      }
    };

    const handleDeleteLogo = async () => {
      if (!logoFile) {
        setError("No logo file to delete.");
        return;
      }
  
      try {
        await axiosInstance.delete("/api/delete_profile_picture", {
          data: { filename: logoFile },
        });
        setLogoFile(null);
        setFormData((prev) => ({ ...prev, logo: "" }));
      } catch (err) {
        console.error("Delete failed:", err);
        setError("Failed to delete logo.");
      }
    };

    const handleUpdate = async () => {
      try {
        const payload = { ...formData, companyId: currentUser.user_id }; // Ensure companyId is included
        await axiosInstance.put("/api/user/update_user_profile", payload, {
          headers: { "Content-Type": "application/json" },
        });
        alert("Profile updated successfully!");
      } catch (err) {
        console.error("Update failed:", err);
        setError("Failed to update profile.");
      }
    };

    const handleCVFileChange = async (e) => {
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
      if (!cvFile) {
        setError("No CV file to delete.");
        return;
      }
  
      try {
        await axiosInstance.delete("/api/delete_CV", { data: { filename: cvFile } }); // Ensure 'filename' matches the server's key
        setCvFile(null);
        setInputs((prev) => ({ ...prev, link_to_cv: "" }));
      } catch (err) {
        console.error("Delete failed:", err);
        setError(err.response?.data || "Failed to delete CV");
      }
    };

    

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="bg-white shadow-xl rounded-lg p-6 w-full max-w-md text-center border-t-4 border-orange-500">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">User Profile</h1>
        <p className="text-gray-600">Manage your personal details below.</p>

        <div className="relative mt-6">
          {!logoFile ? (
            <CgProfile className="w-40 h-40 mx-auto mb-4 border-4 border-orange-500 rounded-full object-cover" />
          ) : (
            <img
              src={logoFile}
              alt="Logo"
              className="w-40 h-40 mx-auto mb-4 border-4 border-orange-500 rounded-full object-cover"
            />
          )}
          {!logoFile ? (
            <FileInput id="logo" onChange={handleFileChange} />
          ) : (
            <div className="flex justify-between items-center bg-gray-100 p-2 rounded">
              <a
                href={`/upload/Company_Logo/${logoFile}`}
                target="_blank"
                className="text-blue-500 underline"
              >
                {logoFile.split("__")[1]}
              </a>
              <Button color="red" size="xs" onClick={handleDeleteLogo}>
                Delete
              </Button>
            </div>
          )}
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mt-6">First Name</label>
          <TextInput
          type="text"
          name="first_name"
          placeholder="Enter First Name"
          value={formData.first_name}
          onChange={handleInputChange}
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mt-6">Last Name</label>
          <TextInput
          type="text"
          name="last_name"
          placeholder="Enter Last Name"
          value={formData.last_name}
          onChange={handleInputChange}
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mt-6">Last Name</label>
          <TextInput
          type="text"
          name="birthdate"
          placeholder="Enter Birth Date"
          value={formData.birthdate}
          onChange={handleInputChange}
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mt-6">E-mail</label>
          <TextInput
          type="text"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleInputChange}
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mt-6">Address</label>
          <TextInput
          type="text"
          name="address"
          placeholder="Enter Address"
          value={formData.address}
          onChange={handleInputChange}
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mt-6">Phone Number</label>
          <TextInput
          type="text"
          name="phone_number"
          placeholder="Enter Phone Number"
          value={formData.phone_number}
          onChange={handleInputChange}
          />
        </div>

        <div>
          <Label className="mt-6" htmlFor="cv" value="CV Upload" />
          {!cvFile ? (
          <FileInput id="cv" onChange={handleCVFileChange} />
          ) : (
          <div className="flex justify-between items-center bg-gray-100 p-2 rounded">
          <a href={`/upload/CV/${cvFile}`} target="_blank" className="text-blue-500 underline">
          {cvFile.split('__')[1]}
          </a>
          <Button color="red" size="xs" onClick={handleDeleteCV}>Delete</Button>
          </div>
          )}
        </div>
        

        <div className="mt-6 flex justify-center gap-4">
          <Button color="blue" size="lg" onClick={handleUpdate}>
            Update
          </Button>
        </div>

        
      </div>
    </div>
  );
}