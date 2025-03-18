"use client";
import { Button, Card } from "flowbite-react";
import React from "react";

export default function Home() {
  return (
    <div className="bg-gray-50 p-6">
      <Card className="w-full max-w-none text-center shadow-lg p-8 rounded-lg bg-white">
        {/* Hero Section */}
        <h1 className="text-6xl font-bold text-gray-900 mb-4">Empowering Silver Age Professionals</h1>
        <p className="text-2xl text-gray-700 mb-4">"Silver Age, Golden People"</p>
        <p className="text-2xl text-gray-600 mb-8">
          Reconnect with the workforce through AI-powered job matching, flexible opportunities, and a supportive community.
        </p>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {/* AI-Powered Registration */}
          <div className="p-8 bg-gray-100 rounded-lg shadow-md flex flex-col items-center border border-gray-200">
            <div className="mb-6"> 
              <img 
                src="https://images.pexels.com/photos/5592279/pexels-photo-5592279.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="AI icon" 
                className="w-60 h-60 rounded-full object-cover border-2 border-gray-300" 
              />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 text-center">AI-Powered Registration</h2>
            <p className="text-xl text-gray-700 text-center">
              Register through an AI-driven interview with voice-to-text features to create a detailed profile effortlessly for better matching.
            </p>
          </div>

          {/* Match Display */}
          <div className="p-8 bg-gray-100 rounded-lg shadow-md flex flex-col items-center border border-gray-200">
            <div className="mb-6"> 
              <img 
                src="https://images.pexels.com/photos/7267538/pexels-photo-7267538.jpeg" 
                alt="Match icon" 
                className="w-60 h-60 rounded-full object-cover border-2 border-gray-300" 
              />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 text-center">Match Display</h2>
            <p className="text-xl text-gray-700 text-center">
              View detailed compatibility results with companies and professionals to find the best opportunities.
            </p>
          </div>

          {/* Premium Services */}
          <div className="p-8 bg-gray-100 rounded-lg shadow-md flex flex-col items-center border border-gray-200">
            <div className="mb-6"> 
              <img 
                src="https://images.pexels.com/photos/5716042/pexels-photo-5716042.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Premium icon" 
                className="w-60 h-60 rounded-full object-cover border-2 border-gray-300" 
              />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 text-center">Premium Services</h2>
            <p className="text-xl text-gray-700 text-center">
              Access advanced features like training paths, upskilling courses, and detailed match analysis.
            </p>
          </div>
        </div>

        {/* Call-to-Action Buttons */}
        <div className="mt-12 flex flex-col md:flex-row gap-6 justify-center">
          <Button color="gray" size="l" className="text-2xl bg-gray-700 hover:bg-gray-800 focus:ring-gray-600 text-white py-4 px-8">
            Find Your Next Opportunity
          </Button>
          <Button color="light" size="l" className="text-2xl bg-gray-200 hover:bg-gray-300 focus:ring-gray-400 text-gray-900 py-4 px-8">
            Hire Experienced Talent
          </Button>
        </div>

        {/* Testimonials Section */}
        <div className="mt-12 bg-gray-100 p-8 rounded-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">What Our Users Say</h2>

          {/* Testimonials from Job Seekers */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4 text-center">From Job Seekers</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 bg-white rounded-lg shadow-md">
                <p className="text-xl text-gray-700 italic">"The platform helped me find a part-time role that fits my schedule perfectly. I feel valued again!"</p>
                <p className="text-lg text-gray-900 font-semibold mt-4">— Maria, 58</p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-md">
                <p className="text-xl text-gray-700 italic">"I was able to update my skills and find a consultancy role that matches my expertise. Highly recommend!"</p>
                <p className="text-lg text-gray-900 font-semibold mt-4">— John, 62</p>
              </div>
            </div>
          </div>

          {/* Testimonials from Companies */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4 text-center">From Companies</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 bg-white rounded-lg shadow-md">
                <p className="text-xl text-gray-700 italic">"We found an experienced consultant who brought fresh perspectives to our team. Highly recommend!"</p>
                <p className="text-lg text-gray-900 font-semibold mt-4">— Tech Solutions Inc.</p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-md">
                <p className="text-xl text-gray-700 italic">"The platform helped us fill a critical role with a highly skilled professional. The process was seamless."</p>
                <p className="text-lg text-gray-900 font-semibold mt-4">— Green Energy Co.</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}