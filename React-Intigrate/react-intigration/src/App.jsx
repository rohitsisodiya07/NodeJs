import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Student from "./Student";
import StudentDetails from "./StudentDetails";
import AllDetails from "./AllDetails";
import QueryData from "./QueryData";
import CustomerList from "./CustomerList";
import CustomerDetails from "./CustomerDetails";
import CustomerAllDetails from "./CustomerAllDetails";
import Header from "./Header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Student />} />
        <Route path="/students/:id" element={<StudentDetails />} />
        <Route path="/students/age/:age" element={<AllDetails />} />
        <Route path="/students/name/:name" element={<AllDetails />} />
        <Route path="/students/city/:city" element={<AllDetails />} />
        <Route path="/students/status/:status" element={<AllDetails />} />
        <Route path="/students/degree/:degree" element={<AllDetails />} />
        <Route path="/students/email/:email" element={<AllDetails />} />
        <Route path="/students/marks/:marks" element={<AllDetails />} />
        <Route path="/greaterAgeCity" element={<QueryData />} />
        <Route path="/CustomerList" element={<CustomerList />} />
        <Route path="/customers/:id" element={<CustomerDetails />} />
        <Route path="/customers/name/:name" element={<CustomerAllDetails />} />
        <Route path="/customers/age/:age" element={<CustomerAllDetails />} />
        <Route path="/customers/city/:city" element={<CustomerAllDetails />} />
        <Route
          path="/customers/status/:status"
          element={<CustomerAllDetails />}
        />
        <Route
          path="/customers/email/:email"
          element={<CustomerAllDetails />}
        />
        <Route
          path="/customers/gender/:gender"
          element={<CustomerAllDetails />}
        />
        <Route
          path="/customers/state/:state"
          element={<CustomerAllDetails />}
        />
        <Route
          path="/customers/balance/:balance"
          element={<CustomerAllDetails />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
