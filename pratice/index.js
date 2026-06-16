const express = require("express");
const mongoose = require("mongoose");

const url = "mongodb://localhost:27017/test";

mongoose.connect(url).then(() => {
  console.log("DataBase Connected.......");
});

const app = express();
const port = 4000;
app.use(express.json());

//Schema
const customerData = new mongoose.Schema({
  data: mongoose.Schema.Types.Mixed,
});

const customerModel = mongoose.model("customers", customerData);

app.get("/customers", async (req, res) => {
  try {
    const result = await customerModel.find();
    // console.log(">>>>>result", result);
    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Data Not Found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/customers/:id", async (req, res) => {
  try {
    // console.log(">>>>>>>>params", req.params);
    const { id } = req.params;
    // console.log(">>>id", id);
    const result = await customerModel.findById(id);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/customers/status/:status", async (req, res) => {
  try {
    console.log(">>>>>>>>status", req.params.status);
    const status = req.params.status;
    const result = await customerModel.find({ status });
    console.log(">>>>>>result", result);

    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Data Not Found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Active and Age > 30
app.get("/fetchData", async (req, res) => {
  try {
    console.log(">>>>>>>>status", req.query);
    const { status, age, limit } = req.query;
    const result = await customerModel
      .find({ status, age: { $gt: Number(age) } })
      .limit(limit);
    console.log(">>>>>>result", result);

    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Data Not Found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/checkString", async (req, res) => {
  try {
    console.log(">>>>>body", req.body);
    const { a, b } = req.body;
    // console.log(a, b);
    const vowels = "aeiouAEIOU";
    let vow = 0;
    if (b === "vowelCount") {
      for (let ch of a) {
        if (vowels.includes(ch)) {
          vow++;
        }
      }
    }
    res.status(200).json(`Total Vowels = ${vow}`);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/channnu", (req, res) => {
  res.send("Welcome Channuuuuu.......");
});

app.get("/", (req, res) => {
  res.send("Welcome Bosss.......");
});

app.listen(port, () => {
  console.log(`Server is Running on port ${port}`);
});
