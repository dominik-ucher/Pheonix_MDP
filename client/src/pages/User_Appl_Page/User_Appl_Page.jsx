import React, { useState } from 'react';
import { Card, Button, Modal } from 'flowbite-react';
import { FaMedal, FaChevronDown, FaChevronUp, FaSearch } from 'react-icons/fa';

// Sample job data to simulate (Imagine in the backend it its define the top 3 matches)
const sampleJobs = [
  {
    id: 1,
    title: 'Senior Software Engineer',
    company: 'TechCorp Inc.',
    match: 95,
    description: 'Lead development projects and mentor junior developers. Requires 5+ years experience with React and Node.js.',
    requirements: ['5+ years JavaScript', 'React expertise', 'Node.js experience', 'Team leadership'],
    salary: '$120,000 - $150,000',
    location: 'Remote',
    posted: '2 days ago',
    medal: 'gold',
  },
  {
    id: 2,
    title: 'Frontend Developer',
    company: 'Designify',
    match: 89,
    description: 'Implement responsive UIs using React and work closely with design team.',
    requirements: ['3+ years React', 'CSS/Sass proficiency', 'UI/UX understanding'],
    salary: '$90,000 - $110,000',
    location: 'New York, NY',
    posted: '1 week ago',
    medal: 'silver',
  },
  {
    id: 3,
    title: 'Backend Developer',
    company: 'DataDrive',
    match: 85,
    description: 'Build scalable APIs and maintain cloud infrastructure using AWS.',
    requirements: ['Python/Node.js', 'AWS experience', 'Database design'],
    salary: '$100,000 - $130,000',
    location: 'San Francisco, CA',
    posted: '3 days ago',
    medal: 'bronze',
  },
  {
    id: 4,
    title: 'Full Stack Developer',
    company: 'WebSolutions',
    match: 82,
    description: 'Develop end-to-end features for enterprise applications.',
    requirements: ['JavaScript full stack', 'REST APIs', 'CI/CD pipelines'],
    salary: '$95,000 - $115,000',
    location: 'Chicago, IL',
    posted: '5 days ago',
  },
  {
    id: 5,
    title: 'DevOps Engineer',
    company: 'CloudNative',
    match: 78,
    description: 'Implement and maintain deployment pipelines and infrastructure.',
    requirements: ['Docker/Kubernetes', 'Terraform', 'AWS/GCP'],
    salary: '$110,000 - $140,000',
    location: 'Remote',
    posted: '1 day ago',
  },
  {
    id: 6,
    title: 'UX Engineer',
    company: 'InterfaceCo',
    match: 75,
    description: 'Bridge between design and engineering teams.',
    requirements: ['React', 'Figma/Sketch', 'CSS animations'],
    salary: '$85,000 - $105,000',
    location: 'Austin, TX',
    posted: '2 weeks ago',
  },
];

// Mapping for medal colors based on their type
const medalColors = {
  gold: 'text-yellow-500',
  silver: 'text-gray-400',
  bronze: 'text-amber-700',
};

// Main component definition
const JobApplications = () => {
  // State for toggling visibility of all jobs
  const [showAllJobs, setShowAllJobs] = useState(false);
  // State for tracking selected job for modal
  const [selectedJob, setSelectedJob] = useState(null);
  // State for the job search input
  const [searchTerm, setSearchTerm] = useState('');

  // Filter jobs based on title or company name
  const filteredJobs = sampleJobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Divide the filtered list into top 3 jobs and the rest
  const topJobs = filteredJobs.slice(0, 3);
  const otherJobs = filteredJobs.slice(3);

  // Function to open job detail modal
  const openJobDetails = (job) => {
    setSelectedJob(job);
  };

  // Function to close job detail modal
  const closeJobDetails = () => {
    setSelectedJob(null);
  };

  // Function to simulate job application
  const applyForJob = (jobId) => {
    alert(`Application submitted for job ID: ${jobId}`);
    closeJobDetails();
  };

  return (
    <div className="p-6 max-w-6xl mx-auto text-lg">
      {/* Page title */}
      <h2 className="text-3xl font-bold mb-6 text-center">Your Job Matches</h2>

      {/* Search bar */}
      <div className="mb-6 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FaSearch className="text-gray-400 text-xl" />
        </div>
        <input
          type="text"
          placeholder="Search jobs or companies..."
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Top job matches */}
      <h3 className="text-2xl font-semibold mb-4">Top Matches</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {topJobs.map((job) => (
          <Card key={job.id} className="p-4 hover:shadow-lg transition-shadow">
            {/* Job title and medal */}
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-semibold">{job.title}</h3>
              {job.medal && <FaMedal className={`w-6 h-6 ${medalColors[job.medal]}`} title={job.medal} />}
            </div>
            {/* Company and match percentage */}
            <p className="text-gray-700 mb-1"><strong>Company:</strong> {job.company}</p>
            <p className="text-gray-600 mb-2">
              <strong>Match:</strong> <span className="font-bold">{job.match}%</span>
            </p>
            {/* Job description preview */}
            <p className="text-gray-600 mb-4 line-clamp-2">{job.description}</p>
            {/* Buttons to view details or apply */}
            <div className="text-2xl flex justify-between items-center">
              <Button color="light" onClick={() => openJobDetails(job)}>
                View Details
              </Button>
              <Button color="dark" onClick={() => applyForJob(job.id)}>
                Quick Apply
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Toggle for showing more or fewer jobs */}
      <div className="mb-6 flex justify-between items-center">
        <h3 className="text-2xl font-semibold">Other Opportunities</h3>
        <Button
          color="light"
          onClick={() => setShowAllJobs(!showAllJobs)}
          className="flex items-center gap-2"
        >
          {showAllJobs ? (
            <>
              <FaChevronUp /> Show Less
            </>
          ) : (
            <>
              <FaChevronDown /> Show All ({otherJobs.length})
            </>
          )}
        </Button>
      </div>

      {/* Additional jobs if expanded */}
      {showAllJobs && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {otherJobs.map((job) => (
            <Card key={job.id} className="p-4 hover:shadow-lg transition-shadow">
              {/* Job title and match */}
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-semibold">{job.title}</h3>
                <span className="text-sm font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  {job.match}% match
                </span>
              </div>
              {/* Company and description */}
              <p className="text-gray-700 mb-1"><strong>Company:</strong> {job.company}</p>
              <p className="text-gray-600 mb-4 line-clamp-2">{job.description}</p>
              {/* Buttons for details and apply */}
              <div className="flex justify-between items-center">
                <Button color="light" onClick={() => openJobDetails(job)}>
                  Details
                </Button>
                <Button color="dark" onClick={() => applyForJob(job.id)}>
                  Apply
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Modal for job detail view */}
      <Modal show={selectedJob !== null} onClose={closeJobDetails} size="xl">
        {selectedJob && (
          <>
            <Modal.Header>
              <div className="flex items-center gap-2">
                <h3 className="text-2xl font-bold">{selectedJob.title}</h3>
                <span className="text-sm font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  {selectedJob.match}% match
                </span>
              </div>
            </Modal.Header>
            <Modal.Body>
              <div className="space-y-4">
                {/* Job metadata section */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold">Company</h4>
                    <p>{selectedJob.company}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Location</h4>
                    <p>{selectedJob.location}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Salary Range</h4>
                    <p>{selectedJob.salary}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Posted</h4>
                    <p>{selectedJob.posted}</p>
                  </div>
                </div>

                {/* Full job description */}
                <div>
                  <h4 className="font-semibold">Job Description</h4>
                  <p className="text-gray-700">{selectedJob.description}</p>
                </div>

                {/* Requirements list */}
                <div>
                  <h4 className="font-semibold">Requirements</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {selectedJob.requirements.map((req, i) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              {/* Modal action buttons */}
              <div className="flex justify-end gap-3">
                <Button color="light" onClick={closeJobDetails}>
                  Close
                </Button>
                <Button color="dark" onClick={() => applyForJob(selectedJob.id)}>
                  Apply for This Position
                </Button>
              </div>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </div>
  );
};

export default JobApplications;