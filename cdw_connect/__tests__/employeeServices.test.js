const AppError = require("../AppError");
const {
  signupEmployee,
  signinEmployee,
  updateUser,
  getPendingUsers,
  updatePendingUser,
} = require("../services/employee.services");
const employees = require("../models/employee.model");
const jwt = require("jsonwebtoken");
const mailUtils = require("../utils/mailer.utils");

// jest.mock("../models/employee.model", () => ({
//   updateOne: jest.fn(),
//   find: jest.fn(),

// }));

jest.mock("../models/employee.model", () => {
  return {
    // Mock the 'find' method to simulate Mongoose behavior
    find: jest.fn(),
    updateOne: jest.fn(),
    save: jest.fn(),
  };
});

jest.mock("../utils/mailer.utils", () => ({
  sendMail: jest.fn(),
}));

jest.mock("jsonwebtoken", () => ({
  sign: jest.fn(),
}));

// const jwtSignSpy = jest.spyOn(jwt, "sign").mockReturnValue("testToken");

// let findSpy;

describe("signupEmployee", () => {
  let payload = {
    employeeId: "1910",
    name: "swetha",
    email: "swetha.prakashan@cdw.com",
    role: "admin",
    password: "test",
    profilePicture: "https://picsum.photos/200/300",
    bio: "orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
    latestDesignation: "consultant",
    certifications: ["abc", "def", "aaa"],
    experience: 3,
    bu: "software engineering",
    location: "chennai",
  };
  beforeEach(() => {
    payload.employeeId = "1910";
    // findSpy = jest.spyOn(employees, "find");
    // jest.resetAllMocks();
  });

  afterEach(() => {
    // findSpy = jest.spyOn(employees, "find");
    jest.resetAllMocks();
  });

  // afterAll(() => {
  //   // Clean up the spy after all tests are done
  //   // findSpy.mockRestore();
  // });
  it("should throw error when employee is not found in JSON", async () => {
    payload.employeeId = 0;
    await expect(signupEmployee(payload)).rejects.toThrow(AppError);
  });

  it("should return app error to try after 2 days when employee is already rejected", async () => {
    const date = new Date().toISOString();
    employees.find.mockResolvedValue([
      {
        employeeId: "1910",
        name: "swetha",
        email: "swetha.prakashan@cdw.com",
        role: "admin",
        password: "test",
        profilePicture: "https://picsum.photos/200/300",
        bio: "orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
        latestDesignation: "consultant",
        cetifications: ["abc", "def", "aaa"],
        experience: 3,
        bu: "software engineering",
        location: "chennai",
        approvalStatus: "rejected",
        timestamp: date,
      },
    ]);
    // findSpy.mockReturnValue([
    //   {
    //     employeeId: "1910",
    //     name: "swetha",
    //     email: "swetha.prakashan@cdw.com",
    //     role: "admin",
    //     password: "test",
    //     profilePicture: "https://picsum.photos/200/300",
    //     bio: "orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
    //     latestDesignation: "consultant",
    //     cetifications: ["abc", "def", "aaa"],
    //     experience: 3,
    //     bu: "software engineering",
    //     location: "chennai",
    //     approvalStatus: "rejected",
    //     timestamp: date,
    //   },
    // ]);
    await expect(signupEmployee(payload)).rejects.toThrow(
      expect.objectContaining({
        statusCode: 400,
        errorCode: "",
        message: "Employee have been rejected try again after 2 days",
      })
    );
  });

  it("should update employee with pending status and return true", async () => {
    employees.find.mockResolvedValue([
      {
        employeeId: "1910",
        name: "swetha",
        email: "swetha.prakashan@cdw.com",
        role: "admin",
        password: "test",
        profilePicture: "https://picsum.photos/200/300",
        bio: "orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
        latestDesignation: "consultant",
        cetifications: ["abc", "def", "aaa"],
        experience: 3,
        bu: "software engineering",
        location: "chennai",
        approvalStatus: "rejected",
        timestamp: "2025-02-19T00:00:00.000Z",
      },
    ]);
    employees.updateOne.mockResolvedValue({ modifiedCount: 1 });
    const result = await signupEmployee(payload);
    expect(result).toBe(true);
  });

  // it("should save a new employee and return the same", async() => {
  //   payload.employeeId = '1910';
  //   console.log('logging', employees)
  //   // const mockSave = jest.fn().mockResolvedValueOnce({
  //   //   ...payload
  //   // });

  //   // Use spyOn to mock the save method of the employees model
  //   // jest.spyOn(employees.prototype, 'save').mockImplementation(mockSave);
  //   await expect(employees.save()).resolves.toEqual(payload);
  //   // const mockSave = jest.fn().mockResolvedValueOnce({
  //   //  payload
  //   // });
  //   // employees.mockImplementationOnce(() => ({
  //   //   save: mockSave,
  //   // }));
  //   // employees.mockReset();
  //   // const saveSpy = jest.spyOn(employees)
  //   // employees.mockImplementationOnce(() => ({
  //   //   save: jest.fn().mockResolvedValue(payload),
  //   // }));
  //   // employees.find.mockResolvedValue([])
  //   // employees.save.mockResolvedValue(payload)
  //   const result = await signupEmployee(payload);
  //   await expect(result).toBe(payload);
  //   await expect(result).toBe(payload);
  // })
});

describe("signinEmployee", () => {
  const payload = {
    employeeId: "1675",
    role: "admin",
    approvalStatus: "pending",
  };
  it("should return token when it have valid employeeId and role is admin", async () => {
    jwt.sign.mockReturnValue("testToken");
    const token = await signinEmployee(payload);
    expect(token).toEqual("testToken");
  });
  it("should throw app error when approval status is pending", async () => {
    payload.role = "co-worker";
    await expect(signinEmployee(payload)).rejects.toThrow(
      expect.objectContaining({
        statusCode: 400,
        errorCode: "",
        message: "account is still waiting for approval",
      })
    );
  });
  it("should throw app error when approval status is rejected", async () => {
    payload.approvalStatus = "rejected";
    await expect(signinEmployee(payload)).rejects.toThrow(
      expect.objectContaining({
        statusCode: 400,
        errorCode: "",
        message: "your account is rejected, register after 2 days",
      })
    );
  });
  it("should return token for a successfull co-worker login", async () => {
    payload.approvalStatus = "approved";
    const token = await signinEmployee(payload);
    expect(token).toEqual("testToken");
  });
  it("should return empty string when role is neither admin nor co-worker", async () => {
    payload.role = "abc";
    const token = await signinEmployee(payload);
    expect(token).toEqual("");
  });
});

describe("updateUser", () => {
  it("should return true for on successfull update of user", async () => {
    employees.updateOne.mockResolvedValue({ modifiedCount: 1 });
    const result = await updateUser("1675", { employeeId: 1675 });
    expect(result).toBeTruthy();
  });
  it("should throw app error when update is unsuccessfull", async () => {
    employees.updateOne.mockResolvedValue({ modifiedCount: 0 });
    await expect(updateUser("1675", { employeeId: 1675 })).rejects.toThrow(
      expect.objectContaining({
        statusCode: 400,
        errorCode: "",
        message: "User not found for id - ${id}",
      })
    );
  });
});

describe("getPendingUsers", () => {
  it("should throw error when pending users not found", async () => {
    employees.find.mockResolvedValue([]);
    await expect(getPendingUsers()).rejects.toThrow(
      expect.objectContaining({
        statusCode: 200,
        errorCode: "",
        message: "No more pending employees found",
      })
    );
  });
  it("should throw error when pending users not found", async () => {
    employees.find.mockResolvedValue([{ employeeId: 1675 }]);
    const result = await getPendingUsers();
    expect(result).toEqual([{ employeeId: 1675 }]);
  });
});

describe("updatePendingUser", () => {
  it("should throw error when employee is not found in JSON", async () => {
    await expect(updatePendingUser()).rejects.toThrow(AppError);
  });
  it("should update employee when given a valid status", async () => {
    employees.find.mockResolvedValue([
      {
        employeeId: "1910",
        name: "swetha",
        email: "swetha.prakashan@cdw.com",
        role: "admin",
        password: "test",
        profilePicture: "https://picsum.photos/200/300",
        bio: "orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
        latestDesignation: "consultant",
        cetifications: ["abc", "def", "aaa"],
        experience: 3,
        bu: "software engineering",
        location: "chennai",
        approvalStatus: "rejected",
        timestamp: "2025-02-19T00:00:00.000Z",
      },
    ]);
    employees.updateOne.mockResolvedValue({ modifiedCount: 1 });
    const result = await updatePendingUser("1910", "approved");
    expect(result).toBe("approved");
  });

  it("should call sendmail function when status is rejected", async () => {
    employees.find.mockResolvedValue([
      {
        employeeId: "1910",
        name: "swetha",
        email: "swetha.prakashan@cdw.com",
        role: "admin",
        password: "test",
        profilePicture: "https://picsum.photos/200/300",
        bio: "orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
        latestDesignation: "consultant",
        cetifications: ["abc", "def", "aaa"],
        experience: 3,
        bu: "software engineering",
        location: "chennai",
        approvalStatus: "rejected",
        timestamp: "2025-02-19T00:00:00.000Z",
      },
    ]);
    employees.updateOne.mockResolvedValue({ modifiedCount: 1 });
    const result = await updatePendingUser("1910", "rejected");
    expect(result).toBe("rejected");
    expect(mailUtils.sendMail).toHaveBeenCalled();
  });

  it("should throw error when invalid status is givern", async () => {
    await expect(updatePendingUser("1910", "abc")).rejects.toThrow(
      expect.objectContaining({
        statusCode: 400,
        errorCode: "",
        message: "invalid status received for approval",
      })
    );
  });
});
