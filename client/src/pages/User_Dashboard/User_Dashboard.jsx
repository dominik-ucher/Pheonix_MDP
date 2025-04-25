"use client";
import { Button, Card } from "flowbite-react";
import React from "react";
import image1 from "../../../img/Gardiner.jpg";
import image2 from "../../../img/Office.jpg";
import image3 from "../../../img/remotework.jpg";
import { Link } from "react-router-dom";

export default function Company_Dashboard() {
  return (
    <div className="flex flex-col min-h-screen bg-white p-4 md:p-6">
      {/* Main Content */}
      <div className="flex-grow">
        <Card className="w-full max-w-none text-center shadow-lg p-6 md:p-8 rounded-lg bg-white">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6">Find Your Next Opportunity</h1>
          <p className="text-lg md:text-2xl text-gray-600 mb-6 md:mb-8">
            Browse job opportunities, connect with companies, and take the next step in your career journey.
          </p>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8 text-left">
            {/* Community work */}
            <div className="p-6 md:p-8 bg-gray-50 rounded-lg shadow-md flex flex-col items-center border border-yellow-500">
              <img src={image1} alt="Community Work" className="w-full h-48 md:w-70 md:h-74 rounded-lg mb-4 md:mb-6 object-cover" />
              <Link to="/user_profile" className="w-full">
                <Button color="yellow" size="l" className="w-full bg-yellow-500 hover:bg-yellow-600 text-white text-lg md:text-2xl py-3 md:py-4">
                  View your Profile
                </Button>
              </Link>
              <p className="text-lg md:text-2xl text-gray-700 text-center mt-4 md:mt-6">Make an impact by offering your skills to local projects.</p>
            </div>

            {/* Consulting */}
            <div className="p-6 md:p-8 bg-gray-50 rounded-lg shadow-md flex flex-col items-center border border-yellow-500">
              <img src={image2} alt="Consulting" className="w-full h-48 md:w-70 md:h-74 rounded-lg mb-4 md:mb-6 object-cover" />
              <Link to="/user_appl_page" className="w-full">
                <Button color="yellow" size="l" className="w-full bg-yellow-500 hover:bg-yellow-600 text-white text-lg md:text-2xl py-3 md:py-4">
                  Your Top Job Matches
                </Button>
              </Link>
              <p className="text-lg md:text-2xl text-gray-700 text-center mt-4 md:mt-6">Use your expertise to guide businesses and professionals.</p>
            </div>

            {/* Remote work */}
            <div className="p-6 md:p-8 bg-gray-50 rounded-lg shadow-md flex flex-col items-center border border-yellow-500">
              <img src={image3} alt="Remote Work" className="w-full h-48 md:w-70 md:h-74 rounded-lg mb-4 md:mb-6 object-cover" />
              <Button color="yellow" size="l" className="w-full bg-yellow-500 hover:bg-yellow-600 text-white text-lg md:text-2xl py-3 md:py-4">
                Remote Work
              </Button>
              <p className="text-lg md:text-2xl text-gray-700 text-center mt-4 md:mt-6">Enjoy flexible hours and work from anywhere.</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
