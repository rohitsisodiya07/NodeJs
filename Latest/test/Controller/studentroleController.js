const postModel = require("../Model/studentroleModel");

// Create Post
const createTask = async (req, res) => {
  console.log(">>>>>>req.body", req.body);

  try {
    const data = {
      title: req.body.title,
      dueDate: req.body.dueDate,
      assignTo: req.body.assignTo,
      assignBy: req.user._id, // Login User Id
    };

    const result = await postModel.create(data);

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

//dropdown user
const getAllTasks = async (req, res) => {
  try {
    const result = await postModel
      .find()
      .populate("assignBy", "name")
      .populate("assignTo", "name");

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// get all assignBy Active post
const getPosts = async (req, res) => {
  console.log(">>>>>>req.user", req.user);

  try {
    const result = await postModel
      .find({
        assignBy: req.user._id,
        status: "Active",
      })
      .populate("assignTo", "name email");

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// get inactive post
const getInactivePosts = async (req, res) => {
  console.log(">>>>>>req.user", req.user);
  try {
    const result = await postModel
      .find({
        assignBy: req.user._id,
        status: "Inactive",
      })
      .populate("assignTo", "name email");

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

//view details
const getPostById = async (req, res) => {
  console.log(">>>>>>req.user", req.user);
  try {
    const result = await postModel
      .findOne({
        _id: req.params.id,
        assignBy: req.user._id,
      })
      .populate("assignBy", "name email")
      .populate("assignTo", "name email");

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

//update post
const updatePost = async (req, res) => {
  console.log(">>>>>>req.user", req.user);
  try {
    const result = await postModel.findOneAndUpdate(
      {
        _id: req.params.id,
        assignBy: req.user._id,
      },
      req.body,
      {
        new: true,
      },
    );

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

// delete post
const permanentDelete = async (req, res) => {
  console.log(">>>>>>req.user", req.user);
  try {
    const result = await postModel.findOneAndDelete({
      _id: req.params.id,
      assignBy: req.user._id,
    });

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

// active-inactive post
const inactivePost = async (req, res) => {
  try {
    const result = await postModel.findByIdAndUpdate(
      req.params.id,
      {
        status: "Inactive",
      },
      {
        new: true,
      },
    );

    return res.status(200).json({
      message: "Task Inactive Successfully",
      result,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// restore post
const restorePost = async (req, res) => {
  try {
    const result = await postModel.findByIdAndUpdate(
      req.params.id,
      {
        status: "Active",
      },
      {
        new: true,
      },
    );

    return res.status(200).json({
      message: "Task Active Successfully",
      result,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

//get assign to me post
const getAssignedToMe = async (req, res) => {
  console.log(">>>>>>req.user", req.user);
  try {
    const result = await postModel
      .find({
        assignTo: req.user._id,
        status: "Active",
      })
      .populate("assignBy", "name email");

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
