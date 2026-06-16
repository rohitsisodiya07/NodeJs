import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CustomerList = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const result = await axios.get("http://localhost:7274/customers");
    setData(result.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(">>>>>>>customer", data);
  
  return (
    <div className="min-h-screen bg-gray-100 p-6 text-center">
      <h1 className="text-4xl font-bold text-center mb-8 text-purple-600">
        Customer List
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((customer) => (
          <div
            key={customer._id}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition duration-300"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {customer.name}
            </h2>

            <div className="space-y-2 text-gray-600">
              <p>
                <span className="font-semibold">Age:</span> {customer.age}
              </p>

              <p>
                <span className="font-semibold">Gender:</span> {customer.gender}
              </p>

              <p>
                <span className="font-semibold">Email:</span> {customer.email}
              </p>

              <p>
                <span className="font-semibold">Phone:</span> {customer.phone}
              </p>

              <p>
                <span className="font-semibold">City:</span> {customer.city}
              </p>

              <p>
                <span className="font-semibold">State:</span> {customer.state}
              </p>

              <p>
                <span className="font-semibold">Balance:</span> ₹
                {customer.balance}
              </p>
            </div>

            <div className="mt-4">
              <span
                className={`px-3 py-1 rounded-full text-white text-sm font-medium ${
                  customer.status === "Active" ? "bg-green-500" : "bg-red-500"
                }`}
              >
                {customer.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-4">
              <button
                onClick={() => navigate(`/customers/${customer._id}`)}
                className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 cursor-pointer"
              >
                Show by ID
              </button>

              <button
                onClick={() => navigate(`/customers/name/${customer.name}`)}
                className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 cursor-pointer"
              >
                Show by Name
              </button>

              <button
                onClick={() => navigate(`/customers/age/${customer.age}`)}
                className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 cursor-pointer"
              >
                Show by Age
              </button>

              <button
                onClick={() => navigate(`/customers/city/${customer.city}`)}
                className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 cursor-pointer"
              >
                Show by City
              </button>

              <button
                onClick={() => navigate(`/customers/status/${customer.status}`)}
                className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 cursor-pointer"
              >
                Show by Status
              </button>

              <button
                onClick={() => navigate(`/customers/email/${customer.email}`)}
                className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 cursor-pointer"
              >
                Show by Email
              </button>

              <button
                onClick={() => navigate(`/customers/gender/${customer.gender}`)}
                className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 cursor-pointer"
              >
                Show by Gender
              </button>

              <button
                onClick={() => navigate(`/customers/state/${customer.state}`)}
                className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 cursor-pointer"
              >
                Show by State
              </button>

              <button
                onClick={() =>
                  navigate(`/customers/balance/${customer.balance}`)
                }
                className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 cursor-pointer"
              >
                Show by Balance
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerList;
