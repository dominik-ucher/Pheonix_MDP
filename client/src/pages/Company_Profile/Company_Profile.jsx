"use client";

import { AuthContext } from "../../context/authContext";
import {
  Button,
  Card,
  TextInput,
  Textarea,
  FileInput,
  Label,
} from "flowbite-react";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Company_Profile() {
  const axiosInstance = axios.create({baseURL: import.meta.env.VITE_REACT_APP_API_URL,});
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    companyId: "",
    company_name: "",
    username: "",
    email: "",
    vat_number: "",
    address: "",
    ateco_code: "",
    business_sector: "",
    logo: "",
    description: "",
    website_link: "",
  });

  const [logoFile, setLogoFile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!currentUser || !currentUser.id) {
      navigate("/unauthorized_401");
      return;
    }

    // Fetch company data from the backend
    const fetchCompanyData = async () => {
      try {
        const res = await axiosInstance.get(`/api/company/${currentUser.id}`);
        setFormData(res.data);
        setLogoFile(res.data.logo);
      } catch (err) {
        console.error("Failed to fetch company data:", err);
        setError("Failed to load company data.");
      }
    };

    fetchCompanyData();
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
      const res = await axiosInstance.post("/api/upload_company_logo", uploadData, {
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
      await axiosInstance.delete("/api/delete_company_logo", {
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
      const payload = { ...formData, companyId: currentUser.id }; // Ensure companyId is included
      await axiosInstance.put("/api/company/update_company_profile", payload, {
        headers: { "Content-Type": "application/json" },
      });
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Update failed:", err);
      setError("Failed to update profile.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <Card className="w-full max-w-4xl shadow-lg p-8 rounded-lg bg-white">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Company Profile
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-semibold">Legal Company Name</label>
            <TextInput
              type="text"
              name="company_name"
              placeholder="Enter legal company name"
              value={formData.company_name}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">E-mail</label>
            <TextInput
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">Username</label>
            <TextInput
              type="text"
              name="username"
              placeholder="Enter username"
              value={formData.username}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">VAT Number</label>
            <TextInput
              type="text"
              name="vat_number"
              placeholder="Enter VAT number"
              value={formData.vat_number}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">Address</label>
            <TextInput
              type="text"
              name="address"
              placeholder="Enter company address"
              value={formData.address}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">ATECO Code</label>
            <TextInput
              type="text"
              name="ateco_code"
              placeholder="Enter ATECO code"
              value={formData.ateco_code}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">Business Sector</label>
            <TextInput
              type="text"
              name="business_sector"
              placeholder="Enter business sector"
              value={formData.business_sector}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <Label htmlFor="logo" value="Logo Upload" />
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

          <div className="col-span-2">
            <label className="block text-gray-700 font-semibold">Company Description</label>
            <Textarea
              name="description"
              placeholder="Provide a brief company description"
              rows={4}
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>

          <div className="col-span-2">
            <label className="block text-gray-700 font-semibold">Company Website</label>
            <TextInput
              type="url"
              name="website_link"
              placeholder="Enter website URL"
              value={formData.website_link}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-4">
          <Button color="blue" size="lg" onClick={handleUpdate}>
            Update
          </Button>
        </div>
      </Card>
    </div>
  );
}