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
      <div className="bg-linear-to-r bg-amber-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Task Management</h1>

          {token && (
            <div className="flex items-center gap-4">
              <div className="text-white text-right">
                <p className="font-semibold">{user?.name}</p>
                <p className="text-sm opacity-80">{user?.email}</p>
              </div>

              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        <div className="flex justify-center gap-8 py-4 text-lg font-medium">
          <Link to="/" className="text-white hover:text-yellow-300 transition">
            Signup
          </Link>

          <Link
            to="/Login"
            className="text-white hover:text-yellow-300 transition"
          >
            Login
          </Link>

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
