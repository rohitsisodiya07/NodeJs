const postModel = require("../Model/studentroleModel");
const SignupModel = require("../Model/signupModel");

//create task
const createTask = async (req, res) => {
  try {
    const { title, dueDate, assignTo } = req.body;

    const assignedUser = await SignupModel.findById(assignTo);

    if (!assignedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // User cannot assign task to admin
    if (req.user.role !== "admin" && assignedUser.role === "admin") {
      return res.status(403).json({
        message: "You cannot assign task to admin",
      });
    }

    const result = await postModel.create({
      title,
      dueDate,
      assignTo,
      assignBy: req.user._id,
    });

    return res.status(201).json({
      message: "Task Created Successfully",
      result,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Tasks
const getAllTasks = async (req, res) => {
  try {
    let result;

    if (req.user.role === "admin") {
      result = await postModel
        .find()
        .populate("assignBy", "name email")
        .populate("assignTo", "name email role");
    } else {
      result = await postModel
        .find({
          $or: [{ assignBy: req.user._id }, { assignTo: req.user._id }],
        })
        .populate("assignBy", "name email")
        .populate("assignTo", "name email role");
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Active Tasks
const getPosts = async (req, res) => {
  try {
    let result;

    if (req.user.role === "admin") {
      result = await postModel
        .find({ status: "Active" })
        .populate("assignBy", "name email")
        .populate("assignTo", "name email role");
    } else {
      result = await postModel
        .find({
          assignBy: req.user._id,
          status: "Active",
        })
        .populate("assignTo", "name email role");
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Inactive Tasks
const getInactivePosts = async (req, res) => {
  try {
    let result;

    if (req.user.role === "admin") {
      result = await postModel
        .find({ status: "Inactive" })
        .populate("assignBy", "name email")
        .populate("assignTo", "name email role");
    } else {
      result = await postModel
        .find({
          assignBy: req.user._id,
          status: "Inactive",
        })
        .populate("assignTo", "name email role");
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Get Single Task
const getPostById = async (req, res) => {
  try {
    let result;

    if (req.user.role === "admin") {
      result = await postModel
        .findById(req.params.id)
        .populate("assignBy", "name email")
        .populate("assignTo", "name email role");
    } else {
      result = await postModel
        .findOne({
          _id: req.params.id,
          assignBy: req.user._id,
        })
        .populate("assignBy", "name email")
        .populate("assignTo", "name email role");
    }

    if (!result) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Update Task
const updatePost = async (req, res) => {
  try {
    let result;

    if (req.user.role === "admin") {
      result = await postModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
    } else {
      result = await postModel.findOneAndUpdate(
        {
          _id: req.params.id,
          assignBy: req.user._id,
        },
        req.body,
        {
          new: true,
        },
      );
    }
    if (!result) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    return res.status(200).json({
      message: "Task Updated Successfully",
      result,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

//delete task
const permanentDelete = async (req, res) => {
  try {
    let result;

    if (req.user.role === "admin") {
      result = await postModel.findByIdAndDelete(req.params.id);
    } else {
      result = await postModel.findOneAndDelete({
        _id: req.params.id,
        assignBy: req.user._id,
      });
    }

    if (!result) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    return res.status(200).json({
      message: "Task Deleted Successfully",
      result,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Inactive Task
const inactivePost = async (req, res) => {
  try {
    const task = await postModel.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    if (
      req.user.role !== "admin" &&
      task.assignBy.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "Access Denied",
      });
    }

    task.status = "Inactive";
    await task.save();

    return res.status(200).json({
      message: "Task Inactive Successfully",
      task,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Restore Task
const restorePost = async (req, res) => {
  try {
    const task = await postModel.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    if (
      req.user.role !== "admin" &&
      task.assignBy.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "Access Denied",
      });
    }

    task.status = "Active";
    await task.save();

    return res.status(200).json({
      message: "Task Restored Successfully",
      task,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Assigned To Me
const getAssignedToMe = async (req, res) => {
  try {
    let result;

    if (req.user.role === "admin") {
      result = await postModel
        .find({ status: "Active" })
        .populate("assignBy", "name email")
        .populate("assignTo", "name email role");
    } else {
      result = await postModel
        .find({
          assignTo: req.user._id,
          status: "Active",
        })
        .populate("assignBy", "name email");
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getPosts,
  getPostById,
  inactivePost,
  getInactivePosts,
  restorePost,
  permanentDelete,
  updatePost,
  getAssignedToMe,
};
