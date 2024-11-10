import React, { useState, useRef } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import "react-toastify/dist/ReactToastify.css";
import {
  getUser,
  getProfile,
  notifySuccess,
  notifyError,
  setProfile,
} from "../../utils/Helpers";
import ProfileModal from "../../components/Admin/Modal/Profile";
import ChangePasswordModal from "../../components/Admin/Modal/ChangePasswordModal";
import { useNavigate } from "react-router-dom";
import client from "../../utils/client";
const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const user = getUser();
  const [profile, setProfileState] = useState(getProfile());
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const handleEditProfile = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenPasswordModal = () => {
    setIsPasswordModalOpen(true);
  };

  const handleClosePasswordModal = () => {
    setIsPasswordModalOpen(false);
  };

  const redirect_home = () => {
    navigate("/admin");
  };

  const redirect_profile = () => {
    navigate("/admin/profile");
  };

  const openFileExplorer = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("profile_picture", file);

      try {
        const response = await client.post(
          `/profile/change-picture/`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
          }
        );
        setProfileState({ ...profile, url: response.data.profile.url });
        setProfile(response.data);
        window.location.reload();
        notifySuccess("Profile picture updated!");
      } catch (error) {
        notifyError("Failed to update profile picture.");
      }
    }
  };
  return (
    <div className="container mx-auto mt-8">
      {/* Page Header */}
      <div className="flex justify-between mb-8">
        <h1 className="text-3xl font-bold font-serif">Admin Profile</h1>
        <p className="text-sm text-gray-500">
          <span
            className="text-blue-500 hover:underline cursor-pointer"
            onClick={redirect_home}
          >
            Home{" "}
          </span>
          /
          <span
            className="cursor-pointer hover:underline"
            onClick={redirect_profile}
          >
            {" "}
            Profile
          </span>
        </p>
      </div>

      {/* Profile Information Section */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="relative mb-6">
              {/* Profile Image */}
              <img
                src={profile.url}
                alt="Profile"
                className="rounded-full w-32 h-32 object-cover"
              />
              <i
                className="fi fi-tr-camera text-white bg-blue-500 rounded-full p-2 absolute bottom-2 left-1/2 transform -translate-x-1/2 text-base shadow-lg cursor-pointer"
                onClick={openFileExplorer}
              ></i>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>

            {/* User Details */}
            <div className="text-xl">
              <h2 className="text-2xl font-semibold">
                {user.first_name + " " + user.last_name}
              </h2>
              <p className="text-gray-600 mt-1">
                {user?.email || "admin@example.com"}
              </p>
              <p className="text-gray-600 font-semibold capitalize mt-1">
                Administrator
              </p>
            </div>
          </div>
          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              onClick={handleEditProfile}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md flex items-center space-x-2"
            >
              <EditOutlinedIcon /> <span>Edit Profile</span>
            </button>
          </div>
        </div>
      </div>

      {/* Centered and Larger Profile Details */}
      <div className="mt-12 flex justify-center">
        <div className="bg-white rounded-lg shadow-md p-8 w-full md:w-3/4 lg:w-1/2">
          <h3 className="text-2xl font-semibold mb-6 text-center">
            Profile Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg text-gray-700">
            <p>
              <strong>First Name:</strong> {user.first_name || "N/A"}
            </p>
            <p>
              <strong>Last Name:</strong> {user.last_name || "N/A"}
            </p>
            <p>
              <strong>Username:</strong> {user.username || "N/A"}
            </p>
            <p>
              <strong>Email:</strong> {user?.email || "N/A"}
            </p>
          </div>
          {/* Change Password Button */}
          <div className="mt-10 flex justify-center">
            <button
              onClick={handleOpenPasswordModal}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-md"
            >
              Change Password
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <ProfileModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          user={user}
        />
      )}
      {isPasswordModalOpen && (
        <ChangePasswordModal
          isOpen={isPasswordModalOpen}
          onClose={handleClosePasswordModal}
        />
      )}
    </div>
  );
};

export default Profile;
