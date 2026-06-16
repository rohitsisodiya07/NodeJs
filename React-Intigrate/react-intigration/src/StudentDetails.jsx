import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const StudentDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState({});

  const fetchData = async () => {
    try {
      const result = await axios.get(`http://localhost:5000/students/${id}`);
      setData(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-5">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-lg relative">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition cursor-pointer"
        >
          ← Back
        </button>

        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
          Student Details
        </h1>

        <div className="space-y-4">
          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold">Name</span>
            <span>{data.name}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold">Age</span>
            <span>{data.age}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold">Email</span>
            <span>{data.email}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold">City</span>
            <span>{data.city}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold">Degree</span>
            <span>{data.degree}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold">Marks</span>
            <span>{data.marks}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="font-semibold">Status</span>

            <span
              className={`px-3 py-1 rounded-full text-white text-sm ${
                data.status === "Active" ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {data.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;
