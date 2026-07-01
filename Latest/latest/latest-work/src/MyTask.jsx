import axios from "axios";
import React, { useEffect, useState } from "react";

const MyTask = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:4000/post/assignedMe",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTasks(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
        My Tasks
      </h1>

      {tasks.length === 0 ? (
        <div className="text-center text-gray-500 text-xl">
          No Tasks Assigned
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h2 className="text-2xl font-bold mb-3">
                {task.title}
              </h2>

              <p className="mb-2">
                <span className="font-semibold">
                  Due Date:
                </span>{" "}
                {new Date(task.dueDate).toLocaleDateString()}
              </p>

              <p className="mb-2">
                <span className="font-semibold">
                  Assigned By:
                </span>{" "}
                {task.assignBy?.name}
              </p>

              <p className="mb-4 text-gray-600">
                {task.assignBy?.email}
              </p>

              <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 font-semibold">
                {task.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTask;