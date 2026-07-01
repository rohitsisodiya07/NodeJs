const express = require("express");

const router = express.Router();

const studentController = require("../Controller/studentController");

// router.post('/', studentController.signUp)

// create user (Signup)
router.post("/posting", studentController.signup);

// get all user
router.get("/getting", studentController.getStudents);

//get inactive student
router.get("/inactive", studentController.getInactiveStudents);

// Get Single Student By ID
router.get("/getting/:id", studentController.getStudentById);

// Update Student
router.patch("/update/:id", studentController.updateStudent);

// Permanent Delete User
router.delete("/permanentDelete/:id", studentController.permanentDelete);

//inactive student
router.patch("/inactiveStudent/:id", studentController.inactiveStudent);

//Restore
router.patch("/restoreStudent/:id", studentController.restoreStudent);

module.exports = router;
