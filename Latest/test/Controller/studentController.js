const studentModel = require("../Model/studentModel");

// create user
const signup = async (req, res) => {
  try {
    console.log("BODY =>", req.body);

    const savedData = new studentModel(req.body);
    const result = await savedData.save();

    return res.status(201).json({
      message: "User created successfully",
      result,
    });
  } catch (error) {
    console.log("ERROR =>", error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

// get all Student
const getStudents = async (req, res) => {
  try {
    const result = await studentModel.find({ status: "Active" });

    if (result.length === 0) {
      return res.status(404).json({
        message: "No Users Found",
      });
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// get inactive Students
const getInactiveStudents = async (req, res) => {
  try {
    const result = await studentModel.find({ status: "Inactive" });

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get Unique Student
const getStudentById = async (req, res) => {
  try {
    const result = await studentModel.findById(req.params.id);

    if (!result) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// update Student
const updateStudent = async (req, res) => {
  try {
    const result = await studentModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );

    if (!result) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// PERMANENT DELETE
const permanentDelete = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await studentModel.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "Deleted permanently",
      result,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

//inactive student
const inactiveStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await studentModel.findByIdAndUpdate(
      id,
      { status: "Inactive" },
      { new: true },
    );

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Student restored successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//restore student
const restoreStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await studentModel.findByIdAndUpdate(
      id,
      { status: "Active" },
      { new: true },
    );

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Student restored successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  signup,

  getStudents,

  getInactiveStudents,

  getStudentById,

  updateStudent,

  permanentDelete,

  inactiveStudent,

  restoreStudent,
};
