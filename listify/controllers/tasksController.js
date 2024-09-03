const {
  getAllTasks,
  getTask,
  updateTask,
  deleteTask,
  filterTask,
  sortTask,
} = require("../services/tasksServices");

const getAllTasksController = async (req, res, next) => {
  try {
    const data = await getAllTasks();
    if (data) {
      res.status(200).send({ status: 200, data: data });
    }
  } catch (error) {
    next(error);
  }
};

const getTaskController = async (req, res, next) => {
  try {
    const data = await getTask(req.params.taskId);
    if (data) {
      res.status(200).send({ status: 200, data: data });
    }
  } catch (error) {
    next(error);
  }
};

const updateTaskController = async (req, res, next) => {
  try {
    const data = await updateTask(req.params.taskId, req.body);
    if (data) {
      res
        .status(200)
        .send({ status: 200, message: "task updated successfully" });
    }
  } catch (error) {
    next(error);
  }
};

const deleteTaskController = async (req, res, next) => {
  try {
    const data = await deleteTask(req.params.taskId);
    if (data) {
      res.status(204).send();
    }
  } catch (error) {
    next(error);
  }
};

const filterTasksController = async (req, res, next) => {
  const { title, priority, dueDate, limit } = req.query;
  try {
    const response = await filterTask(title, priority, dueDate, limit);
    if (response) {
      res.status(200).send(response);
    }
  } catch (error) {
    next(error);
  }
};

const sortTaskController = async (req, res, next) => {
  const { sortBy, orderBy, limit } = req.query;
  const data = await sortTask(sortBy, orderBy, limit);
  if (data) {
    res.status(200).send({ status: 200, data: data });
  }
};

module.exports = {
  getAllTasksController,
  getTaskController,
  updateTaskController,
  deleteTaskController,
  filterTasksController,
  sortTaskController,
};
