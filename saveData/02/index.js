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

//Schema
const studentData = new mongoose.Schema({
  data: mongoose.Schema.Types.Mixed,
});

const studentModel = mongoose.model("students", studentData);

app.get("/students", async (req, res) => {
  try {
    const result = await studentModel.find();
    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "No Data Found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/students/name/:name", async (req, res) => {
  try {
    const result = await studentModel.find({ name: req.params.name });
    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "No Data Found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/students/age/:age", async (req, res) => {
  try {
    const result = await studentModel.find({ age: Number(req.params.age) });
    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "No Data Found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/students/city/:city", async (req, res) => {
  try {
    const result = await studentModel.find({ city: req.params.city });
    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "No Data Found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/students/status/:status", async (req, res) => {
  try {
    const result = await studentModel.find({ status: req.params.status });
    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "No Data Found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/students/degree/:degree", async (req, res) => {
  try {
    const result = await studentModel.find({ degree: req.params.degree });
    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "No Data Found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/students/email/:email", async (req, res) => {
  try {
    const result = await studentModel.find({ email: req.params.email });
    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "No Data Found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/students/marks/:marks", async (req, res) => {
  try {
    const result = await studentModel.find({
      marks: Number(req.params.marks),
    });

    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "No Data Found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/students/:id", async (req, res) => {
  try {
    const result = await studentModel.findById(req.params.id);

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({
        message: "Student not found",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

app.get("/fetchData", async (req, res) => {
  try {
    console.log(">>>>>>query", req.query);
    const { limit, skip } = req.query;
    const result = await studentModel.find().skip(skip).limit(limit);

    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "No Data Found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/greaterAge", async (req, res) => {
  try {
    console.log(">>>>>>query", req.query);
    const { age } = req.query;
    const result = await studentModel.find({ age: { $gt: Number(age) } });

    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "No Data Found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/greaterAgeCity", async (req, res) => {
  try {
    console.log(">>>>>>query", req.query);
    const { age, city } = req.query;
    const result = await studentModel.find({
      age: { $gt: Number(age) },
      city,
    });

    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "No Data Found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/status", async (req, res) => {
  try {
    console.log(">>>>>>query", req.query);
    const { status, limit, skip } = req.query;
    const result = await studentModel.find({ status }).skip(skip).limit(limit);

    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "No Data Found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/city", async (req, res) => {
  try {
    console.log(">>>>>>query", req.query);
    const { city } = req.query;
    const result = await studentModel.find({ city });

    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "No Data Found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/degree", async (req, res) => {
  try {
    console.log(">>>>>>query", req.query);
    const { degree } = req.query;
    const result = await studentModel.find({ degree });

    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "No Data Found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/statusAge", async (req, res) => {
  try {
    console.log(">>>>>>query", req.query);
    const { status, age } = req.query;
    const result = await studentModel.find({
      status,
      age: { $gt: Number(age) },
    });

    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "No Data Found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/marks", async (req, res) => {
  try {
    console.log(">>>>>>query", req.query);
    const { marks } = req.query;
    const result = await studentModel.find({
      marks: { $gt: Number(marks) },
    });

    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "No Data Found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/marksStatus", async (req, res) => {
  try {
    console.log(">>>>>>query", req.query);
    const { marks, status } = req.query;
    const result = await studentModel.find({
      status,
      marks: { $gt: Number(marks) },
    });

    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "No Data Found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/marksStatusAge", async (req, res) => {
  try {
    console.log(">>>>>>query", req.query);
    const { marks, status, age } = req.query;
    const result = await studentModel.find({
      status,
      marks: { $gt: Number(marks) },
      age: { $lt: Number(age) },
    });

    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "No Data Found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/addData", async (req, res) => {
  try {
    console.log(">>>>>>>>>add", req.query);

    const { a, b, operator } = req.query;

    const num1 = Number(a);
    const num2 = Number(b);

    let result;

    switch (operator) {
      case "+":
        result = num1 + num2;
        break;
      case "-":
        result = num1 - num2;
        break;
      case "*":
        result = num1 * num2;
        break;
      case "/":
        result = num2 !== 0 ? num1 / num2 : "Cannot divide by zero";
        break;
      default:
        return res.status(400).json({ message: "Invalid Operator" });
    }

    res.status(200).json({ result });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


app.get("/", (req, res) => {
  res.send("Students Data is Running.......");
});

app.listen(port, () => {
  console.log(`Server is Running on port${port}`);
});
