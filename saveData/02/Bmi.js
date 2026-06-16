const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const url = "mongodb://localhost:27017/saveData";

mongoose
  .connect(url)
  .then(() => {
    console.log("MongoDB Connected...");
  })
  .catch((err) => {
    console.log("Connection Failed:", err);
  });

const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());

//Schema
const formData = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  gender: String,
  height: Number,
  weight: Number,
  result: Number,
});

const formModel = mongoose.model("bmiData", formData);

app.post("/bmiInformation", async (req, res) => {
  console.log(">>>>>>>>>>body", req.body);
  const result = await formModel.create(req.body);
  return res.status(201).json(result);
});

app.get("/bmiUser", async (req, res) => {
  try {
    const result = await formModel.find();
    console.log(">>>>>>result", result);

    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "No Data Found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/bmiUser/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await formModel.findById(id);

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "No Data Found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.delete("/bmiUser/delete/:id", async (req, res) => {
  try {
    const result = await formModel.findByIdAndDelete(req.params.id);

    if (!result) {
      return res.status(404).json({
        message: "User Not Found",
      });
    }

    res.status(200).json({
      message: "User Deleted Successfully",
      result,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

app.patch("/bmiUpdate/:id", async (req, res) => {
  try {
    console.log(req.params);
    console.log(req.body);

    const id = req.params.id;
    const data = req.body;

    const result = await formModel.findByIdAndUpdate(id, data, { new: true });

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


app.get("/", (req, res) => {
  res.send("Form Data is Running.......");
});

app.listen(port, () => {
  console.log(`Server is Running on port${port}`);
});
