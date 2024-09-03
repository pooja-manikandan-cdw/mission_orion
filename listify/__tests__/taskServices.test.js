const AppError = require("../AppError");
const fileSystem = require("../utils/fileSystemUtils");
const {
  getTask,
  getAllTasks,
  updateTask,
  deleteTask,
  filterTask,
  sortTask,
} = require("../services/tasksServices");

const taskMock = [
  {
    id: "1",
    title: "node express assignment",
    description: "task details",
    priority: "high",
    dueDate: "2024/07/03",
    comments: [
      { value: "task needs to be updated", timestamp: "" },
      { value: "latest updated", timestamp: "" },
    ],
  },
];

jest.mock("../utils/fileSystemUtils", () => ({
  readFromFile: jest.fn().mockReturnValue(taskMock),
  writeIntoFile: jest.fn(),
}));
describe("testing getAllTasks", () => {
  it("should return the data read from the file", async () => {
    const results = await getAllTasks();
    expect(results).toEqual(taskMock);
  });
});

describe("testing getTask", () => {
  it("should throw error when a valid taskId is not received", () => {
    expect(getTask(null)).rejects.toThrow(AppError);
    expect(getTask("abc")).rejects.toThrow(
      expect.objectContaining({
        statusCode: 400,
        errorCode: "INVALID_PATH_PARAM",
        message: "Invalid task id",
      })
    );
  });
  it("should throw an error when the task does not exist for the task id received", () => {
    expect(getTask("2")).rejects.toThrow(
      expect.objectContaining({
        statusCode: 404,
        errorCode: "TASK_NOT_FOUND",
        message: "Task not found for the taskId 2",
      })
    );
  });
  it("should return task for the matching task id received", async () => {
    const result = await getTask("1");
    expect(result).toEqual(taskMock[0]);
  });
});

describe("testing updateTask", () => {
  it("should throw error when a valid taskId is not received", () => {
    expect(updateTask(null)).rejects.toThrow(AppError);
    expect(updateTask("abc")).rejects.toThrow(
      expect.objectContaining({
        statusCode: 400,
        errorCode: "INVALID_PATH_PARAM",
        message: "Invalid task id",
      })
    );
  });
  it("should throw an error when the task does not exist for the task id received", () => {
    expect(updateTask("2")).rejects.toThrow(
      expect.objectContaining({
        statusCode: 404,
        errorCode: "TASK_NOT_FOUND",
        message: "Task not found for the taskId 2",
      })
    );
  });
  it("should return updated task for the matching task id received", async () => {
    const result = await updateTask("1", { title: "test" });
    expect(result).toEqual({
      id: "1",
      title: "test",
      description: "task details",
      priority: "high",
      dueDate: "2024/07/03",
      comments: [
        { value: "task needs to be updated", timestamp: "" },
        { value: "latest updated", timestamp: "" },
      ],
    });
  });
});

describe("testing deleteTask", () => {
  it("should throw error when a valid taskId is not received", () => {
    expect(deleteTask(null)).rejects.toThrow(AppError);
    expect(deleteTask("abc")).rejects.toThrow(
      expect.objectContaining({
        statusCode: 400,
        errorCode: "INVALID_PATH_PARAM",
        message: "Invalid task id",
      })
    );
  });
  it("should throw an error when the task does not exist for the task id received", () => {
    expect(deleteTask("2")).rejects.toThrow(
      expect.objectContaining({
        statusCode: 404,
        errorCode: "TASK_NOT_FOUND",
        message: "Task not found for the taskId 2",
      })
    );
  });
  it("should return the deleted task based on taskId received", async () => {
    fileSystem.readFromFile.mockReturnValue([
      {
        id: "1",
        title: "test",
        description: "task details",
        priority: "high",
        dueDate: "2024/07/03",
        comments: [
          { value: "task needs to be updated", timestamp: "" },
          { value: "latest updated", timestamp: "" },
        ],
      },
      {
        id: "3",
        title: "test listify assignment",
        description: "complete all review of node assignment",
        priority: "high",
        dueDate: "2024/07/03",
        comments: [
          { value: "task needs to be updated", timestamp: "" },
          { value: "latest updated", timestamp: "" },
        ],
      },
    ]);
    const response = await deleteTask("3");
    expect(response).toEqual([
      {
        id: "1",
        title: "test",
        description: "task details",
        priority: "high",
        dueDate: "2024/07/03",
        comments: [
          { value: "task needs to be updated", timestamp: "" },
          { value: "latest updated", timestamp: "" },
        ],
      },
    ]);
  });
});

describe("filterTask", () => {
  // fileSystem.readFromFile.mockReturnValue()
  it("should return tasks based on filter category", async () => {
    const response = await filterTask("test", "high", "2024/07/03", 1);
    expect(response).toEqual([
      {
        id: "1",
        title: "test",
        description: "task details",
        priority: "high",
        dueDate: "2024/07/03",
        comments: [
          { value: "task needs to be updated", timestamp: "" },
          { value: "latest updated", timestamp: "" },
        ],
      },
    ]);
  });
  it("should return tasks based on filter category when limit exceeds", async () => {
    const response = await filterTask("test", "high", "2024/07/03", 3);
    expect(response).toEqual([
      {
        comments: [
          { timestamp: "", value: "task needs to be updated" },
          { timestamp: "", value: "latest updated" },
        ],
        description: "task details",
        dueDate: "2024/07/03",
        id: "1",
        priority: "high",
        title: "test",
      },
      {
        comments: [
          { timestamp: "", value: "task needs to be updated" },
          { timestamp: "", value: "latest updated" },
        ],
        description: "complete all review of node assignment",
        dueDate: "2024/07/03",
        id: "3",
        priority: "high",
        title: "test listify assignment",
      },
    ]);
  });
  it("should return tasks based on filter category and when the limit is greater", async () => {
    const response = await filterTask("test", "high", "2024/07/03", 2);
    expect(response).toEqual([
      {
        id: "1",
        title: "test",
        description: "task details",
        priority: "high",
        dueDate: "2024/07/03",
        comments: [
          { value: "task needs to be updated", timestamp: "" },
          { value: "latest updated", timestamp: "" },
        ],
      },
      {
        id: "3",
        title: "test listify assignment",
        description: "complete all review of node assignment",
        priority: "high",
        dueDate: "2024/07/03",
        comments: [
          { value: "task needs to be updated", timestamp: "" },
          { value: "latest updated", timestamp: "" },
        ],
      },
    ]);
  });
});

describe("testing sortTask", () => {
  it("should throw error when a invalid sory by is received", () => {
    expect(sortTask("", "desc", 1)).rejects.toThrow({
      statusCode: 400,
      errorCode: "INVALID_QUERY_PARAM",
      message: "Invalid query params",
    });
  });
  it("should return tasks sort by title", async () => {
    const response = await sortTask("title", "desc", 2);
    expect(response).toEqual([
      {
        id: "3",
        title: "test listify assignment",
        description: "complete all review of node assignment",
        priority: "high",
        dueDate: "2024/07/03",
        comments: [
          { value: "task needs to be updated", timestamp: "" },
          { value: "latest updated", timestamp: "" },
        ],
      },
      {
        id: "1",
        title: "test",
        description: "task details",
        priority: "high",
        dueDate: "2024/07/03",
        comments: [
          { value: "task needs to be updated", timestamp: "" },
          { value: "latest updated", timestamp: "" },
        ],
      },
    ]);
  });
  it("should return tasks sort by title", async () => {
    const response = await sortTask("title", "desc", 2);
    expect(response).toEqual([
      {
        id: "3",
        title: "test listify assignment",
        description: "complete all review of node assignment",
        priority: "high",
        dueDate: "2024/07/03",
        comments: [
          { value: "task needs to be updated", timestamp: "" },
          { value: "latest updated", timestamp: "" },
        ],
      },
      {
        id: "1",
        title: "test",
        description: "task details",
        priority: "high",
        dueDate: "2024/07/03",
        comments: [
          { value: "task needs to be updated", timestamp: "" },
          { value: "latest updated", timestamp: "" },
        ],
      },
    ]);
  });
  it("should return tasks sort by priority when limit exceeds", async () => {
    const response = await sortTask("priority", "desc", 3);
    expect(response).toEqual([
      {
        id: "3",
        title: "test listify assignment",
        description: "complete all review of node assignment",
        priority: "high",
        dueDate: "2024/07/03",
        comments: [
          { value: "task needs to be updated", timestamp: "" },
          { value: "latest updated", timestamp: "" },
        ],
      },
      {
        id: "1",
        title: "test",
        description: "task details",
        priority: "high",
        dueDate: "2024/07/03",
        comments: [
          { value: "task needs to be updated", timestamp: "" },
          { value: "latest updated", timestamp: "" },
        ],
      },
    ]);
  });
  it("should return tasks sort by priority", async () => {
    const response = await sortTask("dueDate", "desc", 2);
    expect(response).toEqual([
      {
        id: "3",
        title: "test listify assignment",
        description: "complete all review of node assignment",
        priority: "high",
        dueDate: "2024/07/03",
        comments: [
          { value: "task needs to be updated", timestamp: "" },
          { value: "latest updated", timestamp: "" },
        ],
      },
      {
        id: "1",
        title: "test",
        description: "task details",
        priority: "high",
        dueDate: "2024/07/03",
        comments: [
          { value: "task needs to be updated", timestamp: "" },
          { value: "latest updated", timestamp: "" },
        ],
      },
    ]);
  });
});
