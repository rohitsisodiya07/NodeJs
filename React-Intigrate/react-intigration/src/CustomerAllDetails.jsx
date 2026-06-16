import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const CustomerAllDetails = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const { age, name, city, status, email, gender, state, balance } =
    useParams();

  const fetchData = async () => {
    try {
      if (age) {
        const result = await axios.get(
          `http://localhost:7274/customers/age/${age}`,
        );
        setData(result.data);
      }

      if (name) {
        const result = await axios.get(
          `http://localhost:7274/customers/name/${name}`,
        );
        setData(result.data);
      }

      if (city) {
        const result = await axios.get(
          `http://localhost:7274/customers/city/${city}`,
        );
        setData(result.data);
      }

      if (status) {
        const result = await axios.get(
          `http://localhost:7274/customers/status/${status}`,
        );
        setData(result.data);
      }

      if (email) {
        const result = await axios.get(
          `http://localhost:7274/customers/email/${email}`,
        );
        setData(result.data);
      }

      if (gender) {
        const result = await axios.get(
          `http://localhost:7274/customers/gender/${gender}`,
        );
        setData(result.data);
      }

      if (state) {
        const result = await axios.get(
          `http://localhost:7274/customers/state/${state}`,
        );
        setData(result.data);
      }

      if (balance) {
        const result = await axios.get(
          `http://localhost:7274/customers/balance/${balance}`,
        );
        setData(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [age, name, city, status, email, gender, state, balance]);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-5">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-2xl relative">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition cursor-pointer"
        >
          ← Back
        </button>

        <h1 className="text-3xl font-bold text-center text-purple-600 mb-8">
          Customer List
        </h1>

        {data.length > 0 ? (
          data.map((customer) => (
            <div
              key={customer._id}
              className="border rounded-lg p-4 mb-4 shadow"
            >
              <div className="flex justify-between border-b pb-2">
                <span className="font-semibold">Customer ID</span>
                <span>{customer.customerId}</span>
              </div>

              <div className="flex justify-between border-b pb-2 mt-2">
                <span className="font-semibold">Name</span>
                <span>{customer.name}</span>
              </div>

              <div className="flex justify-between border-b pb-2 mt-2">
                <span className="font-semibold">Age</span>
                <span>{customer.age}</span>
              </div>

              <div className="flex justify-between border-b pb-2 mt-2">
                <span className="font-semibold">Gender</span>
                <span>{customer.gender}</span>
              </div>

              <div className="flex justify-between border-b pb-2 mt-2">
                <span className="font-semibold">Email</span>
                <span>{customer.email}</span>
              </div>

              <div className="flex justify-between border-b pb-2 mt-2">
                <span className="font-semibold">Phone</span>
                <span>{customer.phone}</span>
              </div>

              <div className="flex justify-between border-b pb-2 mt-2">
                <span className="font-semibold">City</span>
                <span>{customer.city}</span>
              </div>

              <div className="flex justify-between border-b pb-2 mt-2">
                <span className="font-semibold">State</span>
                <span>{customer.state}</span>
              </div>

              <div className="flex justify-between border-b pb-2 mt-2">
                <span className="font-semibold">Balance</span>
                <span>₹{customer.balance}</span>
              </div>

              <div className="flex justify-between items-center mt-2">
                <span className="font-semibold">Status</span>

                <span
                  className={`px-3 py-1 rounded-full text-white text-sm ${
                    customer.status === "Active" ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {customer.status}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-red-500">No Customers Found</p>
        )}
      </div>
    </div>
  );
};

export default CustomerAllDetails;
