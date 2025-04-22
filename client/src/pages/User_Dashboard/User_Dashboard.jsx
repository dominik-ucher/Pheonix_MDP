import React from 'react'
import axios from 'axios';

export default function User_Dashboard() {
    const axiosInstance = axios.create({ baseURL: import.meta.env.VITE_REACT_APP_API_URL });

    return(
      <div>User Dashboard Page</div>
    )
}


export default function User_Dashboard() {
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
    <div className="flex flex-col min-h-screen bg-white p-6">
      {/* Main Content */}
      <div className="flex-grow">
        <Card className="w-full max-w-none text-center shadow-lg p-8 rounded-lg bg-white">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">User Dashboard</h1>
          <p className="text-2xl text-gray-600 mb-8">
            Manage your job invitations, applications, and personal profile from one central place.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {/* View & Manage Job Applications */}
            <div className="p-8 bg-gray-50 rounded-lg shadow-md flex flex-col items-center border border-gray-200">
              <HiOutlineBriefcase className="w-20 h-20 text-gray-900 mb-6" />
              <h2 className="text-3xl font-semibold text-gray-900 text-center">Manage Applications</h2>
              <p className="text-2xl text-gray-700 text-center mb-6">Check job applications updates, withdraw or accept.</p>
              <Button 
                color="gray" 
                size="l" 
                className="mt-6 w-full bg-gray-700 hover:bg-gray-600 text-white text-2xl py-4"
                onClick={handleJobListingsClick}
              >
                Go to My Applications
              </Button>
            </div>

            {/* Edit Company Profile */}
            <div className="p-8 bg-gray-50 rounded-lg shadow-md flex flex-col items-center border border-gray-200">
              <HiOutlineBuildingOffice2 className="w-20 h-20 text-gray-900 mb-6" />
              <h2 className="text-3xl font-semibold text-gray-900 text-center">Edit Personal Profile</h2>
              <p className="text-2xl text-gray-700 text-center mb-6">Update personal details.</p>
              <Button 
                color="gray" 
                size="l" 
                className="mt-6 w-full bg-gray-700 hover:bg-gray-600 text-white text-2xl py-4"
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