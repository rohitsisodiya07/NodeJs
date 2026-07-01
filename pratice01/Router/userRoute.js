const userController = require("../Controller/userController");
const authMiddleware = require("../Middleware/auth");

const express = require("express");

const router = express.Router();

router.post("/signUp", userController.createData);

router.post("/login", userController.loginData);

router.get("/profile", authMiddleware, userController.profile);

module.exports = router;
