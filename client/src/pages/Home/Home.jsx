import { Button, Card } from "flowbite-react";
import {
  LightBulbIcon,
  UserGroupIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import thevideo from "../../../upload/Company_Video/GoldingAppVideo.mp4";

export default function Home() {
  return (
    <div className="bg-gray-50 p-4 md:p-6">
      <Card className="w-full max-w-none text-center shadow-lg p-6 md:p-8 rounded-lg bg-white">
        {/* Hero Section */}
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">Empowering Silver Age Professionals</h1>
        <p className="text-xl md:text-2xl text-gray-700 mb-4">"Silver Age, Golden People"</p>
        <p className="text-lg md:text-2xl text-gray-600 mb-8">
          Reconnect with the workforce through AI-powered job matching, flexible opportunities, and a supportive community.
        </p>

        {/* Video Section */}
        <div className="mb-8 md:mb-12">
          <div className="w-full max-w-5xl mx-auto">
            <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg border-2 border-gray-300">
              <video controls className="absolute top-0 left-0 w-full h-full object-cover">
                <source src={thevideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8 text-left">
          {/* AI-Powered Registration */}
          <div className="p-6 md:p-8 bg-gray-100 rounded-lg shadow-md flex flex-col items-center border border-gray-200">
            <LightBulbIcon className="w-20 h-20 md:w-28 md:h-28 text-black mb-4 md:mb-6" />
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 text-center">AI-Powered Registration</h2>
            <p className="text-lg md:text-xl text-gray-700 text-center">
              Register through an AI-driven interview with voice-to-text features to create a detailed profile effortlessly for better matching.
            </p>
          </div>

          {/* Match Display */}
          <div className="p-6 md:p-8 bg-gray-100 rounded-lg shadow-md flex flex-col items-center border border-gray-200">
            <UserGroupIcon className="w-20 h-20 md:w-28 md:h-28 text-black mb-4 md:mb-6" />
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 text-center">Match Display</h2>
            <p className="text-lg md:text-xl text-gray-700 text-center">
              View detailed compatibility results with companies and professionals to find the best opportunities.
            </p>
          </div>

          {/* Premium Services */}
          <div className="p-6 md:p-8 bg-gray-100 rounded-lg shadow-md flex flex-col items-center border border-gray-200">
            <ChartBarIcon className="w-20 h-20 md:w-28 md:h-28 text-black mb-4 md:mb-6" />
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 text-center">Premium Services</h2>
            <p className="text-lg md:text-xl text-gray-700 text-center">
              Access advanced features like training paths, upskilling courses, and detailed match analysis.
            </p>
          </div>
        </div>

        {/* Call-to-Action Buttons */}
        <div className="mt-8 md:mt-12 flex flex-col md:flex-row gap-4 md:gap-6 justify-center">
          <Button color="gray" size="l" className="text-lg md:text-2xl bg-gray-700 hover:bg-gray-800 focus:ring-gray-600 text-white py-3 md:py-4 px-6 md:px-8">
            Find Your Next Opportunity
          </Button>
          <Button color="light" size="l" className="text-lg md:text-2xl bg-gray-200 hover:bg-gray-300 focus:ring-gray-400 text-gray-900 py-3 md:py-4 px-6 md:px-8">
            Hire Experienced Talent
          </Button>
        </div>

        {/* Testimonials Section */}
        <div className="mt-8 md:mt-12 bg-gray-100 p-6 md:p-8 rounded-lg">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6 text-center">What Our Users Say</h2>

          {/* Testimonials from Job Seekers */}
          <div className="mb-6 md:mb-8">
            <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4 text-center">From Job Seekers</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="p-4 md:p-6 bg-white rounded-lg shadow-md">
                <p className="text-lg md:text-xl text-gray-700 italic">"The platform helped me find a part-time role that fits my schedule perfectly. I feel valued again!"</p>
                <p className="text-md md:text-lg text-gray-900 font-semibold mt-4">— Maria, 58</p>
              </div>
              <div className="p-4 md:p-6 bg-white rounded-lg shadow-md">
                <p className="text-lg md:text-xl text-gray-700 italic">"I was able to update my skills and find a consultancy role that matches my expertise. Highly recommend!"</p>
                <p className="text-md md:text-lg text-gray-900 font-semibold mt-4">— John, 62</p>
              </div>
            </div>
          </div>

          {/* Testimonials from Companies */}
          <div>
            <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4 text-center">From Companies</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="p-4 md:p-6 bg-white rounded-lg shadow-md">
                <p className="text-lg md:text-xl text-gray-700 italic">"We found an experienced consultant who brought fresh perspectives to our team. Highly recommend!"</p>
                <p className="text-md md:text-lg text-gray-900 font-semibold mt-4">— Tech Solutions Inc.</p>
              </div>
              <div className="p-4 md:p-6 bg-white rounded-lg shadow-md">
                <p className="text-lg md:text-xl text-gray-700 italic">"The platform helped us fill a critical role with a highly skilled professional. The process was seamless."</p>
                <p className="text-md md:text-lg text-gray-900 font-semibold mt-4">— Green Energy Co.</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}