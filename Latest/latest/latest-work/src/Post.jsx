import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Post = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEditMode = Boolean(id);

  const [users, setUsers] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    dueDate: "",
    assignTo: "",
  });

  const [errors, setErrors] = useState({});

  const currentUser = JSON.parse(localStorage.getItem("user"));

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:4000/userSignup/allData",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log("API Response:", response.data);

      setUsers(response.data);
    } catch (error) {
      console.log(error.response);
      console.log(error.response.data);
    }
  };
  console.log("Current User:", currentUser);
  console.log("Users:", users);

  const fetchTask = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(`http://localhost:4000/post/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);

      setFormData({
        title: response.data.title || "",
        dueDate: response.data.dueDate
          ? response.data.dueDate.split("T")[0]
          : "",
        assignTo: response.data.assignTo?._id || "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();

    if (isEditMode) {
      fetchTask();
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    } else if (formData.title.trim().length < 3) {
      newErrors.title = "Title must be at least 3 characters";
    }

    if (!formData.dueDate) {
      newErrors.dueDate = "Due Date is required";
    }

    if (!formData.assignTo) {
      newErrors.assignTo = "Please select a user";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      try {
        const token = localStorage.getItem("token");

        if (isEditMode) {
          const response = await axios.put(
            `http://localhost:4000/post/update/${id}`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );

          alert(response.data.message || "Task Updated Successfully");
        } else {
          const response = await axios.post(
            "http://localhost:4000/post/create",
            formData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );

          alert(response.data.message || "Task Created Successfully");
        }

        setFormData({
          title: "",
          dueDate: "",
          assignTo: "",
        });

        navigate("/AllPosts");
      } catch (error) {
        alert(error.response?.data?.message || "Something went wrong");
      }
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center mb-6">
          {isEditMode ? "Update Task" : "Create Task"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="title"
              placeholder="Enter Task Title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            />

            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            )}
          </div>

          <div>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            />

            {errors.dueDate && (
              <p className="text-red-500 text-sm mt-1">{errors.dueDate}</p>
            )}
          </div>

          <div>
            <select
              name="assignTo"
              value={formData.assignTo}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            >
              <option value="">Select User</option>

              {users
                .filter((user) => {
                  // khud ko task nahi de sakta
                  if (user._id === currentUser.id) return false;

                  // agar current user admin nahi hai,
                  // to admin ko dropdown me mat dikhao
                  if (
                    currentUser.role !== "admin" &&
                    user.role === "admin"
                  ) {
                    return false;
                  }

                  return true;
                })
                .map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.name} ({user.role})
                  </option>
                ))}
            </select>

            {errors.assignTo && (
              <p className="text-red-500 text-sm mt-1">{errors.assignTo}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
          >
            {isEditMode ? "Update Task" : "Create Task"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Post;
