import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const DashboardHome = () => {
  const { signupData: user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-[90vh] items-center justify-center text-white py-16">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        Welcome, <span className="text-blue-500">{user?.firstName}!</span>
      </h1>
      <p className="text-lg text-gray-300 mb-8 text-center">
        Let’s get started by uploading your first file.
      </p>

      <button
        onClick={() => navigate("/dashboard/upload")}
        className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 rounded-xl text-lg font-semibold shadow-md"
      >
        Upload a File
      </button>
    </div>
  );
};

export default DashboardHome;
