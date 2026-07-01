const SignupModel = require("../Model/signupModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = "rohitsisodiyachann";

// create user
const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await SignupModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const saltRounds = 10;

    const salt = bcrypt.genSaltSync(saltRounds);
    console.log(">>>>>>salt", salt);

    const hash = bcrypt.hashSync(password, salt);
    console.log(">>>>>>>hash", hash);

    const data = {
      name,
      email,
      password: hash,
      role,
    };

    const savedData = new SignupModel(data);
    console.log(">>>>data", data);

    const result = await savedData.save();

    return res.status(201).json({
      message: "Signup Successfully",
      result,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// loginuser
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(">>>>>password", password);

    const result = await SignupModel.findOne({ email });
    console.log(">>>>>>result", result);

    if (!result) {
      return res.status(404).json({
        message: "Email not found",
      });
    }

    const match = await bcrypt.compare(password, result.password);
    console.log(">>>>>match", match);

    if (!match) {
      return res.status(400).json({
        message: "Wrong Password",
      });
    }

    const token = jwt.sign(
      {
        id: result._id,
      },
      secretKey,
      {
        expiresIn: "1d",
      },
    );
    console.log(">>>>>token", token);

    return res.status(200).json({
      message: "Login Successfully",
      token,
      user: {
        id: result._id,
        name: result.name,
        email: result.email,
        role: result.role,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

//forget password
const forgetPassword = async (req, res) => {
  console.log(">>>>>>>>body", req.body);

  try {
    const { email, password, confirmPassword } = req.body;

    const result = await SignupModel.findOne({ email });

    if (!result) {
      return res.status(404).json({
        message: "Email not found",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match",
      });
    }

    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    console.log(">>>>>>>salt", salt);

    const hash = bcrypt.hashSync(password, salt);
    console.log(">>>>>>>hash", hash);

    await SignupModel.findOneAndUpdate({ email }, { password: hash });

    return res.status(200).json({
      message: "Password updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

//reset password
const resetPassword = async (req, res) => {
  console.log(">>>>>>req", req.body);

  try {
    const { email, previousPassword, password, confirmPassword } = req.body;

    const result = await SignupModel.findOne({ email });

    if (!result) {
      return res.status(404).json({
        message: "Email not found",
      });
    }

    const isMatch = await bcrypt.compare(previousPassword, result.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Previous password is incorrect",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match",
      });
    }

    if (previousPassword === password) {
      return res.status(400).json({
        message: "New password cannot be same as previous password",
      });
    }

    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    console.log(">>>>>>>>hash", hash);

    await SignupModel.findOneAndUpdate({ email }, { password: hash });

    return res.status(200).json({
      message: "Password Reset Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const getAllData = async (req, res) => {
  const users = await SignupModel.find();
  return res.status(200).json(users);
};
module.exports = {
  signup,

  login,

  forgetPassword,

  resetPassword,

  getAllData,
};
