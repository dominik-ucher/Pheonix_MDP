"use client";
import { Button, Card } from "flowbite-react";
import React from "react";

export default function Company_Dashboard() {
  return (
    <div className="flex flex-col min-h-screen bg-white p-6">
      {/* Main Content */}
      <div className="flex-grow">
        <Card className="w-full max-w-none text-center shadow-lg p-8 rounded-lg bg-white">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Company Dashboard</h1>
          <p className="text-2xl text-gray-600 mb-8">
            Manage your job postings, applications, and company profile from one central place.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {/* Community work */}
            <div className="p-8 bg-gray-50 rounded-lg shadow-md flex flex-col items-center border border-gray-200">
              <img src="https://via.placeholder.com/150" alt="Community Work" className="w-40 h-40 mb-6 rounded-lg" />
              <h2 className="text-3xl font-semibold text-gray-900 text-center">Community work</h2>
              <p className="text-2xl text-gray-700 text-center mb-6">Create, update, and remove job postings with ease.</p>
              <Button color="gray" size="l" className="mt-6 w-full bg-gray-700 hover:bg-gray-600 text-white text-2xl py-4">
                Go to Job Listings
              </Button>
            </div>

            {/* View Applications */}
            <div className="p-8 bg-gray-50 rounded-lg shadow-md flex flex-col items-center border border-gray-200">
              <img src="https://via.placeholder.com/150" alt="Consulting" className="w-40 h-40 mb-6 rounded-lg" />
              <h2 className="text-3xl font-semibold text-gray-900 text-center">Consulting</h2>
              <p className="text-2xl text-gray-700 text-center mb-6">Review and manage applications from potential candidates.</p>
              <Button color="gray" size="l" className="mt-6 w-full bg-gray-700 hover:bg-gray-600 text-white text-2xl py-4">
                View Applications
              </Button>
            </div>

            {/* Remote work */}
            <div className="p-8 bg-gray-50 rounded-lg shadow-md flex flex-col items-center border border-gray-200">
              <img src="https://via.placeholder.com/150" alt="Remote Work" className="w-40 h-40 mb-6 rounded-lg" />
              <h2 className="text-3xl font-semibold text-gray-900 text-center">Remote Work</h2>
              <p className="text-2xl text-gray-700 text-center mb-6">Update company details and business information.</p>
              <Button color="gray" size="l" className="mt-6 w-full bg-gray-700 hover:bg-gray-600 text-white text-2xl py-4">
                Edit Profile
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
