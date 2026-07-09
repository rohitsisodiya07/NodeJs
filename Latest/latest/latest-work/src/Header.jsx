import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.clear();
    navigate("/Login");
  };

  return (
    <>
      <div className="bg-amber-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">
            Task Management
          </h1>

          {token && (
            <div className="flex items-center gap-4">

              <img
                src={
                  user?.image ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    user?.name || "User"
                  )}`
                }
                alt="Profile" 
                className="w-30 h-30 rounded-full object-cover border-2 border-white shadow-md"
              />

              <div className="text-white">
                <p className="font-semibold text-lg">{user?.name}</p>
                <p className="text-sm opacity-90">{user?.email}</p>
              </div>


              <Link
                to="/ResetPassword"
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium transition"
              >
                Reset Password
              </Link>


              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>


        {token && (
          <div className="flex justify-center gap-10 py-4 text-lg font-medium">
            <Link
              to="/AllPosts"
              className="text-white hover:text-yellow-300 transition"
            >
              Active Tasks
            </Link>

            <Link
              to="/InactivePost"
              className="text-white hover:text-yellow-300 transition"
            >
              Inactive Tasks
            </Link>

            <Link
              to="/MyTask"
              className="text-white hover:text-yellow-300 transition"
            >
              My Task
            </Link>
          </div>
        )}
      </div>


      {token && (
        <Link
          to="/Post"
          className="fixed bottom-8 right-8 h-16 w-16 rounded-full bg-blue-600 text-white text-4xl flex items-center justify-center shadow-2xl hover:bg-blue-700 transition"
        >
          +
        </Link>
      )}
    </>
  );
};

export default Header;