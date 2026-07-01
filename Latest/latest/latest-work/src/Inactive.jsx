import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Inactive = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const result = await axios.get(
        "http://localhost:4000/student/inactive",
      );

      setData(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleActive = async (id) => {
    try {
      await axios.patch(`http://localhost:4000/student/restoreStudent/${id}`);

      await fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <button
        onClick={() => navigate("/AllStudent")}
        className="mb-6 bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800"
      >
        ← Back
      </button>

      <h1 className="text-4xl font-bold text-center text-red-600 mb-8">
        Inactive Students
      </h1>

      {data.length === 0 ? (
        <div className="text-center text-xl text-gray-500">
          No Inactive Students Found
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex justify-center mb-4">
                <div className="h-16 w-16 rounded-full bg-red-500 text-white flex items-center justify-center text-2xl font-bold">
                  {item.firstName?.charAt(0).toUpperCase()}
                </div>
              </div>

              <h2 className="text-2xl font-bold text-center mb-3">
                {item.firstName} {item.lastName}
              </h2>

              <div className="space-y-2 text-gray-700">
                <p>
                  <span className="font-semibold">Email:</span> {item.email}
                </p>

                <p>
                  <span className="font-semibold">Phone:</span> {item.phone}
                </p>

                <p>
                  <span className="font-semibold">City:</span> {item.city}
                </p>

                <p>
                  <span className="font-semibold">College:</span> {item.college}
                </p>
              </div>

              <div className="mt-4 flex justify-center">
                <span className="px-4 py-1 rounded-full bg-red-100 text-red-700 font-semibold">
                  {item.status}
                </span>
              </div>

              <div className="text-center mt-4">
                <button
                  onClick={() => handleActive(item._id)}
                  className="bg-green-500 text-white py-2 px-8 rounded-lg hover:bg-green-600"
                >
                  Active
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Inactive;
