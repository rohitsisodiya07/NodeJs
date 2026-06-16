import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Student = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const result = await axios.get("http://localhost:5000/students");
    setData(result.data);
  };

  useEffect(() => {
    fetchData();
  }, []);
  console.log(">>>>>>data", data);

  return (
    <div className="min-h-screen bg-gray-100 p-6 text-center">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">
        Student List
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((student) => (
          <div
            key={student._id}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition duration-300"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {student.name}
            </h2>

            <div className="space-y-2 text-gray-600">
              <p>
                <span className="font-semibold">Age:</span> {student.age}
              </p>

              <p>
                <span className="font-semibold">Email:</span> {student.email}
              </p>

              <p>
                <span className="font-semibold">City:</span> {student.city}
              </p>

              <p>
                <span className="font-semibold">Degree:</span> {student.degree}
              </p>

              <p>
                <span className="font-semibold">Marks:</span> {student.marks}
              </p>
            </div>

            <div className="mt-4">
              <span
                className={`px-3 py-1 rounded-full text-white text-sm font-medium ${
                  student.status === "Active" ? "bg-green-500" : "bg-red-500"
                }`}
              >
                {student.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-1 mt-2">
              <div>
                <button
                  onClick={() => navigate(`/students/${student._id}`)}
                  className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600 cursor-pointer"
                >
                  Show by id
                </button>
              </div>
              <div>
                <button
                  onClick={() => navigate(`/students/age/${student.age}`)}
                  className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600 cursor-pointer"
                >
                  Show by Age
                </button>
              </div>
              <div>
                <button
                  onClick={() => navigate(`/students/name/${student.name}`)}
                  className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600 cursor-pointer"
                >
                  Show by Name
                </button>
              </div>
              <div>
                <button
                  onClick={() => navigate(`/students/city/${student.city}`)}
                  className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600 cursor-pointer"
                >
                  Show by City
                </button>
              </div>
              <div>
                <button
                  onClick={() => navigate(`/students/status/${student.status}`)}
                  className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600 cursor-pointer"
                >
                  Show by status
                </button>
              </div>
              <div>
                <button
                  onClick={() => navigate(`/students/degree/${student.degree}`)}
                  className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600 cursor-pointer"
                >
                  Show by Degree
                </button>
              </div>
              <div>
                <button
                  onClick={() => navigate(`/students/email/${student.email}`)}
                  className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600 cursor-pointer"
                >
                  Show by Email
                </button>
              </div>
              <div>
                <button
                  onClick={() =>
                    navigate(
                      `/greaterAgeCity?city=${student.city}&age=${student.age}`,
                    )
                  }
                  className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600 cursor-pointer"
                >
                  Show by FetchData
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Student;
