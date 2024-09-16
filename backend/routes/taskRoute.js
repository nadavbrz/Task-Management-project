const express = require("express");
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  getTask,
} = require("../controllers/taskController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/").post(protect, createTask).get(protect, getTasks);
router
  .route("/:id")
  .get(protect, getTask)
  .delete(protect, deleteTask)
  .put(protect, updateTask);

module.exports = router;
