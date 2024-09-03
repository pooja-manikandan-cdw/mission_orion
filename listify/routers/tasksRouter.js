const express = require("express");
const {
  getAllTasksController,
  getTaskController,
  updateTaskController,
  deleteTaskController,
  filterTasksController,
  sortTaskController,
} = require("../controllers/tasksController");
const { PATH, TASKS, TASK_ID } = require("../constants");

const router = express.Router();

router.get('/filter', filterTasksController);
router.get('/sort', sortTaskController)
router.get(PATH, getAllTasksController);
router.get(`${TASK_ID}`, getTaskController);
router.put(`${TASK_ID}`, updateTaskController);
router.delete(TASK_ID, deleteTaskController);

module.exports = router;
