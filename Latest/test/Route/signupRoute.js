const express = require("express");
const auth = require("../Middleware/Auth");
const router = express.Router();

const signupController = require("../Controller/signupController");

// create user (Signup)
router.post("/signup", signupController.signup);

// Login User (Signin)
router.post("/login", signupController.login);

//forgetPassword
router.patch("/forgetPassword", signupController.forgetPassword);

//resetpassword
router.patch("/resetPassword", signupController.resetPassword);

router.get("/allData", auth, signupController.getAllData);

module.exports = router;
