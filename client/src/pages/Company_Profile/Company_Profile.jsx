"use client";
import { Button, Card, TextInput, Select, Textarea, FileInput } from "flowbite-react";
import React from "react";
import { useNavigate } from "react-router-dom"; 

export default function Company_Profile() {
  // Initialize navigation function
  const navigate = useNavigate();

  // Function to handle back to dashboard navigation
  const handleBackToDashboard = () => {
    navigate('/company_dashboard');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <Card className="w-full max-w-4xl shadow-lg p-8 rounded-lg bg-white">
        {/* Page title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Company Profile</h1>
        
        {/* Profile form with 2-column grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Legal Company Name field */}
          <div>
            <label className="block text-gray-700 font-semibold">Legal Company Name</label>
            <TextInput type="text" placeholder="Enter legal company name" />
          </div>

          {/* VAT Number field */}
          <div>
            <label className="block text-gray-700 font-semibold">VAT Number</label>
            <TextInput type="text" placeholder="Enter VAT number" />
          </div>

          {/* Address field */}
          <div>
            <label className="block text-gray-700 font-semibold">Address</label>
            <TextInput type="text" placeholder="Enter company address" />
          </div>

          {/* ATECO Code field */}
          <div>
            <label className="block text-gray-700 font-semibold">ATECO Code</label>
            <TextInput type="text" placeholder="Enter ATECO code" />
          </div>

          {/* Business Sector dropdown */}
          <div>
            <label className="block text-gray-700 font-semibold">Business Sector</label>
            <Select>
              <option>Manufacturing</option>
              <option>Technology</option>
              <option>Retail</option>
              <option>Finance</option>
              <option>Other</option>
            </Select>
          </div>

          {/* Company Logo upload */}
          <div>
            <label className="block text-gray-700 font-semibold">Company Logo</label>
            <FileInput accept="image/*" />
          </div>

          {/* Company Description (full width) */}
          <div className="col-span-2">
            <label className="block text-gray-700 font-semibold">Company Description</label>
            <Textarea placeholder="Provide a brief company description" rows={4} />
          </div>

          {/* Company Website (full width) */}
          <div className="col-span-2">
            <label className="block text-gray-700 font-semibold">Company Website</label>
            <TextInput type="url" placeholder="Enter website URL" />
          </div>

          {/* Social Media Links (full width) */}
          <div className="col-span-2">
            <label className="block text-gray-700 font-semibold">Social Media Links</label>
            <TextInput type="text" placeholder="Enter social media profiles" />
          </div>
        </div>

        {/* Form action buttons */}
        <div className="mt-6 flex justify-center gap-4">
          <Button color="blue" size="lg">Save Changes</Button>
          <Button 
            color="gray" 
            size="lg"
            onClick={handleBackToDashboard} // Make Cancel button also go back to dashboard
          >
            Cancel
          </Button>
        </div>
      </Card>
    </div>
  );
}