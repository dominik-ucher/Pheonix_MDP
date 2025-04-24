"use client";
import axios from "axios";
import { Button, Label, Select, TextInput, Textarea, Card } from "flowbite-react";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiTrash } from "react-icons/hi2";
import { AuthContext } from "../../context/authContext";
import { Link } from 'react-router-dom';

export default function Company_Appl_Dashboard() {
  const axiosInstance = axios.create({ baseURL: import.meta.env.VITE_REACT_APP_API_URL });
  const [job, setJob] = useState({
    title: "",
    location: "",
    start_date: "",
    employment_type: "full-time",
    application_deadline: "",
    job_description: "",
    question1: "",
    question2: "",
    question3: "",
  });

  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (!currentUser || !currentUser.id) {
      navigate("/unauthorized_401");
      return;
    }
  }, [currentUser, navigate]);

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post("/api/company/create_job", {
        ...job,
        company_id: currentUser.id, // Dynamically include currentUser.id
      });
      console.log("Job Posted:", response.data);
      navigate("/company_appl_dashboard");
    } catch (error) {
      console.error("Error posting the job:", error.response?.data || error.message);
    }
  };

  const handleBackToDashboard = () => {
    navigate("/company_dashboard");
  };

  const clearField = (fieldName) => {
    setJob({ ...job, [fieldName]: "" });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <Card className="w-full max-w-4xl shadow-lg p-8 rounded-lg bg-white">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Manage Job Postings</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Job Title field with clear button */}
          <div className="relative">
            <Label htmlFor="title" value="Job Title" />
            <TextInput
              id="title"
              name="title"
              value={job.title}
              onChange={handleChange}
              required
            />
            {job.title && (
              <button
                type="button"
                onClick={() => clearField("title")}
                className="absolute right-2 top-9 text-gray-500 hover:text-gray-700"
              >
                <HiTrash className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Location field with clear button */}
          <div className="relative">
            <Label htmlFor="location" value="Location" />
            <TextInput
              id="location"
              name="location"
              value={job.location}
              onChange={handleChange}
              required
            />
            {job.location && (
              <button
                type="button"
                onClick={() => clearField("location")}
                className="absolute right-2 top-9 text-gray-500 hover:text-gray-700"
              >
                <HiTrash className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Date fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="start_date" value="Start Date" />
              <TextInput
                id="start_date"
                name="start_date"
                type="date"
                value={job.start_date}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="application_deadline" value="Application Deadline" />
              <TextInput
                id="application_deadline"
                name="application_deadline"
                type="date"
                value={job.application_deadline}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Employment Type dropdown */}
          <div>
            <Label htmlFor="employment_type" value="Job Type" />
            <Select
              id="employment_type"
              name="employment_type"
              value={job.employment_type}
              onChange={handleChange}
            >
              <option value="full-time">Full-Time</option>
              <option value="part-time">Part-Time</option>
            </Select>
          </div>

          {/* Job Description with clear button */}
          <div className="relative">
            <Label htmlFor="job_description" value="Job Description" />
            <Textarea
              id="job_description"
              name="job_description"
              rows={4}
              value={job.job_description}
              onChange={handleChange}
              required
            />
            {job.job_description && (
              <button
                type="button"
                onClick={() => clearField("job_description")}
                className="absolute right-2 top-9 text-gray-500 hover:text-gray-700"
              >
                <HiTrash className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Optional questions */}
          {["question1", "question2", "question3"].map((question, index) => (
            <div key={index} className="relative">
              <Label htmlFor={question} value={`Optional Question ${index + 1}`} />
              <Textarea
                id={question}
                name={question}
                rows={2}
                value={job[question]}
                onChange={handleChange}
              />
              {job[question] && (
                <button
                  type="button"
                  onClick={() => clearField(question)}
                  className="absolute right-2 top-9 text-gray-500 hover:text-gray-700"
                >
                  <HiTrash className="w-5 h-5" />
                </button>
              )}
            </div>
          ))}

          {/* Buttons */}
          <div className="flex justify-end gap-4 mt-6">
            <Button color="gray" type="button" onClick={handleBackToDashboard}>
              Cancel
            </Button>
            <Button color="blue" type="submit">
              Post Job
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}