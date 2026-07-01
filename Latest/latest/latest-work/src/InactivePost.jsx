import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const InactivePost = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");

      const result = await axios.get("http://localhost:4000/post/inactive", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setData(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRestore = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.patch(
        `http://localhost:4000/post/restore/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <button
        onClick={() => navigate("/all-posts")}
        className="mb-6 bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800"
      >
        ← Back
      </button>

      <h1 className="text-4xl font-bold text-center text-red-600 mb-8">
        Inactive Tasks
      </h1>

      {data.length === 0 ? (
        <div className="text-center text-gray-500 text-xl">
          No Inactive Tasks Found
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((item) => (
            <div key={item._id} className="bg-white rounded-xl shadow-lg p-6">
              <div className="text-center mb-4">
                <div className="h-16 w-16 mx-auto rounded-full bg-red-500 text-white flex items-center justify-center text-2xl font-bold mb-2">
                  {item.assignTo?.name?.charAt(0).toUpperCase()}
                </div>

                <h2 className="text-2xl font-bold">{item.assignTo?.name}</h2>

                <p className="text-gray-500">{item.assignTo?.email}</p>
              </div>

              <div className="space-y-3">
                <p>
                  <span className="font-semibold">Task:</span> {item.title}
                </p>

                <p>
                  <span className="font-semibold">Due Date:</span>{" "}
                  {new Date(item.dueDate).toLocaleDateString()}
                </p>

                <span className="px-4 py-1 rounded-full bg-red-100 text-red-700 font-semibold">
                  {item.status}
                </span>
              </div>

              <div className="mt-5">
                <button
                  onClick={() => handleRestore(item._id)}
                  className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
                >
                  Restore
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InactivePost;
