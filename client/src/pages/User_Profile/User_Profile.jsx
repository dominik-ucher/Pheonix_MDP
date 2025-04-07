import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserProfile() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(true);
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    birthdate: "",
    email: "",
    address: "",
    phone_number: "",
    profile_picture: "/img/default-avatar.png", // Default profile picture
    link_to_CV: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Generate preview URL for the image
      setUser({ ...user, profile_picture: imageUrl });
    }
  };

  const handleCVUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file); // Create a URL for the uploaded file
      setUser({ ...user, link_to_CV: fileUrl });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="bg-white shadow-xl rounded-lg p-6 w-full max-w-md text-center border-t-4 border-orange-500">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">User Profile</h1>
        <p className="text-gray-600">Manage your personal details below.</p>

        <div className="relative mt-6">
          <img
            src={user.profile_picture}
            alt="Profile"
            className="w-40 h-40 mx-auto mb-4 border-4 border-orange-500 rounded-full object-cover"
          />
          {isEditing && (
            <label className="cursor-pointer text-orange-600 font-semibold hover:text-orange-700">
              Change Profile Picture
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleProfilePictureChange}
              />
            </label>
          )}
        </div>

        {isEditing ? (
          <div className="space-y-3 mt-4">
            <label className="block text-left">First Name</label>
            <input
              type="text"
              name="first_name"
              value={user.first_name}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="Enter your first name"
            />

            <label className="block text-left">Last Name</label>
            <input
              type="text"
              name="last_name"
              value={user.last_name}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="Enter your last name"
            />

            <label className="block text-left">Birthdate</label>
            <input
              type="date"
              name="birthdate"
              value={user.birthdate}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />

            <label className="block text-left">Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="Enter your email"
            />

            <label className="block text-left">Address</label>
            <input
              type="text"
              name="address"
              value={user.address}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="Enter your address"
            />

            <label className="block text-left">Phone Number</label>
            <input
              type="text"
              name="phone_number"
              value={user.phone_number}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="Enter your phone number"
            />

            <label className="block text-left">Upload CV</label>
            <label className="cursor-pointer text-orange-600 font-semibold hover:text-orange-700">
              Select a file
              <input
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={handleCVUpload}
              />
            </label>
            {user.link_to_CV && (
              <p className="text-sm mt-1 text-gray-600">
                Uploaded CV: <a href={user.link_to_CV} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">View CV</a>
              </p>
            )}
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{`${user.first_name || "N/A"} ${user.last_name || ""}`}</h2>
            <p className="text-gray-600">Email: {user.email || "No email provided"}</p>
            <p className="text-gray-600">Birthdate: {user.birthdate || "No birthdate provided"}</p>
            <p className="text-gray-600">Address: {user.address || "No address provided"}</p>
            <p className="text-gray-600">Phone Number: {user.phone_number || "No phone number provided"}</p>
            {user.link_to_CV && (
              <p className="text-gray-600">
                <a
                  href={user.link_to_CV}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  View CV
                </a>
              </p>
            )}
          </div>
        )}

        <button
          className="mt-4 px-4 py-2 bg-orange-500 text-white font-semibold rounded-md shadow-md hover:bg-orange-600 w-full text-lg font-bold"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? "Save Changes" : "Edit Profile"}
        </button>
      </div>
    </div>
  );
}