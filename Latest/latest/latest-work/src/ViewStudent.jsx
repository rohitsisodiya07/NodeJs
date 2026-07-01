import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ViewStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);

  const fetchStudent = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/student/getting/${id}`,
      );

      setStudent(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStudent();
  }, []);

  if (!student) {
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Loading...
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

      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
          Student Details
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <p>
            <strong>First Name:</strong> {student.firstName}
          </p>
          <p>
            <strong>Last Name:</strong> {student.lastName}
          </p>
          <p>
            <strong>Father Name:</strong> {student.fatherName}
          </p>
          <p>
            <strong>Mother Name:</strong> {student.motherName}
          </p>
          <p>
            <strong>Email:</strong> {student.email}
          </p>
          <p>
            <strong>Phone:</strong> {student.phone}
          </p>
          <p>
            <strong>Age:</strong> {student.age}
          </p>
          <p>
            <strong>Gender:</strong> {student.gender}
          </p>
          <p>
            <strong>Date Of Birth:</strong>{" "}
            {new Date(student.dateOfBirth).toLocaleDateString()}
          </p>
          <p>
            <strong>Address:</strong> {student.address}
          </p>
          <p>
            <strong>City:</strong> {student.city}
          </p>
          <p>
            <strong>State:</strong> {student.state}
          </p>
          <p>
            <strong>Country:</strong> {student.country}
          </p>
          <p>
            <strong>Zip Code:</strong> {student.zipCode}
          </p>
          <p>
            <strong>Education:</strong> {student.education}
          </p>
          <p>
            <strong>College:</strong> {student.college}
          </p>

          <p>
            <strong>Status:</strong>
            <span
              className={`ml-2 px-3 py-1 rounded-full text-sm font-semibold ${
                student.status === "Active"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {student.status}
            </span>
          </p>

          <p className="md:col-span-2">
            <strong>Bio:</strong> {student.bio}
          </p>

          <p>
            <strong>Created At:</strong>{" "}
            {new Date(student.createdAt).toLocaleString()}
          </p>

          <p>
            <strong>Updated At:</strong>{" "}
            {new Date(student.updatedAt).toLocaleString()}
          </p>
        </div>
        <div className="mt-8 flex gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex-1 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
          >
            All Students
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewStudent;
