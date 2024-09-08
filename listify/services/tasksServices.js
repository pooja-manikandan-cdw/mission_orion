const AppError = require("../AppError");
const {
  checkEntireExists,
  getEntireIndex,
  sortByDueDate,
  sortByPriority,
  sortByTitle,
} = require("../utils/dataManipulationUtils");
const { readFromFile, writeIntoFile } = require("../utils/fileSystemUtils");
const moment = require("moment");

/**
 * @description reads tasks data from json file and returns the same
 * @returns tasks found from JSON
 */
const getAllTasks = () => {
  const tasks = readFromFile("data/tasks.json");
  return tasks;
};

/**
 * @description checks for valid id and returns task for the id received
 * @param {string} id
 * @returns particular task based on id received
 */
const getTask = async (id) => {
  if (!Number(id))
    throw new AppError(400, "Invalid task id", "INVALID_PATH_PARAM");
  const tasks = readFromFile("data/tasks.json");
  const taskFound = checkEntireExists(tasks, id, "id");
  if (!taskFound)
    throw new AppError(
      404,
      `Task not found for the taskId ${id}`,
      "TASK_NOT_FOUND"
    );
  return taskFound;
};

/**
 * @description checks for valid and updates the task with id recived with data
 * @param {string} id
 * @param {object} data
 * @returns the updated task
 */
const updateTask = async (id, data) => {
  if (!Number(id))
    throw new AppError(400, "Invalid task id", "INVALID_PATH_PARAM");
  const tasks = readFromFile("data/tasks.json");
  const taskFound = checkEntireExists(tasks, id, "id");
  if (!taskFound)
    throw new AppError(
      404,
      `Task not found for the taskId ${id}`,
      "TASK_NOT_FOUND"
    );
  taskFound.title = data.title;
  writeIntoFile("data/tasks.json", JSON.stringify(tasks));
  return taskFound;
};

/**
 * @description checks for valid id and deletes task for the id received
 * @param {string} id
 * @returns deleted task based on id received
 */
const deleteTask = async (id) => {
  if (!Number(id))
    throw new AppError(400, "Invalid task id", "INVALID_PATH_PARAM");
  let tasks = readFromFile("data/tasks.json");
  const taskFound = getEntireIndex(tasks, id, "id");
  if (taskFound === -1)
    throw new AppError(
      404,
      `Task not found for the taskId ${id}`,
      "TASK_NOT_FOUND"
    );
  tasks = [...tasks.slice(0, taskFound), ...tasks.slice(taskFound + 1)];
  writeIntoFile("data/tasks.json", JSON.stringify(tasks));
  return tasks;
};

/**
 * @description filters the tasks based on the params recived
 * @param {string} title
 * @param {string} priority
 * @param {string} dueDate
 * @param {string} limit
 * @returns filtered task based on param
 */
const filterTask = (title, priority, dueDate, limit) => {
  let tasks = readFromFile("data/tasks.json");
  const formattedDueDate = moment(dueDate);
  tasks = tasks.filter(
    (task) =>
      task.title.includes(title) &&
      task.priority === priority &&
      formattedDueDate.isSame(moment(task.dueDate))
  );
  if (tasks.length >= limit) {
    tasks.length = limit;
  }
  return tasks;
};

const sortTask = async (sortBy, orderBy, limit) => {
  let tasks = readFromFile("data/tasks.json");
  let response;
  switch (sortBy) {
    case "title":
      response = sortByTitle(tasks, orderBy);
      break;
    case "priority":
      response = sortByPriority(tasks, orderBy);
      break;
    case "dueDate":
      response = sortByDueDate(tasks, orderBy);
      break;
    default:
      throw new AppError(400, "Invalid query params", "INVALID_QUERY_PARAM");
  }
  if (response.length >= limit) {
    response.length = limit;
  }
  console.log("response", response);
  return response;
};

module.exports = {
  getAllTasks,
  getTask,
  updateTask,
  deleteTask,
  filterTask,
  sortTask,
};
