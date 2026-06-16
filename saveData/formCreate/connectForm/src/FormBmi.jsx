import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const FormBmi = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    name: "",
    email: "",
    age: "",
    gender: "Male",
    height: "",
    weight: "",
    result: 0,
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(`http://localhost:5000/bmiUser/${id}`);

        setForm({
          name: result.data.name || "",
          email: result.data.email || "",
          age: result.data.age || "",
          gender: result.data.gender || "Male",
          height: result.data.height || "",
          weight: result.data.weight || "",
          result: result.data.result || 0,
        });
      } catch (err) {
        console.log(err);
      }
    };

    if (id) {
      fetchUser();
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const getCategory = (bmi) => {
    if (bmi < 18.5) return "Underweight";
    if (bmi < 25) return "Normal";
    if (bmi < 30) return "Overweight";
    return "Obese";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const height = Number(form.height) / 100;

    const bmi = (Number(form.weight) / (height * height)).toFixed(2);

    const updatedForm = {
      ...form,
      result: bmi,
    };

    setForm(updatedForm);

    console.log("Updated Form =>", updatedForm);

    try {
      if (id) {
        await axios.patch(`http://localhost:5000/bmiUpdate/${id}`, updatedForm);

        alert("BMI Data Updated Successfully");
      } else {
        await axios.post("http://localhost:5000/bmiInformation", updatedForm);

        alert("BMI Data Submitted Successfully");
      }

      setForm({
        name: "",
        email: "",
        age: "",
        gender: "Male",
        height: "",
        weight: "",
        result: 0,
      });

      navigate("/BmiAllData");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6">
          {id ? "Update BMI Record" : "BMI Calculator"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Age</label>
            <input
              type="number"
              name="age"
              value={form.age}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Gender</label>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">Height (cm)</label>
            <input
              type="number"
              name="height"
              value={form.height}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Weight (kg)</label>
            <input
              type="number"
              name="weight"
              value={form.weight}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md"
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full text-white p-2 rounded-md cursor-pointer ${
              id
                ? "bg-green-500 hover:bg-green-600"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {id ? "Update BMI" : "Check BMI"}
          </button>

          {form.result > 0 && (
            <div className="text-center mt-4 bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold">Your BMI: {form.result}</h3>

              <h4 className="text-md text-gray-600">
                Category: {getCategory(Number(form.result))}
              </h4>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default FormBmi;
