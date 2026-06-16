const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors') ;

const app = express();
const port = 7274;
app.use(cors())

const url = "mongodb://localhost:27017/test";

mongoose
  .connect(url)
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log("Connection Failed:", err));

// Schema
const customerData = new mongoose.Schema({
  data: mongoose.Schema.Types.Mixed,
});

const customerModel = mongoose.model("customers", customerData);

// Get All Customers
app.get("/customers", async (req, res) => {
  try {
    const result = await customerModel.find();

    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "No Customers Found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Customer By ID
app.get("/customers/:id", async (req, res) => {
  try {
    const result = await customerModel.findById(req.params.id);

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Customer Not Found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get By Name
app.get("/customers/name/:name", async (req, res) => {
  try {
    const result = await customerModel.find({
      name: req.params.name,
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get By Age
app.get("/customers/age/:age", async (req, res) => {
  try {
    const result = await customerModel.find({
      age: Number(req.params.age),
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get By City
app.get("/customers/city/:city", async (req, res) => {
  try {
    const result = await customerModel.find({
      city: req.params.city,
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get By Status
app.get("/customers/status/:status", async (req, res) => {
  try {
    const result = await customerModel.find({
      status: req.params.status,
    });fetchData

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get By Email
app.get("/customers/email/:email", async (req, res) => {
  try {
    const result = await customerModel.find({
      email: req.params.email,
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get By Gender
app.get("/customers/gender/:gender", async (req, res) => {
  try {
    const result = await customerModel.find({
      gender: req.params.gender,
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get By State
app.get("/customers/state/:state", async (req, res) => {
  try {
    const result = await customerModel.find({
      state: req.params.state,
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get By Balance
app.get("/customers/balance/:balance", async (req, res) => {
  try {
    const result = await customerModel.find({
      balance: Number(req.params.balance),
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Home Route
app.get("/", (req, res) => {
  res.send("Server is Connected...");
});

// Start Server
app.listen(port, () => {
  console.log(`Server is Running on Port ${port}`);
});
