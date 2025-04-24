"use client";
import { Table, Button, Card, Select, Modal } from "flowbite-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaMedal, FaChevronDown, FaChevronUp, FaSearch } from "react-icons/fa";
import { Link } from 'react-router-dom';

const medalColors = {
  gold: 'text-yellow-500',
  silver: 'text-gray-400',
  bronze: 'text-amber-700',
};

export default function Company_Appl_Dashboard() {
  const navigate = useNavigate();
  const [selectedJob, setSelectedJob] = useState(null);
  const [showAllApplicants, setShowAllApplicants] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for applicants grouped by job
  const jobApplicants = {
    "Senior Engineer": [
      { id: 1, firstName: "John", lastName: "Doe", email: "john@example.com", match: 95, status: "Pending", 
        skills: ["React", "Node.js", "AWS"], experience: "5 years", education: "Computer Science", location: "New York" },
      { id: 2, firstName: "Jane", lastName: "Smith", email: "jane@example.com", match: 92, status: "Interview", 
        skills: ["Python", "Django", "PostgreSQL"], experience: "7 years", education: "Software Engineering", location: "Remote" },
      { id: 3, firstName: "Bob", lastName: "Johnson", email: "bob@example.com", match: 88, status: "Pending", 
        skills: ["Java", "Spring", "Microservices"], experience: "4 years", education: "Information Technology", location: "Chicago" },
      { id: 4, firstName: "Alice", lastName: "Williams", email: "alice@example.com", match: 85, status: "Pending", 
        skills: ["JavaScript", "React", "Redux"], experience: "3 years", education: "Computer Engineering", location: "San Francisco" },
      { id: 5, firstName: "Mike", lastName: "Brown", email: "mike@example.com", match: 82, status: "Pending", 
        skills: ["C#", ".NET", "Azure"], experience: "6 years", education: "Computer Science", location: "Austin" },
    ],
    "Project Manager": [
      { id: 6, firstName: "Sarah", lastName: "Miller", email: "sarah@example.com", match: 94, status: "Interview", 
        skills: ["Agile", "Scrum", "JIRA"], experience: "8 years", education: "Business Administration", location: "Boston" },
      { id: 7, firstName: "David", lastName: "Wilson", email: "david@example.com", match: 89, status: "Pending", 
        skills: ["PMBOK", "Risk Management", "Leadership"], experience: "5 years", education: "Project Management", location: "Remote" },
      { id: 8, firstName: "Emily", lastName: "Davis", email: "emily@example.com", match: 87, status: "Pending", 
        skills: ["Waterfall", "Stakeholder Management", "Budgeting"], experience: "7 years", education: "MBA", location: "Los Angeles" },
    ],
    "Marketing Lead": [
      { id: 9, firstName: "Chris", lastName: "Taylor", email: "chris@example.com", match: 91, status: "Interview", 
        skills: ["Digital Marketing", "SEO", "Content Strategy"], experience: "6 years", education: "Marketing", location: "Miami" },
      { id: 10, firstName: "Olivia", lastName: "Anderson", email: "olivia@example.com", match: 86, status: "Pending", 
        skills: ["Social Media", "Brand Management", "Analytics"], experience: "4 years", education: "Communications", location: "Seattle" },
    ]
  };

  // Mock data for job listings
  const jobListings = [
    { title: "Senior Engineer", deadline: "2025-04-15", applicants: jobApplicants["Senior Engineer"].length },
    { title: "Project Manager", deadline: "2025-04-20", applicants: jobApplicants["Project Manager"].length },
    { title: "Marketing Lead", deadline: "2025-04-25", applicants: jobApplicants["Marketing Lead"].length },
  ];

  const handleBackToDashboard = () => navigate('/company_dashboard');

  const handleStatusChange = (applicantId, newStatus) => {
    const updatedApplicants = { ...jobApplicants };
    updatedApplicants[selectedJob] = updatedApplicants[selectedJob].map(applicant => 
      applicant.id === applicantId ? { ...applicant, status: newStatus } : applicant
    );
  };

  const openApplicantDetails = (applicant) => {
    setSelectedApplicant(applicant);
  };

  const closeApplicantDetails = () => {
    setSelectedApplicant(null);
  };

  const filteredApplicants = selectedJob 
    ? jobApplicants[selectedJob].filter(applicant =>
        `${applicant.firstName} ${applicant.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        applicant.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const topApplicants = filteredApplicants.slice(0, 3);
  const otherApplicants = filteredApplicants.slice(3);

  return (
    <div className="flex flex-col items-center p-6 bg-gray-50 min-h-screen">
      <div className="w-full max-w-6xl">
        <Button color="gray" onClick={handleBackToDashboard} className="mb-6">
          ← Back to Dashboard
        </Button>

        <Card className="mb-6 shadow-lg">
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
                  <Table.Cell className="flex gap-2">
                    <Button onClick={() => setSelectedJob(job.title)}>View Applicants</Button>
                    <Button color="red">Delete</Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Card>

        {selectedJob && (
          <Card className = "shadow-lg">
            <div className = "flex justify-between items-center mb-6">
              <h2 className = "text-2xl font-bold text-gray-800">
                Applicants for {selectedJob} ({filteredApplicants.length})
              </h2>
              <Button color="gray" onClick={() => setSelectedJob(null)}>
                Back to Listings
              </Button>
            </div>

            <div className="mb-6 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search applicants..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <h3 className="text-xl font-semibold mb-4">Top Candidates</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {topApplicants.map((applicant, index) => (
                <Card key={applicant.id} className="hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold">
                      {applicant.firstName} {applicant.lastName}
                    </h3>
                    {index === 0 && <FaMedal className={`w-5 h-5 ${medalColors.gold}`} />}
                    {index === 1 && <FaMedal className={`w-5 h-5 ${medalColors.silver}`} />}
                    {index === 2 && <FaMedal className={`w-5 h-5 ${medalColors.bronze}`} />}
                  </div>
                  <p className="text-gray-600 mb-1">{applicant.email}</p>
                  <p className="font-bold text-blue-600 mb-2">{applicant.match}% Match</p>
                  <div className="flex justify-between items-center">
                    <Select
                      value={applicant.status}
                      onChange={(e) => handleStatusChange(applicant.id, e.target.value)}
                      className="flex-1 mr-2"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Interview">Interview</option>
                      <option value="Accepted">Accepted</option>
                      <option value="Rejected">Rejected</option>
                    </Select>
                    <Button color="light" onClick={() => openApplicantDetails(applicant)}>
                      Details
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Other Applicants</h3>
              <Button
                color="light"
                onClick={() => setShowAllApplicants(!showAllApplicants)}
                className="flex items-center gap-2"
              >
                {showAllApplicants ? (
                  <>
                    <FaChevronUp /> Show Less
                  </>
                ) : (
                  <>
                    <FaChevronDown /> Show All ({otherApplicants.length})
                  </>
                )}
              </Button>
            </div>

            {showAllApplicants && (
              <Table className="mb-6">
                <Table.Head>
                  <Table.HeadCell>Name</Table.HeadCell>
                  <Table.HeadCell>Email</Table.HeadCell>
                  <Table.HeadCell>Match</Table.HeadCell>
                  <Table.HeadCell>Status</Table.HeadCell>
                  <Table.HeadCell>Actions</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                  {otherApplicants.map((applicant) => (
                    <Table.Row key={applicant.id} className="bg-white">
                      <Table.Cell>
                        {applicant.firstName} {applicant.lastName}
                      </Table.Cell>
                      <Table.Cell>{applicant.email}</Table.Cell>
                      <Table.Cell className="font-semibold">{applicant.match}%</Table.Cell>
                      <Table.Cell>
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
                      <Table.Cell>
                        <Button color="light" onClick={() => openApplicantDetails(applicant)}>
                          Details
                        </Button>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            )}
          </Card>
        )}

        <Modal show={selectedApplicant !== null} onClose={closeApplicantDetails} size="xl">
          {selectedApplicant && (
            <>
              <Modal.Header>
                <h3 className="text-2xl font-bold">
                  {selectedApplicant.firstName} {selectedApplicant.lastName}
                  <span className="ml-2 text-sm font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {selectedApplicant.match}% match
                  </span>
                </h3>
              </Modal.Header>
              <Modal.Body>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold">Email</h4>
                      <p>{selectedApplicant.email}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Location</h4>
                      <p>{selectedApplicant.location}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Experience</h4>
                      <p>{selectedApplicant.experience}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Education</h4>
                      <p>{selectedApplicant.education}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold">Skills</h4>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedApplicant.skills.map((skill, i) => (
                        <span key={i} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <div className="flex justify-between w-full">
                  <Select
                    value={selectedApplicant.status}
                    onChange={(e) => handleStatusChange(selectedApplicant.id, e.target.value)}
                    className="w-48"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Interview">Interview</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Rejected">Rejected</option>
                  </Select>
                  <div className="flex gap-3">
                    <Button color="light" onClick={closeApplicantDetails}>
                      Close
                    </Button>
                    <Button color="dark">
                      Contact Applicant
                    </Button>
                  </div>
                </div>
              </Modal.Footer>
            </>
          )}
        </Modal>
      </div>
    </div>
  );
}