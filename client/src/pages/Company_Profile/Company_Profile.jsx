"use client";
import { AuthContext } from '../../context/authContext';
import { Button, Card, TextInput, Select, Textarea, FileInput } from "flowbite-react";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Company_Profile() {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const [formData, setFormData] = React.useState({
    company_name: currentUser?.company_name || "",
    username: currentUser?.username || "",
    email: currentUser?.email || "",
    vat_number: currentUser?.vat_number || "",
    address: currentUser?.address || "",
    ateco_code: currentUser?.ateco_code || "",
    business_sector: currentUser?.business_sector || "",
    logo: currentUser?.logo || "",
    description: currentUser?.description || "",
    website_link: currentUser?.website_link || "",
  });

  useEffect(() => {
    if (!currentUser || !currentUser.company_name) {
      navigate('/unauthorized_401');
    }
  }, [currentUser, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files[0] }));
  };

  const handleUpdate = async () => {
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });
    formDataToSend.append("companyId", currentUser?.id);

    try {
      const response = await axios.put("/api/company/edit_company_profile", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert(response.data.message || "Profile updated successfully!");
    } catch (error) {
      console.error(error);
      alert(error.response?.data || "An error occurred while updating the profile.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <Card className="w-full max-w-4xl shadow-lg p-8 rounded-lg bg-white">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Company Profile</h1>
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
              type="text"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold">Username</label>
            <TextInput
              type="text"
              name="username"
              placeholder="Enter Username"
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
              placeholder="Enter Business Sector"
              value={formData.business_sector}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold">Company Logo</label>
            <FileInput
              accept="image/*"
              name="logo"
              onChange={handleFileChange}
            />
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
          <Button color="blue" size="lg" onClick={handleUpdate}>Update</Button>
        </div>
      </Card>
    </div>
  );
}