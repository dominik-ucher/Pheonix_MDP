"use client";
import { Button, Card } from "flowbite-react";
import React from "react";
import { HiOutlineBriefcase, HiOutlineUserGroup, HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function Company_Dashboard() {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleJobListingsClick = () => {
    navigate('/company_appl_page'); // Navigate to the job listings page
  };

  const handleViewApplicationsClick = () => {
    navigate('/company_appl_dashboard'); // Navigate to the applications dashboard
  };

  const handleEditProfileClick = () => {
    navigate('/company_profile'); // Navigate to the applications dashboard
  };

  return (
    <div className="flex flex-col min-h-screen bg-white p-4 sm:p-6">
      {/* Main Content */}
      <div className="flex-grow">
        <Card className="w-full max-w-none text-center shadow-lg p-6 sm:p-8 rounded-lg bg-white">
          <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">Company Dashboard</h1>
          <p className="text-lg sm:text-2xl text-gray-600 mb-6 sm:mb-8">
            Manage your job postings, applications, and company profile from one central place.
          </p>
          
          <div className="grid grid-cols-1 gap-6 sm:gap-8 sm:grid-cols-3 text-left">
            {/* Manage Job Listings */}
            <div className="p-6 sm:p-8 bg-gray-50 rounded-lg shadow-md flex flex-col items-center border border-gray-200">
              <HiOutlineBriefcase className="w-16 h-16 sm:w-20 sm:h-20 text-gray-900 mb-4 sm:mb-6" />
              <h2 className="text-xl sm:text-3xl font-semibold text-gray-900 text-center">Manage Job Listings</h2>
              <p className="text-base sm:text-2xl text-gray-700 text-center mb-4 sm:mb-6">Create, update, and remove job postings with ease.</p>
              <Button 
                color="gray" 
                size="l" 
                className="mt-4 sm:mt-6 w-full bg-gray-700 hover:bg-gray-600 text-white text-lg sm:text-2xl py-3 sm:py-4"
                onClick={handleJobListingsClick}
              >
                Go to Job Listings
              </Button>
            </div>

            {/* View Applications */}
            <div className="p-6 sm:p-8 bg-gray-50 rounded-lg shadow-md flex flex-col items-center border border-gray-200">
              <HiOutlineUserGroup className="w-16 h-16 sm:w-20 sm:h-20 text-gray-900 mb-4 sm:mb-6" />
              <h2 className="text-xl sm:text-3xl font-semibold text-gray-900 text-center">View Applications</h2>
              <p className="text-base sm:text-2xl text-gray-700 text-center mb-4 sm:mb-6">Review and manage applications from potential candidates.</p>
              <Button 
                color="gray" 
                size="l" 
                className="mt-4 sm:mt-6 w-full bg-gray-700 hover:bg-gray-600 text-white text-lg sm:text-2xl py-3 sm:py-4"
                onClick={handleViewApplicationsClick}
              >
                View Applications
              </Button>
            </div>

            {/* Edit Company Profile */}
            <div className="p-6 sm:p-8 bg-gray-50 rounded-lg shadow-md flex flex-col items-center border border-gray-200">
              <HiOutlineBuildingOffice2 className="w-16 h-16 sm:w-20 sm:h-20 text-gray-900 mb-4 sm:mb-6" />
              <h2 className="text-xl sm:text-3xl font-semibold text-gray-900 text-center">Edit Company Profile</h2>
              <p className="text-base sm:text-2xl text-gray-700 text-center mb-4 sm:mb-6">Update company details and business information.</p>
              <Button 
                color="gray" 
                size="l" 
                className="mt-4 sm:mt-6 w-full bg-gray-700 hover:bg-gray-600 text-white text-lg sm:text-2xl py-3 sm:py-4"
                onClick={handleEditProfileClick}
              >
                Edit Profile
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}