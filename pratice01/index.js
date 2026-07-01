const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/praticeData")
  .then(() => console.log("Database Connected.."))
  .catch(() => console.log("eoor occur"));

const userRoute = require("./Router/userRoute");

app.use("/user", userRoute);

app.use("/", (req, res) => {
  res.send("Hello Boss....");
});

app.listen(port, () => {
  console.log("Server Connected....");
});
