"use client";
import { Button, Card } from "flowbite-react";
import React from "react";

export default function Company_Dashboard() {
  return (
    <div className="flex flex-col min-h-screen bg-white p-6">
      {/* Main Content */}
      <div className="flex-grow">
        <Card className="w-full max-w-none text-center shadow-lg p-8 rounded-lg bg-white">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Find Your Next Opportunity</h1>
          <p className="text-2xl text-gray-600 mb-8">
            Browse job opportunities, connect with companies, and take the next step in your career journey.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {/* Community work */}
            <div className="p-8 bg-gray-50 rounded-lg shadow-md flex flex-col items-center border border-yellow-500">
              <img src="img/gardiner.jpg" alt="Community Work" className="w-70 h-74 rounded-lg mb-6" />
              <Button color="yellow" size="l" className="w-full bg-yellow-500 hover:bg-yellow-600 text-white text-2xl py-4">
                Community Work
              </Button>
              <p className="text-2xl text-gray-700 text-center mt-6">Make an impact by offering your skills to local projects.</p>
            </div>

            {/* Consulting */}
            <div className="p-8 bg-gray-50 rounded-lg shadow-md flex flex-col items-center border border-yellow-500">
              <img src="img/office.jpg" alt="Consulting" className="w-70 h-74 rounded-lg mb-6" />
              <Button color="yellow" size="l" className="w-full bg-yellow-500 hover:bg-yellow-600 text-white text-2xl py-4">
                Consulting
              </Button>
              <p className="text-2xl text-gray-700 text-center mt-6">Use your expertise to guide businesses and professionals.</p>
            </div>

            {/* Remote work */}
            <div className="p-8 bg-gray-50 rounded-lg shadow-md flex flex-col items-center border border-yellow-500">
              <img src="img/remotework.jpg" alt="Remote Work" className="w-70 h-74 rounded-lg mb-6" />
              <Button color="yellow" size="l" className="w-full bg-yellow-500 hover:bg-yellow-600 text-white text-2xl py-4">
                Remote Work
              </Button>
              <p className="text-2xl text-gray-700 text-center mt-6">Enjoy flexible hours and work from anywhere.</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
