"use client";
import { Button, Card, TextInput, Textarea } from "flowbite-react";
import React, { useState } from "react";

export default function UserApplication() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    resume: null,
    coverLetter: "",
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false); // New state for submission status

  const handleChange = (e) => {
    const { id, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    setIsSubmitted(true); // Set submission status to true
    // Implement actual form submission logic here
  };

  return (
    <div className="flex flex-col min-h-screen bg-white p-6">
      <div className="flex-grow max-w-2xl mx-auto">
        <Card className="w-full text-center shadow-lg p-8 rounded-lg bg-white border border-yellow-500">
          {!isSubmitted ? (
            <>
              <h1 className="text-5xl font-bold text-gray-900 mb-6">Job Application</h1>
              <p className="text-2xl text-gray-600 mb-8">
                Fill out the form below to apply for your desired position.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6 text-left">
                {/* Name Input */}
                <label htmlFor="name" className="block text-lg font-medium text-gray-700">
                  Full Name
                </label>
                <TextInput
                  id="name"
                  type="text"
                  placeholder="Full Name"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  onChange={handleChange}
                  required
                />

                {/* Email Input */}
                <label htmlFor="email" className="block text-lg font-medium text-gray-700">
                  Email Address
                </label>
                <TextInput
                  id="email"
                  type="email"
                  placeholder="Email Address"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  onChange={handleChange}
                  required
                />

                {/* Resume Upload */}
                <label htmlFor="resume" className="block text-lg font-medium text-gray-700">
                  Upload Resume
                </label>
                <input
                  type="file"
                  id="resume"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  onChange={handleChange}
                  accept=".pdf,.doc,.docx"
                  required
                />

                {/* Cover Letter */}
                <label htmlFor="coverLetter" className="block text-lg font-medium text-gray-700">
                  Cover Letter
                </label>
                <Textarea
                  id="coverLetter"
                  placeholder="Write a short cover letter..."
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  onChange={handleChange}
                />

                {/* Submit Button */}
                <Button type="submit" color="yellow" size="lg" className="w-full bg-yellow-500 hover:bg-yellow-600 text-white text-2xl py-4">
                  Submit Application
                </Button>
              </form>
            </>
          ) : (
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Thank You for Your Application!</h2>
              <p className="text-xl text-gray-600 mb-8">
                We have received your application and will get back to you soon.
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
