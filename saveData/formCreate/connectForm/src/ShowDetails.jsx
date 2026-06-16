import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ShowDetails = () => {
  const [data, setData] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const result = await axios.get(`http://localhost:5000/user/${id}`);
      setData(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800"
      >
        ← Back
      </button>

      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-blue-600 p-8 flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-white text-blue-600 flex items-center justify-center text-4xl font-bold">
            {data.name?.charAt(0).toUpperCase()}
          </div>

          <h1 className="text-3xl font-bold text-white mt-4">{data.name}</h1>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-500">Age</p>
              <p className="text-xl font-semibold">{data.age}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-500">City</p>
              <p className="text-xl font-semibold">{data.city}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-500">Email</p>
              <p className="text-xl font-semibold break-all">{data.email}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-500">Phone</p>
              <p className="text-xl font-semibold">{data.phone}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg md:col-span-2">
              <p className="text-gray-500">Degree</p>
              <p className="text-xl font-semibold">{data.degree}</p>
            </div>
          </div>

          <div className="mt-8 flex gap-4">

            <button
              onClick={() => navigate(-1)}
              className="flex-1 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
            >
              All Students
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowDetails;
