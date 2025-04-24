"use client";
import { Table, Button, Card, Select, Modal } from "flowbite-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaMedal, FaChevronDown, FaChevronUp, FaSearch } from "react-icons/fa";
import { Link } from 'react-router-dom';


export default function User_Applications() {
  const navigate = useNavigate();
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');



  // Mock data for active applications
  const [jobListings, setJobListings] = useState([
    { title: "Senior Engineer", company: "Akkodis", status : "Applied" },
    { title: "Project Manager", company: "Prime", status: "Pending" },
    { title: "Marketing Lead", company: "TechLead", status: "Pending"},
    ]);
    // Mock data for job listings

    const jobDetailsList = [
        {
          title: "Senior Engineer",
          company: "Akkodis",
          dateApplied: "2025-04-10",
          skills: ["Java", "Spring Boot", "AWS"],
          requirements: ["5+ years experience", "Bachelor's in CS", "Team leadership"],
          benefits: ["Health insurance", "Remote work", "Annual bonus"],
        },
        {
          title: "Project Manager",
          company: "Prime",
          dateApplied: "2025-04-15",
          skills: ["Agile", "Scrum", "Communication"],
          requirements: ["PMP Certification", "3+ years project experience"],
          benefits: ["401k", "Flexible hours", "Paid time off"],
        },
        {
          title: "Marketing Lead",
          company: "TechLead",
          dateApplied: "2025-04-20",
          skills: ["SEO", "Analytics", "Copywriting"],
          requirements: ["Experience with Google Ads", "Creative mindset"],
          benefits: ["Stock options", "Gym membership", "Health benefits"],
        },
      ];
      
    const [selectedJobIndex, setSelectedJobIndex] = useState(null);

    const sortedJobs = [...jobListings].sort((a, b) => {
        if (a.status === "Withdrawn" && b.status !== "Withdrawn") return 1;
        if (a.status !== "Withdrawn" && b.status === "Withdrawn") return -1;
        return 0;
      });

  const handleBackToDashboard = () => navigate('/company_dashboard');

  const handleApplyJob = (index) => {
    const updatedJobs = jobListings.filter((_, i) => i !== index);
    setJobListings(updatedJobs);
};

const handleRefuseInvitation = (index) => {
    const updatedJobs = jobListings.filter((_, i) => i !== index);
    setJobListings(updatedJobs);
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
        <Link to="/user_dashboard">
        <Button color="gray" onClick={handleBackToDashboard} className="mb-6">
          ← Back to Dashboard
        </Button>
        </Link>

        <Card className="mb-6 shadow-lg">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Invitations</h1>
          <Table>
            <Table.Head>
              <Table.HeadCell>Title</Table.HeadCell>
              <Table.HeadCell>Company</Table.HeadCell>
              <Table.HeadCell>Actions</Table.HeadCell>
            </Table.Head>
            
            <Table.Body className="divide-y">
    {sortedJobs.map((job, index) => (
        <Table.Row key={index} className="bg-white">
            <Table.Cell>{job.title}</Table.Cell>
            <Table.Cell>{job.company}</Table.Cell>
            <Table.Cell className="flex gap-2">
                <Button 
                    onClick={() => setSelectedJobIndex(index)} 
                    style={job.status === "Applied" || job.status === "Refused" ? { opacity: 0.5, cursor: "not-allowed" } : {}}
                    disabled={job.status === "Applied" || job.status === "Refused"}
                >
                    View Details
                </Button>
                {job.status !== "Applied" && job.status !== "Refused" && (
                    <>
                        <Button color="green" onClick={() => handleApplyJob(index)}>
                            Apply for Job
                        </Button>
                        <Button color="red" onClick={() => handleRefuseInvitation(index)}>
                            Refuse Invitation
                        </Button>
                    </>
                )}
            </Table.Cell>
        </Table.Row>
    ))}
</Table.Body>



          </Table>
        </Card>

        <Modal show={selectedJobIndex !== null} onClose={() => setSelectedJobIndex(null)}>
  <Modal.Header>Job Details</Modal.Header>
  <Modal.Body>
    {selectedJobIndex !== null && jobDetailsList[selectedJobIndex] && (
      <div className="space-y-3 text-sm text-gray-700">
        <p><strong>Title:</strong> {jobDetailsList[selectedJobIndex].title}</p>
        <p><strong>Company:</strong> {jobDetailsList[selectedJobIndex].company}</p>
        <p><strong>Date Applied:</strong> {jobDetailsList[selectedJobIndex].dateApplied}</p>

        <p><strong>Skills:</strong></p>
        <ul className="list-disc list-inside">
          {jobDetailsList[selectedJobIndex].skills.map((skill, idx) => (
            <li key={idx}>{skill}</li>
          ))}
        </ul>

        <p><strong>Requirements:</strong></p>
        <ul className="list-disc list-inside">
          {jobDetailsList[selectedJobIndex].requirements.map((req, idx) => (
            <li key={idx}>{req}</li>
          ))}
        </ul>

        <p><strong>Benefits:</strong></p>
        <ul className="list-disc list-inside">
          {jobDetailsList[selectedJobIndex].benefits.map((benefit, idx) => (
            <li key={idx}>{benefit}</li>
          ))}
        </ul>
      </div>
    )}
  </Modal.Body>
</Modal>


      </div>
    </div>
  );
}