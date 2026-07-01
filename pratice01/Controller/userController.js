const userModel = require("../Model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = "qwertyuiolkjhgfdsazxcvbnm";

const createData = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    console.log(">>>>>name", name);
    console.log(">>>>>email", email);
    console.log(">>>>>password", password);

    const existUser = await userModel.findOne({ email });
    if (existUser) {
      res.status(409).json({ message: "Data Already Exist" });
    }

    const salt = bcrypt.genSaltSync(10);
    console.log(">>>>>>>salt", salt);

    const hash = bcrypt.hashSync(password, salt);
    console.log(">>>>>>>>hash", hash);

    const data = {
      name,
      email,
      password: hash,
      role
    };

    const result = await userModel.create(data);

    return res.status(201).json({ message: "signup successful", result });
  } catch (error) {}
};

const loginData = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(">>>>>name", name);
    console.log(">>>>>email", email);
    console.log(">>>>>password", password);

    const existEmail = await userModel.findOne({ email });
    console.log(">>>>>>existUserCheck", existEmail);

    if (!existEmail) {
      res.status(404).json({ message: "Email Not Found" });
    }
    const checkPassword = await bcrypt.compare(password, existEmail.password);
    console.log(">>>>>passCheck", checkPassword);

    if (!checkPassword) {
      res.status(400).json({ message: "Wrong Password" });
    }
    const token = await jwt.sign({ email }, secretKey, {expiresIn : '10m'});
    console.log(">>>>>>token", token);

    res.status(200).json({ message: "Successfully Login", existEmail, token });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const profile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized access",
      });
    }

    return res.status(200).json({
      message: "Profile fetched successfully",
      user: req.user,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  createData,

  loginData,

  profile,
};
