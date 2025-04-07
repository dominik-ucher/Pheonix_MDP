"use client";
import { Button, Label, Select, TextInput, Textarea, Card } from "flowbite-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiTrash } from "react-icons/hi2";

export default function Company_Appl_Dashboard() {
  const [job, setJob] = useState({
    title: "",
    location: "",
    start_date: "",
    employment_type: "full-time",
    application_deadline: "",
    job_description: "",
    question1: "",
    question2: "",
    question3: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Job Posted:", job);
  };

  const handleBackToDashboard = () => {
    navigate('/company_dashboard');
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
            <Label htmlFor="place" value="Location" />
            <TextInput 
              id="place" 
              name="place" 
              value={job.place} 
              onChange={handleChange} 
              required 
            />
            {job.place && (
              <button
                type="button"
                onClick={() => clearField("place")}
                className="absolute right-2 top-9 text-gray-500 hover:text-gray-700"
              >
                <HiTrash className="w-5 h-5" />
              </button>
            )}
          </div>
          
          {/* Date fields in original 2-column layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startDate" value="Start Date" />
              <TextInput 
                id="startDate" 
                name="startDate" 
                type="date" 
                value={job.startDate} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div>
              <Label htmlFor="deadline" value="Application Deadline" />
              <TextInput 
                id="deadline" 
                name="deadline" 
                type="date" 
                value={job.deadline} 
                onChange={handleChange} 
                required 
              />
            </div>
          </div>
          
          {/* Job Type dropdown (no clear button needed) */}
          <div>
            <Label htmlFor="jobType" value="Job Type" />
            <Select 
              id="jobType" 
              name="jobType" 
              value={job.jobType} 
              onChange={handleChange}
            >
              <option value="full-time">Full-Time</option>
              <option value="part-time">Part-Time</option>
            </Select>
          </div>
          
          {/* Job Description with clear button */}
          <div className="relative">
            <Label htmlFor="description" value="Job Description" />
            <Textarea 
              id="description" 
              name="description" 
              rows={4} 
              value={job.description} 
              onChange={handleChange} 
              required 
            />
            {job.description && (
              <button
                type="button"
                onClick={() => clearField("description")}
                className="absolute right-2 top-9 text-gray-500 hover:text-gray-700"
              >
                <HiTrash className="w-5 h-5" />
              </button>
            )}
          </div>
          
          {/* Optional questions with clear buttons */}
          <div className="relative">
            <Label htmlFor="question1" value="Optional Question 1" />
            <Textarea 
              id="question1" 
              name="question1" 
              rows={2} 
              value={job.question1} 
              onChange={handleChange} 
            />
            {job.question1 && (
              <button
                type="button"
                onClick={() => clearField("question1")}
                className="absolute right-2 top-9 text-gray-500 hover:text-gray-700"
              >
                <HiTrash className="w-5 h-5" />
              </button>
            )}
          </div>
          
          <div className="relative">
            <Label htmlFor="question2" value="Optional Question 2" />
            <Textarea 
              id="question2" 
              name="question2" 
              rows={2} 
              value={job.question2} 
              onChange={handleChange} 
            />
            {job.question2 && (
              <button
                type="button"
                onClick={() => clearField("question2")}
                className="absolute right-2 top-9 text-gray-500 hover:text-gray-700"
              >
                <HiTrash className="w-5 h-5" />
              </button>
            )}
          </div>
          
          <div className="relative">
            <Label htmlFor="question3" value="Optional Question 3" />
            <Textarea 
              id="question3" 
              name="question3" 
              rows={2} 
              value={job.question3} 
              onChange={handleChange} 
            />
            {job.question3 && (
              <button
                type="button"
                onClick={() => clearField("question3")}
                className="absolute right-2 top-9 text-gray-500 hover:text-gray-700"
              >
                <HiTrash className="w-5 h-5" />
              </button>
            )}
          </div>
          
          {/* Form action buttons */}
          <div className="flex justify-end gap-4 mt-6">
            <Button 
              color="gray" 
              type="button" 
              onClick={handleBackToDashboard}
            >
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