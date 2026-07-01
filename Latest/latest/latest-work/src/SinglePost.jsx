import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const SinglePost = () => {
  const [post, setPost] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  const fetchPost = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(`http://localhost:4000/post/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPost(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  if (!post) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h1 className="text-2xl font-bold">Loading...</h1>
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

      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="h-20 w-20 mx-auto rounded-full bg-blue-500 text-white flex items-center justify-center text-3xl font-bold mb-3">
            {post.assignTo?.name?.charAt(0).toUpperCase()}
          </div>

          <h1 className="text-3xl font-bold text-gray-800">
            {post.assignTo?.name}
          </h1>

          <p className="text-gray-500">{post.assignTo?.email}</p>
        </div>

        <div className="space-y-5">
          <div>
            <h2 className="font-bold text-lg text-gray-700">Task Title</h2>

            <p className="text-gray-600">{post.title}</p>
          </div>

          <div>
            <h2 className="font-bold text-lg text-gray-700">Due Date</h2>

            <p className="text-gray-600">
              {new Date(post.dueDate).toLocaleDateString()}
            </p>
          </div>

          <div>
            <h2 className="font-bold text-lg text-gray-700">Assigned By</h2>

            <p className="text-gray-600">{post.assignBy?.name}</p>

            <p className="text-gray-500">{post.assignBy?.email}</p>
          </div>

          <div>
            <h2 className="font-bold text-lg text-gray-700">Assigned To</h2>

            <p className="text-gray-600">{post.assignTo?.name}</p>

            <p className="text-gray-500">{post.assignTo?.email}</p>
          </div>

          <div>
            <h2 className="font-bold text-lg text-gray-700">Created At</h2>

            <p className="text-gray-600">
              {new Date(post.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
