const {
  getAllTasksController,
  getTaskController,
  updateTaskController,
  deleteTaskController,
  filterTasksController,
  sortTaskController,
} = require("../controllers/tasksController");
const tasksServices = require("../services/tasksServices");
const AppError = require("../AppError");

jest.mock("../services/tasksServices", () => ({
  getAllTasks: jest.fn(),
  getTask: jest.fn(),
  updateTask: jest.fn(),
  deleteTask: jest.fn(),
  filterTask: jest.fn(),
  sortTask: jest.fn(),
}));

describe("getAllTasksController", () => {
  let req, res, next;
  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    next = jest.fn();
  });
  it("should call res status and send when data is received", async () => {
    tasksServices.getAllTasks.mockReturnValue("test data");
    await getAllTasksController(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({ status: 200, data: "test data" });
  });
  it("should not call res send when data is not received from service", async () => {
    tasksServices.getAllTasks.mockReturnValue(null);
    await getAllTasksController(req, res, next);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.send).not.toHaveBeenCalled();
  });
  it("should call next when register services throws error", async () => {
    const error = new AppError(404, "Custom test error", "ERROR");
    tasksServices.getAllTasks.mockRejectedValue(error);
    await getAllTasksController(req, res, next);
    expect(next).toHaveBeenCalledWith(error);
  });
});

describe("getTaskController", () => {
  let req, res, next;
  beforeEach(() => {
    req = {
      params: {
        taskId: 123,
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    next = jest.fn();
  });
  it("should call res send when data is recived from service", async () => {
    tasksServices.getTask.mockReturnValue("test data");
    await getTaskController(req, res, next);
    expect(tasksServices.getTask).toHaveBeenCalledWith(req.params.taskId);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({ status: 200, data: "test data" });
  });
  it("should not call res send when data is not received from service", async () => {
    tasksServices.getTask.mockReturnValue(null);
    await getTaskController(req, res, next);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.send).not.toHaveBeenCalled();
  });
  it("should call next when register services throws error", async () => {
    const error = new AppError(404, "Custom test error", "ERROR");
    tasksServices.getTask.mockRejectedValue(error);
    await getTaskController(req, res, next);
    expect(next).toHaveBeenCalledWith(error);
  });
});
describe("updateTaskController", () => {
  let req, res, next;
  beforeEach(() => {
    req = {
      params: {
        taskId: 123,
      },
      body: {
        data: "data",
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    next = jest.fn();
  });
  it("should call res send when data is recived from service", async () => {
    tasksServices.updateTask.mockReturnValue("test data");
    await updateTaskController(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({
      status: 200,
      message: "task updated successfully",
    });
  });
  it("should not call res send when data is not received from service", async () => {
    tasksServices.updateTask.mockReturnValue(null);
    await updateTaskController(req, res, next);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.send).not.toHaveBeenCalled();
  });
  it("should call next when register services throws error", async () => {
    const error = new AppError(404, "Custom test error", "ERROR");
    tasksServices.updateTask.mockRejectedValue(error);
    await updateTaskController(req, res, next);
    expect(next).toHaveBeenCalledWith(error);
  });
});

describe("deleteTaskController", () => {
  let req, res, next;
  beforeEach(() => {
    req = {
      params: {
        taskId: 123,
      },
      body: {
        data: "data",
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    next = jest.fn();
  });
  it("should call res send when data is recived from service", async () => {
    tasksServices.deleteTask.mockReturnValue("test data");
    await deleteTaskController(req, res, next);
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalledWith();
  });
  it("should not call res send when data is not received from service", async () => {
    tasksServices.deleteTask.mockReturnValue(null);
    await deleteTaskController(req, res, next);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.send).not.toHaveBeenCalled();
  });
  it("should call next when register services throws error", async () => {
    const error = new AppError(404, "Custom test error", "ERROR");
    tasksServices.deleteTask.mockRejectedValue(error);
    await deleteTaskController(req, res, next);
    expect(next).toHaveBeenCalledWith(error);
  });
});

describe("filterTasksController", () => {
  let req, res, next;
  beforeEach(() => {
    req = {
      query: {
        title: "title",
        priority: "priority",
        dueDate: "dueDate",
        limit: "limit",
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    next = jest.fn();
  });
  it("should call res send when data is recived from service", async () => {
    tasksServices.filterTask.mockReturnValue("test data");
    await filterTasksController(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith("test data");
  });
  it("should not call res send when data is not received from service", async () => {
    tasksServices.filterTask.mockReturnValue(null);
    await filterTasksController(req, res, next);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.send).not.toHaveBeenCalled();
  });
  it("should call next when register services throws error", async () => {
    const error = new AppError(404, "Custom test error", "ERROR");
    tasksServices.filterTask.mockRejectedValue(error);
    await filterTasksController(req, res, next);
    expect(next).toHaveBeenCalledWith(error);
  });
});

describe("sortTaskController", () => {
  let req, res, next;
  beforeEach(() => {
    req = {
      query: {
        title: "title",
        priority: "priority",
        dueDate: "dueDate",
        limit: "limit",
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    next = jest.fn();
  });
  it("should call res send when data is recived from service", async () => {
    tasksServices.sortTask.mockReturnValue("test data");
    await sortTaskController(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({ status: 200, data: "test data" });
  });
  it("should not call res send when data is not received from service", async () => {
    tasksServices.sortTask.mockReturnValue(null);
    await sortTaskController(req, res, next);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.send).not.toHaveBeenCalled();
  });
});
