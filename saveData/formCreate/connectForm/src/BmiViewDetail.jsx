import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const BmiViewDetail = () => {
  const [data, setData] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const result = await axios.get(`http://localhost:5000/bmiUser/${id}`);
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
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl shadow-sm">
              <span className="font-semibold text-gray-600">👤 Name</span>
              <span className="font-bold text-lg">{data.name}</span>
            </div>

            <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl shadow-sm">
              <span className="font-semibold text-gray-600">📧 Email</span>
              <span className="font-bold text-lg break-all">{data.email}</span>
            </div>

            <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl shadow-sm">
              <span className="font-semibold text-gray-600">🎂 Age</span>
              <span className="font-bold text-lg">{data.age}</span>
            </div>

            <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl shadow-sm">
              <span className="font-semibold text-gray-600">⚧ Gender</span>
              <span className="font-bold text-lg">{data.gender}</span>
            </div>

            <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl shadow-sm">
              <span className="font-semibold text-gray-600">📏 Height</span>
              <span className="font-bold text-lg">{data.height} cm</span>
            </div>

            <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl shadow-sm">
              <span className="font-semibold text-gray-600">⚖️ Weight</span>
              <span className="font-bold text-lg">{data.weight} kg</span>
            </div>

            <div className="bg-linear-to-r from-green-500 to-emerald-600 text-white p-5 rounded-xl text-center shadow-lg">
              <p className="text-sm uppercase tracking-wide">Body Mass Index</p>
              <h2 className="text-4xl font-bold mt-2">
                {Number(data.result).toFixed(2)}
              </h2>
            </div>
          </div>

          <div className="mt-8">
            <button
              onClick={() => navigate(-1)}
              className="w-full bg-blue-500 text-white py-3 rounded-xl hover:bg-blue-600 font-semibold"
            >
              Back To Users
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BmiViewDetail;
