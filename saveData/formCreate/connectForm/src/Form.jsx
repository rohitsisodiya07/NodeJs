import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Form = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(">>>>>>>>id", id);

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    city: "",
    email: "",
    phone: "",
    degree: "",
    status: "Active",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(`http://localhost:5000/user/${id}`);

        setFormData({
          name: result.data.name || "",
          age: result.data.age || "",
          city: result.data.city || "",
          email: result.data.email || "",
          phone: result.data.phone || "",
          degree: result.data.degree || "",
          status: result.data.status || "Active",
        });
      } catch (error) {
        console.log(error);
      }
    };

    if (id) {
      fetchUser();
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

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.age) {
      newErrors.age = "Age is required";
    } else if (formData.age < 1 || formData.age > 120) {
      newErrors.age = "Age must be between 1 and 120";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!String(formData.phone).trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(String(formData.phone))) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    if (!formData.degree.trim()) {
      newErrors.degree = "Degree is required";
    }
    if (!formData.status) {
      newErrors.status = "Status is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      try {
        if (id) {
          // UPDATE
          await axios.patch(`http://localhost:5000/formUpdate/${id}`, formData);

          alert("Data Updated Successfully");
        } else {
          // CREATE
          await axios.post("http://localhost:5000/formInformation", formData);

          alert("Data Submitted Successfully");
        }

        setFormData({
          name: "",
          age: "",
          city: "",
          email: "",
          phone: "",
          degree: "",
          status : "Active",
        });

        setErrors({});

        navigate("/ShowData");
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6">
          {id ? "Update Student" : "Student Form"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block font-medium mb-1">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md"
            />
            {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
          </div>

          <div>
            <label className="block font-medium mb-1">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md"
            />
            {errors.city && (
              <p className="text-red-500 text-sm">{errors.city}</p>
            )}
          </div>

          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block font-medium mb-1">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone}</p>
            )}
          </div>

          <div>
            <label className="block font-medium mb-1">Degree</label>
            <input
              type="text"
              name="degree"
              value={formData.degree}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md"
            />
            {errors.degree && (
              <p className="text-red-500 text-sm">{errors.degree}</p>
            )}
          </div>
          <div>
            <label className="block font-medium mb-1">Status</label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>

            {errors.status && (
              <p className="text-red-500 text-sm">{errors.status}</p>
            )}
          </div>

          <button
            type="submit"
            className={`w-full text-white py-2 rounded-md ${
              id
                ? "bg-green-600 hover:bg-green-700"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {id ? "Update" : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
