const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = 5000;

app.get("/", (req, res) => {
  res.send("Server is Running.......");
});

app.listen(port, () => {
  console.log(`Server is Running on Port ${port}`);
});
