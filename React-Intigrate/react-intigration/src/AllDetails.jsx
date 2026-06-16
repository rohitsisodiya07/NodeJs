import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const AllDetails = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const { age, name, city, status, degree, email, marks } = useParams();
  const fetchData = async () => {
    if (age) {
      const result = await axios.get(
        `http://localhost:5000/students/age/${age}`,
      );
      setData(result.data);
    }
    if (name) {
      const result = await axios.get(
        `http://localhost:5000/students/name/${name}`,
      );
      setData(result.data);
    }
    if (city) {
      const result = await axios.get(
        `http://localhost:5000/students/city/${city}`,
      );
      setData(result.data);
    }
    if (status) {
      const result = await axios.get(
        `http://localhost:5000/students/status/${status}`,
      );
      setData(result.data);
    }
    if (degree) {
      const result = await axios.get(
        `http://localhost:5000/students/degree/${degree}`,
      );
      setData(result.data);
    }
    if (email) {
      const result = await axios.get(
        `http://localhost:5000/students/email/${email}`,
      );
      setData(result.data);
    }
    if (marks) {
      const result = await axios.get(
        `http://localhost:5000/students/marks/${marks}`,
      );
      setData(result.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, [age, name, city, degree, email, marks]);

  console.log(">>>>>>>>", data);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-5">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-2xl relative">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition cursor-pointer"
        >
          ← Back
        </button>

        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
          Students List
        </h1>

        {data.length > 0 ? (
          data.map((student) => (
            <div
              key={student._id}
              className="border rounded-lg p-4 mb-4 shadow"
            >
              <div className="flex justify-between border-b pb-2">
                <span className="font-semibold">Name</span>
                <span>{student.name}</span>
              </div>

              <div className="flex justify-between border-b pb-2 mt-2">
                <span className="font-semibold">Age</span>
                <span>{student.age}</span>
              </div>

              <div className="flex justify-between border-b pb-2 mt-2">
                <span className="font-semibold">Email</span>
                <span>{student.email}</span>
              </div>

              <div className="flex justify-between border-b pb-2 mt-2">
                <span className="font-semibold">City</span>
                <span>{student.city}</span>
              </div>

              <div className="flex justify-between border-b pb-2 mt-2">
                <span className="font-semibold">Degree</span>
                <span>{student.degree}</span>
              </div>

              <div className="flex justify-between border-b pb-2 mt-2">
                <span className="font-semibold">Marks</span>
                <span>{student.marks}</span>
              </div>

              <div className="flex justify-between items-center mt-2">
                <span className="font-semibold">Status</span>

                <span
                  className={`px-3 py-1 rounded-full text-white text-sm ${
                    student.status === "Active" ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {student.status}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-red-500">
            No students found
          </p>
        )}
      </div>
    </div>
  );
};

export default AllDetails;
