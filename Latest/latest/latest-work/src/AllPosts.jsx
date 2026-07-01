import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AllPosts = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");

      const result = await axios.get("http://localhost:4000/post/myPost", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setData(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`http://localhost:4000/post/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setData((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleInactive = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.patch(
        `http://localhost:4000/post/inactive/${id}`,
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

  const handleUpdate = (id) => {
    navigate(`/post/update/${id}`);
  };

  const handleView = (id) => {
    navigate(`/post/${id}`);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const uniqueUsers = [
    ...new Map(
      data.map((item) => [item.assignTo?._id, item.assignTo]),
    ).values(),
  ];

  const filteredData = data.filter((item) => {
    const matchesSearch =
      item.title?.toLowerCase().includes(search.toLowerCase()) ||
      item.assignTo?.name?.toLowerCase().includes(search.toLowerCase());

    const matchesUser =
      selectedUser === "" || item.assignTo?._id === selectedUser;

    return matchesSearch && matchesUser;
  });

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <button
        onClick={() => navigate("/post")}
        className="mb-6 bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800"
      >
        ← Back
      </button>

      <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
        Assigned Tasks
      </h1>

      <div className="flex flex-col md:flex-row justify-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by Task or Name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
          className="px-4 py-2 border rounded-lg shadow-sm bg-white"
        >
          <option value="">All Users</option>

          {uniqueUsers.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>

      {filteredData.length === 0 ? (
        <div className="text-center text-gray-500 text-xl">
          No Matching Tasks Found
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition duration-300"
            >
              <div className="text-center mb-4">
                <div className="h-16 w-16 mx-auto rounded-full bg-blue-500 text-white flex items-center justify-center text-2xl font-bold mb-2">
                  {item.assignTo?.name?.charAt(0).toUpperCase()}
                </div>

                <h2 className="text-2xl font-bold text-gray-800">
                  {item.assignTo?.name}
                </h2>

                <p className="text-gray-500">{item.assignTo?.email}</p>
              </div>

              <div className="space-y-3 text-gray-700">
                <p>
                  <span className="font-semibold">Task:</span> {item.title}
                </p>

                <p>
                  <span className="font-semibold">Due Date:</span>{" "}
                  {new Date(item.dueDate).toLocaleDateString()}
                </p>

                <p>
                  <span className="font-semibold">Assigned To:</span>{" "}
                  {item.assignTo?.name}
                </p>

                <p>
                  <span className="font-semibold">Email:</span>{" "}
                  {item.assignTo?.email}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-6">
                <button
                  onClick={() => handleView(item._id)}
                  className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                >
                  View
                </button>

                <button
                  onClick={() => handleInactive(item._id)}
                  className="bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600"
                >
                  Inactive
                </button>

                <button
                  onClick={() => handleUpdate(item._id)}
                  className="bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(item._id)}
                  className="bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllPosts;
