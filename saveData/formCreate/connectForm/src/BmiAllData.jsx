import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BmiAllData = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    const result = await axios.get("http://localhost:5000/bmiUser");
    setData(result.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/bmiUser/delete/${id}`);
      alert("User Delete Successfully");
      await fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = (id) => {
    navigate(`/bmiUpdate/${id}`);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center mb-10 text-blue-600">
        BMI Records
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition duration-300"
          >
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 rounded-full bg-blue-500 text-white flex items-center justify-center text-3xl font-bold">
                {item.name.charAt(0).toUpperCase()}
              </div>
            </div>

            <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
              {item.name}
            </h2>

            <div className="space-y-2 text-gray-700">
              <p>
                <span className="font-semibold">Email:</span> {item.email}
              </p>

              <p>
                <span className="font-semibold"> Age:</span> {item.age}
              </p>

              <p>
                <span className="font-semibold"> Gender:</span> {item.gender}
              </p>

              <p>
                <span className="font-semibold"> Height:</span> {item.height} cm
              </p>

              <p>
                <span className="font-semibold"> Weight:</span> {item.weight} kg
              </p>
            </div>

            <div className="mt-5 text-center">
              <div className="bg-green-100 text-green-700 py-2 rounded-lg font-bold text-lg">
                BMI : {Number(item.result).toFixed(2)}
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => navigate(`/bmiUser/${item._id}`)}
                className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
              >
                View Details
              </button>

              <button
                onClick={() => handleDelete(item._id)}
                className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 cursor-pointer"
              >
                Delete
              </button>
              <button
                onClick={() => handleUpdate(item._id)}
                className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
              >
                Update
              </button>
              <button
                onClick={() => handleInactive(item._id)}
                className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 cursor-pointer"
              >
                Inactive
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BmiAllData;
