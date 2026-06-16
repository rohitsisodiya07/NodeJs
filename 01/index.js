const express = require("express");
const mongoose = require("mongoose");

const url = "mongodb://localhost:27017/saveData";

mongoose.connect(url).then(() => {
  console.log("Connected...");
});

const app = express();
const port = 3000;

app.use(express.json());

// Schema
const orderData = new mongoose.Schema({
  data: mongoose.Schema.Types.Mixed,
});

const orderModel = mongoose.model("orders", orderData);

app.get("/orders", async (req, res) => {
  try {
    const result = await orderModel.find();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Create Schema for Save  Data
const userData = new mongoose.Schem ({
  name: String,
  age: Number,
  city: String,
  email: String,
});

const userModel = mongoose.model("user", userData);


app.get("/userString/string/:method", async(req, res)=>{

    console.log(">>>>>>>>>req", req.body);
    
})

app.post("/userSave", async (req, res) => {
  console.log(">>>>>>>>>>body", req.body);
  const { name, age, city, email } = req.body;
  if (!(name && age && city && email)) {
    return res.status(404).json({ message: "All Key are Required" });
  }

  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "Email Already Exist!!!" });
  }
  const result = await userModel.create(req.body);
  return res.status(201).json(result);
});

app.patch("/userUpdate", async (req, res) => {
  console.log(">>>>>>>>>>res", req.body);
  const id = req.body._id;
  const data = req.body;
  const result = await userModel.findByIdAndUpdate(id, data);
  return res.status(200).json(result);
});

app.patch("/userUpdateParams/:id", async (req, res) => {
  console.log(">>>>>>>>>>req", req.params);
  console.log(">>>>>>>>>>body", req.body);
  const id = req.params.id;
  const data = req.body;
  const result = await userModel.findByIdAndUpdate(id, data);
  return res.status(200).json(result);
});

app.patch("/userUpdateQuery/:id", async (req, res) => {
  console.log(">>>>>>>>>>req", req.query);
  console.log(">>>>>>>>>>body", req.body);
  const id = req.query.id;
  const data = req.body;
  const result = await userModel.findByIdAndUpdate(id, data);
  return res.status(200).json(result);
});


app.get("/orders/product", async (req, res) => {
  try {
    const result = await orderModel.find();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/orders/product/:product", async (req, res) => {
  try {
    const product = req.params.product;

    const result = await orderModel.find({
      product: { $regex: `^${product}$`, $options: "i" },
    });

    if (result.length === 0) {
      return res.status(404).json({
        message: "Product Not Found",
      });
    }

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/orders/status", async (req, res) => {
  try {
    const result = await orderModel.find();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/orders/status/:status", async (req, res) => {
  try {
    const status = req.params.status;

    const result = await orderModel.find({
      status: { $regex: `^${status}$`, $options: "i" },
    });

    if (result.length === 0) {
      return res.status(404).json({
        message: "Status Not Found",
      });
    }

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/orders/customer", async (req, res) => {
  try {
    const result = await orderModel.find();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/orders/customer/:customerId", async (req, res) => {
  try {
    const customerId = req.params.customerId;

    const result = await orderModel.find({
      customerId: new mongoose.Types.ObjectId(customerId),
    });

    if (result.length === 0) {
      return res.status(404).json({
        message: "Customer Not Found",
      });
    }

    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

app.get("/orders/:id", async (req, res) => {
  try {
    const result = await orderModel.findById(req.params.id);

    if (!result) {
      return res.status(404).json({
        message: "Data Not Found",
      });
    }

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

app.get("/", (req, res) => {
  res.send("Server is Running......");
});

app.get("/rohit", (req, res) => {
  res.send("Welcome Rohit Sisodiya......");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
