"use client";
import { Table, Button, Card } from "flowbite-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function Company_Appl_Dashboard() {
  const [selectedJob, setSelectedJob] = useState(null);
  const navigate = useNavigate(); // Initialize navigate function

  const jobListings = [
    { title: "Senior Engineer", deadline: "2025-04-15", applicants: 12 },
    { title: "Project Manager", deadline: "2025-04-20", applicants: 8 },
    { title: "Marketing Lead", deadline: "2025-04-25", applicants: 5 },
  ];

  const applicants = [
    { firstName: "John", lastName: "Doe", email: "john@example.com", match: "85%", status: "Pending", profileLink: "#" },
    { firstName: "Jane", lastName: "Smith", email: "jane@example.com", match: "92%", status: "Accepted", profileLink: "#" },
    { firstName: "Bob", lastName: "Johnson", email: "bob@example.com", match: "78%", status: "Rejected", profileLink: "#" },
    { firstName: "John", lastName: "Doe", email: "john@example.com", match: "85%", status: "Pending", profileLink: "#" },
    { firstName: "Jane", lastName: "Smith", email: "jane@example.com", match: "92%", status: "Accepted", profileLink: "#" },
    { firstName: "Bob", lastName: "Johnson", email: "bob@example.com", match: "78%", status: "Rejected", profileLink: "#" },
  ];

  // Function to navigate back to company dashboard
  const handleBackToDashboard = () => {
    navigate('/company_dashboard');
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-50 min-h-screen">
      {/* Back to Dashboard button at the top */}
      <div className="w-full max-w-4xl mb-4">
        <Button 
          color="gray" 
          onClick={handleBackToDashboard}
          className="mb-4"
        >
          ← Back to Dashboard
        </Button>
      </div>

      <Card className="w-full max-w-4xl p-6 shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Job Listings</h1>
        <Table>
          <Table.Head>
            <Table.HeadCell>Title</Table.HeadCell>
            <Table.HeadCell>Deadline</Table.HeadCell>
            <Table.HeadCell>Applicants</Table.HeadCell>
            <Table.HeadCell>Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {jobListings.map((job, index) => (
              <Table.Row key={index} className="bg-white">
                <Table.Cell>{job.title}</Table.Cell>
                <Table.Cell>{job.deadline}</Table.Cell>
                <Table.Cell>{job.applicants}</Table.Cell>
                <Table.Cell>
                  <Button onClick={() => setSelectedJob(job.title)}>View</Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Card>
      {selectedJob && (
        <Card className="w-full max-w-4xl p-6 shadow-lg mt-6">
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
          <Table>
            <Table.Head>
              <Table.HeadCell>First Name</Table.HeadCell>
              <Table.HeadCell>Last Name</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Match %</Table.HeadCell>
              <Table.HeadCell>Status</Table.HeadCell>
              <Table.HeadCell>Profile</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {applicants.map((applicant, index) => (
                <Table.Row key={index} className="bg-white">
                  <Table.Cell>{applicant.firstName}</Table.Cell>
                  <Table.Cell>{applicant.lastName}</Table.Cell>
                  <Table.Cell>{applicant.email}</Table.Cell>
                  <Table.Cell>{applicant.match}</Table.Cell>
                  <Table.Cell>{applicant.status}</Table.Cell>
                  <Table.Cell>
                    <a href={applicant.profileLink} className="text-blue-500 hover:underline">🔗</a>
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