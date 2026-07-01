import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Form = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    fatherName: "",
    motherName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    age: "",
    gender: "",
    dateOfBirth: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
    education: "",
    college: "",
    status: "",
    bio: "",
  });

  const [errors, setErrors] = useState({});

  const fields = [
    { name: "firstName", label: "First Name", type: "text" },
    { name: "lastName", label: "Last Name", type: "text" },
    { name: "fatherName", label: "Father Name", type: "text" },
    { name: "motherName", label: "Mother Name", type: "text" },
    { name: "email", label: "Email", type: "email" },
    { name: "phone", label: "Phone Number", type: "tel" },
    { name: "password", label: "Password", type: "password" },
    { name: "confirmPassword", label: "Confirm Password", type: "password" },
    { name: "age", label: "Age", type: "number" },
    { name: "gender", label: "Gender", type: "text" },
    { name: "dateOfBirth", label: "Date of Birth", type: "date" },
    { name: "address", label: "Address", type: "text" },
    { name: "city", label: "City", type: "text" },
    { name: "state", label: "State", type: "text" },
    { name: "country", label: "Country", type: "text" },
    { name: "zipCode", label: "Zip Code", type: "text" },
    { name: "education", label: "Education", type: "text" },
    { name: "college", label: "College Name", type: "text" },
    { name: "status", label: "Status", type: "select" },
    { name: "bio", label: "Bio", type: "text" },
  ];

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const result = await axios.get(
          `http://localhost:4000/student/getting/${id}`,
        );

        setFormData({
          firstName: result.data.firstName || "",
          lastName: result.data.lastName || "",
          fatherName: result.data.fatherName || "",
          motherName: result.data.motherName || "",
          email: result.data.email || "",
          phone: result.data.phone || "",
          password: result.data.password || "",
          confirmPassword: result.data.password || "",
          age: result.data.age || "",
          gender: result.data.gender || "",
          dateOfBirth: result.data.dateOfBirth
            ? result.data.dateOfBirth.split("T")[0]
            : "",
          address: result.data.address || "",
          city: result.data.city || "",
          state: result.data.state || "",
          country: result.data.country || "",
          zipCode: result.data.zipCode || "",
          education: result.data.education || "",
          college: result.data.college || "",
          status: result.data.status || "",
          bio: result.data.bio || "",
        });
      } catch (error) {
        console.log(error);
      }
    };

    if (id) {
      fetchStudent();
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validate = () => {
    const newErrors = {};

    Object.keys(formData).forEach((field) => {
      if (!String(formData[field]).trim()) {
        newErrors[field] = "This field is required";
      }
    });

    if (formData.firstName && formData.firstName.length < 3) {
      newErrors.firstName = "Minimum 3 characters required";
    }

    if (formData.lastName && formData.lastName.length < 3) {
      newErrors.lastName = "Minimum 3 characters required";
    }

    if (formData.email) {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Invalid email address";
      }
    }

    if (formData.phone && !/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    if (formData.password && formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (formData.age && Number(formData.age) < 18) {
      newErrors.age = "Age must be 18+";
    }

    if (formData.zipCode && !/^\d{6}$/.test(formData.zipCode)) {
      newErrors.zipCode = "Zip code must be 6 digits";
    }

    if (formData.status && !["Active", "Inactive"].includes(formData.status)) {
      newErrors.status = "Select a valid status";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    try {
      setErrors({});

      if (id) {
        await axios.patch(
          `http://localhost:4000/student/update/${id}`,
          formData,
        );

        alert("Student Updated Successfully");
      } else {
        await axios.post("http://localhost:4000/student/posting", formData);

        alert("Student Added Successfully");
      }

      navigate("/AllStudent");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-3xl font-bold text-center mb-8">
          {id ? "Update Student" : "Student Registration Form"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {fields.map((field) => (
            <div key={field.name}>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                {field.label}
              </label>

              {field.type === "select" ? (
                <select
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors[field.name] ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder={`Enter ${field.label}`}
                  className={`w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors[field.name] ? "border-red-500" : "border-gray-300"
                  }`}
                />
              )}

              {errors[field.name] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[field.name]}
                </p>
              )}
            </div>
          ))}

          <div className="md:col-span-2">
            <button
              type="submit"
              className={`w-full py-3 rounded-lg font-semibold text-white ${
                id
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {id ? "Update Student" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
