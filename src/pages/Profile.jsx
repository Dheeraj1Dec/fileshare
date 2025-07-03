import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { signupData: user } = useSelector((state) => state.auth);

  if (!user) return null;

  const { firstName, lastName, email, image, createdAt, files } = user;

  return (
    <div className="bg-gray-900 text-white rounded-xl p-6 shadow-lg max-w-md mx-auto mt-10 border border-gray-700">
      <div className="flex items-center space-x-4">
        <img
          src={image}
          alt="User Avatar"
          className="w-20 h-20 rounded-full border-2 border-blue-600 shadow-md"
        />
        <div>
          <h2 className="text-2xl font-bold">{firstName} {lastName}</h2>
          <p className="text-sm text-gray-400">{email}</p>
        </div>
      </div>

      <div className="mt-6 space-y-2">
        <p><span className="font-semibold text-gray-300">Joined On:</span> {new Date(createdAt).toLocaleDateString()}</p>
        <p><span className="font-semibold text-gray-300">Files Uploaded:</span> {files?.length || 0}</p>
      </div>
    </div>
  );
};

export default Profile;
