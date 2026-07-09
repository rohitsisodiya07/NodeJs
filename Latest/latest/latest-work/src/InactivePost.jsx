import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const InactivePost = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [view, setView] = useState("card");

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const result = await axios.get("http://localhost:4000/post/inactive", {
        headers: { Authorization: `Bearer ${token}` },
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
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const uniqueUsers = [
    ...new Map(
      data.map((item) => [item.assignTo?._id, item.assignTo])
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
        onClick={() => navigate("/all-posts")}
        className="mb-6 bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800"
      >
        ← Back
      </button>

      <h1 className="text-4xl font-bold text-center text-red-600 mb-8">
        Inactive Tasks
      </h1>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by Task or Name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
        />

        <select
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
          className="px-4 py-2 border rounded-lg shadow-sm bg-white"
        >
          <option value="">All Users</option>
          {uniqueUsers.map((user) => (
            <option key={user?._id} value={user?._id}>
              {user?.name}
            </option>
          ))}
        </select>

        <div className="flex gap-2">
          <button
            onClick={() => setView("card")}
            className={`px-4 py-2 rounded-lg ${view === "card" ? "bg-red-600 text-white" : "bg-gray-300"
              }`}
          >
            Card View
          </button>

          <button
            onClick={() => setView("table")}
            className={`px-4 py-2 rounded-lg ${view === "table" ? "bg-red-600 text-white" : "bg-gray-300"
              }`}
          >
            Table View
          </button>
        </div>
      </div>

      {filteredData.length === 0 ? (
        <div className="text-center text-xl text-gray-500">
          No Matching Tasks Found
        </div>
      ) : view === "card" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition"
            >
              <div className="text-center mb-4">
                <div className="h-16 w-16 mx-auto rounded-full bg-red-500 text-white flex items-center justify-center text-2xl font-bold mb-2">
                  {item.assignTo?.name?.charAt(0).toUpperCase()}
                </div>

                <h2 className="text-2xl font-bold">{item.assignTo?.name}</h2>
                <p className="text-gray-500">{item.assignTo?.email}</p>
              </div>

              <div className="space-y-2">
                <p><b>Task:</b> {item.title}</p>
                <p><b>Due Date:</b> {new Date(item.dueDate).toLocaleDateString()}</p>
                <p><b>Assigned To:</b> {item.assignTo?.name}</p>
                <span className="inline-block mt-2 px-3 py-1 rounded-full bg-red-100 text-red-700 font-semibold">
                  {item.status}
                </span>
              </div>

              <button
                onClick={() => handleRestore(item._id)}
                className="w-full mt-6 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
              >
                Restore
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
          <table className="w-full border-collapse">
            <thead className="bg-red-600 text-white">
              <tr>
                <th className="p-3">#</th>
                <th className="p-3">Task</th>
                <th className="p-3">Assigned To</th>
                <th className="p-3">Email</th>
                <th className="p-3">Due Date</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={item._id} className="border-b text-center hover:bg-gray-100">
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{item.title}</td>
                  <td className="p-3">{item.assignTo?.name}</td>
                  <td className="p-3">{item.assignTo?.email}</td>
                  <td className="p-3">{new Date(item.dueDate).toLocaleDateString()}</td>
                  <td className="p-3">
                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full">
                      {item.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => handleRestore(item._id)}
                      className="bg-green-500 text-white px-3 py-1 rounded"
                    >
                      Restore
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default InactivePost;
