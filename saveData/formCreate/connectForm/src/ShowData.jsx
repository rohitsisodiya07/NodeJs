import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ShowData = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const result = await axios.get(
        "http://localhost:5000/user/status/Active",
      );
      setData(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/user/delete/${id}`);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = (id) => {
    navigate(`/edit/${id}`);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInactive = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/Inactive/${id}`);

      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <button
        onClick={() => navigate("/")}
        className="mb-6 bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800"
      >
        ← Back
      </button>

      <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
        User Records
      </h1>

      {data.length === 0 ? (
        <div className="text-center text-gray-500 text-xl">
          No Students Found
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition duration-300"
            >
              <div className="flex items-center justify-center mb-4">
                <div className="h-16 w-16 rounded-full bg-blue-500 text-white flex items-center justify-center text-2xl font-bold">
                  {item.name?.charAt(0).toUpperCase()}
                </div>
              </div>

              <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
                {item.name}
              </h2>

              <div className="space-y-2 text-gray-700">
                <p>
                  <span className="font-semibold">Age:</span> {item.age}
                </p>
                <p>
                  <span className="font-semibold">City:</span> {item.city}
                </p>
                <p>
                  <span className="font-semibold">Email:</span> {item.email}
                </p>
                <p>
                  <span className="font-semibold">Phone:</span> {item.phone}
                </p>
                <p>
                  <span className="font-semibold">Degree:</span> {item.degree}
                </p>
                <span className="px-4 py-1 rounded-full bg-green-100 text-green-700 font-semibold">
                  {item.status}
                </span>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => navigate(`/user/${item._id}`)}
                  className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                >
                  View Details
                </button>

                <button
                  onClick={() => handleDelete(item._id)}
                  className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
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
      )}
    </div>
  );
};

export default ShowData;
