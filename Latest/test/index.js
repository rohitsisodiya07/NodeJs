const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/studentDB")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const studentRoute = require("./Route/studentRoute");

const signupRoute = require("./Route/signupRoute");

// const roleWiseRoute = require("./Route/roleWiseRoute");

const postRoute = require("./Route/studentroleRoute");

app.use("/student", studentRoute);

app.use("/userSignup", signupRoute);

// app.use("/role", roleWiseRoute);

app.use("/post", postRoute);

app.get("/", (req, res) => {
  res.send("Server is Running.......");
});

app.listen(port, () => {
  console.log(`Server is Running on Port ${port}`);
});
