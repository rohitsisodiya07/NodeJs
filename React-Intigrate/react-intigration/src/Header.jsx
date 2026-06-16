import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-gray-700 font-mono">
      <div className="text-center pt-10 text-5xl text-white"></div>
      <div className="flex gap-4 text-xl flex-wrap justify-center text-white mt-5">
        <Link to="/">Student</Link>
        <Link to="/CustomerList">Customer</Link>
      </div>
    </div>
  );
};

export default Header;
