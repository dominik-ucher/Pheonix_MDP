"use client";
import { Button, Card, TextInput, Textarea, Spinner } from "flowbite-react";
import React, { useState } from "react";

export default function UserApplication() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    resume: null,
    coverLetter: "",
    mobile: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let valid = true;
    let errors = {};

    if (!formData.name) {
      errors.name = "Full name is required";
      valid = false;
    }
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "A valid email is required";
      valid = false;
    }
    if (!formData.mobile || formData.mobile.length < 10) {
      errors.mobile = "Please enter a valid mobile number with country code";
      valid = false;
    }
    if (!formData.resume) {
      errors.resume = "Resume upload is required";
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const handleChange = (e) => {
    const { id, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setTimeout(() => {
      console.log("Submitted Data:", formData);
      setIsSubmitted(true);
      setIsLoading(false);
    }, 2000);
  };

  const handleGoBack = () => {
    setIsSubmitted(false);
    setFormData({
      name: "",
      email: "",
      resume: null,
      coverLetter: "",
      mobile: "",
    });
    setErrors({});
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
                {errors.name && <p className="text-red-600">{errors.name}</p>}

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
                {errors.email && <p className="text-red-600">{errors.email}</p>}

                {/* Mobile Input */}
                <label htmlFor="mobile" className="block text-lg font-medium text-gray-700">
                  Mobile Number (add +XX country code)
                </label>
                <TextInput
                  id="mobile"
                  type="number"
                  placeholder="Mobile number"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  onChange={handleChange}
                  required
                />
                {errors.mobile && <p className="text-red-600">{errors.mobile}</p>}

                {/* Resume Upload */}
                <label htmlFor="resume" className="block text-lg font-medium text-gray-700">
                  Upload Resume (.pdf or .docx file)
                </label>
                <input
                  type="file"
                  id="resume"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  onChange={handleChange}
                  accept=".pdf,.doc,.docx"
                  required
                />
                {errors.resume && <p className="text-red-600">{errors.resume}</p>}

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
                  {isLoading ? <Spinner size="sm" /> : "Submit Application"}
                </Button>
              </form>
            </>
          ) : (
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Thank You for Your Application!</h2>
              <p className="text-xl text-gray-600 mb-8">
                We have received your application and will get back to you soon.
              </p>
              <Button color="gray" size="lg" className="w-full text-lg" onClick={handleGoBack}>
                Go Back
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
