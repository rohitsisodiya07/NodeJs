const express = require("express");
const router = express.Router();

const authMiddleware = require("../Middleware/Auth");
const postController = require("../Controller/studentroleController");

// Create Task
router.post("/create", authMiddleware, postController.createTask);

//dropdown user
router.get("/all", authMiddleware, postController.getAllTasks);

//get all post
router.get("/myPost", authMiddleware, postController.getPosts);

// get inactive post
router.get("/inactive", authMiddleware, postController.getInactivePosts);

// update post
router.put("/update/:id", authMiddleware, postController.updatePost);

// active-Inactive post
router.patch("/inactive/:id", authMiddleware, postController.inactivePost);

// inactive-active(restore)
router.patch("/restore/:id", authMiddleware, postController.restorePost);

// delete
router.delete("/delete/:id", authMiddleware, postController.permanentDelete);

//assign to me
router.get("/assignedMe", authMiddleware, postController.getAssignedToMe);

//view details
router.get("/:id", authMiddleware, postController.getPostById);

module.exports = router;
