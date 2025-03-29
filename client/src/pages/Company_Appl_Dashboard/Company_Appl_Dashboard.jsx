"use client";
import { Table, Button, Card, Select } from "flowbite-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 

export default function Company_Appl_Dashboard() {
  const navigate = useNavigate(); 

  const handleBackToDashboard = () => {
    navigate('/company_dashboard');
  };

  const [selectedJob, setSelectedJob] = useState(null);
  
  // Mock data for applicants
  const [applicants, setApplicants] = useState([
    { id: 1, firstName: "John", lastName: "Doe", email: "john@example.com", match: "85%", status: "Pending", profileLink: "#" },
    { id: 2, firstName: "Jane", lastName: "Smith", email: "jane@example.com", match: "92%", status: "Accepted", profileLink: "#" },
    { id: 3, firstName: "Bob", lastName: "Johnson", email: "bob@example.com", match: "78%", status: "Rejected", profileLink: "#" },
    { id: 4, firstName: "Alice", lastName: "Williams", email: "alice@example.com", match: "88%", status: "Interview", profileLink: "#" },
  ]);
  
  // Mock data for job listings
  const jobListings = [
    { title: "Senior Engineer", deadline: "2025-04-15", applicants: 12 },
    { title: "Project Manager", deadline: "2025-04-20", applicants: 8 },
    { title: "Marketing Lead", deadline: "2025-04-25", applicants: 5 },
  ];

  // Updates the status of an applicant
  const handleStatusChange = (applicantId, newStatus) => {
    setApplicants(applicants.map(applicant => 
      applicant.id === applicantId ? { ...applicant, status: newStatus } : applicant
    ));
  };

  // Delete an applicant from the list 
  // If needed just remove the comment code and the Delete applicant button in line 138
  //const handleDeleteApplicant = (applicantId) => {
    //setApplicants(applicants.filter(applicant => applicant.id !== applicantId));
  //};

  return (
    <div className="flex flex-col items-center p-6 bg-gray-50 min-h-screen">
      {/* Back to Dashboard button*/}
      <div className="w-full max-w-4xl mb-4">
        <Button 
          color="gray" 
          onClick={handleBackToDashboard}
          className="mb-4"
        >
          ← Back to Dashboard
        </Button>
      </div>

      {/* Main job listings card */}
      <Card className="w-full max-w-4xl p-6 shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Job Listings</h1>
        
        {/* Job listings table */}
        <Table>
          <Table.Head>
            <Table.HeadCell>Title</Table.HeadCell>
            <Table.HeadCell>Deadline</Table.HeadCell>
            <Table.HeadCell>Applicants</Table.HeadCell>
            <Table.HeadCell>Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {/* Map through job listings to create table rows */}
            {jobListings.map((job, index) => (
              <Table.Row key={index} className="bg-white">
                <Table.Cell>{job.title}</Table.Cell>
                <Table.Cell>{job.deadline}</Table.Cell>
                <Table.Cell>{job.applicants}</Table.Cell>
                <Table.Cell className="flex gap-2">
                  {/* View button to see applicants for this job */}
                  <Button onClick={() => setSelectedJob(job.title)}>View</Button>
                  {/* Delete button for the job listing */}
                  <Button color="red" onClick={() => {/* TODO: Implement job deletion */}}>
                    Delete
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Card>

      {/* Applicants section (shown when a job is selected) */}
      {selectedJob && (
        <Card className="w-full max-w-4xl p-6 shadow-lg mt-6">
          {/* Section header with navigation buttons */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Applicants for {selectedJob}</h2>
            <div className="flex gap-2">
              <Button color="gray" onClick={() => setSelectedJob(null)}>
                Back to Listings
              </Button>
              <Button color="gray" onClick={handleBackToDashboard}>
                Back to Dashboard
              </Button>
            </div>
          </div>

          {/* Applicants table */}
          <Table>
            <Table.Head>
              <Table.HeadCell>First Name</Table.HeadCell>
              <Table.HeadCell>Last Name</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Match %</Table.HeadCell>
              <Table.HeadCell>Status</Table.HeadCell>
              <Table.HeadCell>Actions</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {/* Map through applicants to create table rows */}
              {applicants.map((applicant) => (
                <Table.Row key={applicant.id} className="bg-white">
                  <Table.Cell>{applicant.firstName}</Table.Cell>
                  <Table.Cell>{applicant.lastName}</Table.Cell>
                  <Table.Cell>{applicant.email}</Table.Cell>
                  <Table.Cell>{applicant.match}</Table.Cell>
                  <Table.Cell>
                    {/* Status dropdown selector */}
                    <Select
                      value={applicant.status}
                      onChange={(e) => handleStatusChange(applicant.id, e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Interview">Interview</option>
                      <option value="Accepted">Accepted</option>
                      <option value="Rejected">Rejected</option>
                    </Select>
                  </Table.Cell>
                  <Table.Cell className="flex gap-2">
                    {/* Profile link */}
                    <a href={applicant.profileLink} className="text-blue-500 hover:underline">🔗</a>
                    
                    {/* Delete applicant button */}
                    {/*
                    <Button 
                      color="red" 
                      size="xs"
                      onClick={() => handleDeleteApplicant(applicant.id)}
                    >
                      Delete
                    </Button>
                    */}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Card>
      )}
    </div>
  );
}