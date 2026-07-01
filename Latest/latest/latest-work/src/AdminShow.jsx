import axios from "axios";
import React, { useEffect, useState } from "react";

const AdminShow = () => {
  const [posts, setPosts] = useState([]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get("http://localhost:4000/post/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPosts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
        Admin Dashboard
      </h1>

      {posts.length === 0 ? (
        <div className="text-center text-xl">No Posts Found</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((item) => (
            <div key={item._id} className="bg-white p-6 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold mb-3">{item.title}</h2>

              <p>
                <strong>Writer:</strong> {item.writer}
              </p>

              <p>
                <strong>Description:</strong> {item.description}
              </p>

              <p>
                <strong>Status:</strong> {item.status}
              </p>

              {item.userId && (
                <p>
                  <strong>User ID:</strong> {item.userId}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminShow;
