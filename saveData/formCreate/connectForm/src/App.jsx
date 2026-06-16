import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Form from "./Form";
import ShowData from "./ShowData";
import ShowDetails from "./ShowDetails";
import Inactive from "./Inactive";
import FormBmi from "./FormBmi";
import BmiAllData from "./BmiAllData";
import BmiViewDetail from "./BmiViewDetail";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/edit/:id" element={<Form />} />
        <Route path="/ShowData" element={<ShowData />} />
        <Route path="/user/:id" element={<ShowDetails />} />
        <Route path="/Inactive" element={<Inactive />} />
        <Route path="/FormBmi" element={<FormBmi />} />
        <Route path="/bmiUpdate/:id" element={<FormBmi />} />
        <Route path="/BmiAllData" element={<BmiAllData />} />
        <Route path="/bmiUser/:id" element={<BmiViewDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
