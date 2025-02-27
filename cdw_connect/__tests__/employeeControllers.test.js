const AppError = require("../AppError");
const {
  getPendingUsersController,
  signupEmployeeController,
  signinEmployeeController,
  updatePendingUserController,
  updateUserProfileController,
} = require("../controllers/employee.controllers");
const employeeServices = require("../services/employee.services");
const responseUtils = require("../utils/response.utils");
const passport = require("../middleware/passport.mIddleware");
const { query } = require("express");

jest.mock("../services/employee.services", () => ({
  getPendingUsers: jest.fn(),
  signupEmployee: jest.fn(),
  signinEmployee: jest.fn(),
  updatePendingUser: jest.fn(),
  updateUser: jest.fn(),
}));

jest.mock("../utils/response.utils", () => ({
  setResponse: jest.fn(),
}));

jest.mock("../middleware/passport.mIddleware", () => ({
  authenticate: jest.fn(),
}));

describe("getPendingUsersController", () => {
  let req, res, next;
  beforeEach(() => {
    next = jest.fn();
  });

  it("should call setresponse when result is received", async () => {
    employeeServices.getPendingUsers.mockReturnValue([
      { id: 1675, email: "test" },
    ]);
    await getPendingUsersController(req, res, next);
    expect(responseUtils.setResponse).toHaveBeenCalledWith(
      res,
      200,
      true,
      false,
      "Fetched pending employees successfully",
      [{ id: 1675, email: "test" }]
    );
  });

  it("it should call next function when error is thrown", async () => {
    const error = new AppError(404, "Custom test error", "ERROR");
    employeeServices.getPendingUsers.mockRejectedValue(error);
    await getPendingUsersController(req, res, next);
    expect(next).toHaveBeenCalledWith(error);
  });
});

describe("signupEmployeeController", () => {
  let req, res, next;
  beforeEach(() => {
    req = {
      body: { username: "pooja", password: "test" },
    };
    next = jest.fn();
  });
  it("should call setresponse when result is received", async () => {
    employeeServices.signupEmployee.mockReturnValue([
      { id: 1675, email: "test" },
    ]);
    await signupEmployeeController(req, res, next);
    expect(responseUtils.setResponse).toHaveBeenCalledWith(
      res,
      201,
      true,
      false,
      "Signed in sucessfully, wait for approval",
      [{ id: 1675, email: "test" }]
    );
  });
});

describe("signinEmployeeController", () => {
  let req, res, next;
  beforeEach(() => {
    req = {
      user: { username: "pooja", password: "test" },
    };
    next = jest.fn();
  });
  it("should call setresponse when result is received", async () => {
    employeeServices.signinEmployee.mockReturnValue([
      { id: 1675, email: "test" },
    ]);
    passport.authenticate.mockReturnValue([{ id: 1675, email: "test" }]);
    await signinEmployeeController(req, res, next);
    expect(passport.authenticate).toHaveBeenCalled();
  });
});

describe("updateUserProfileController", () => {
  let req, res, next;
  beforeEach(() => {
    next = jest.fn();
    req = {
      params: {
        employeeId: 122,
      },
      query: {
        approvalStatus: true,
      },
    };
  });

  it("should call setresponse when result is received", async () => {
    employeeServices.updatePendingUser.mockReturnValue([
      { id: 1675, email: "test" },
    ]);
    await updatePendingUserController(req, res, next);
    expect(employeeServices.updatePendingUser).toHaveBeenCalled();
    expect(responseUtils.setResponse).toHaveBeenCalledWith(
      res,
      200,
      true,
      false,
      "status updated successfully",
      [{ id: 1675, email: "test" }]
    );
  });

  it("it should call next function when error is thrown", async () => {
    const error = new AppError(404, "Custom test error", "ERROR");
    employeeServices.updatePendingUser.mockRejectedValue(error);
    await updatePendingUserController(req, res, next);
    expect(next).toHaveBeenCalledWith(error);
  });
});

describe("updateUserProfileController", () => {
  let req, res, next;
  beforeEach(() => {
    next = jest.fn();
    req = {
      param: {
        employeeId: 122,
      },
      body: {},
    };
  });

  it("should call setresponse when result is received", async () => {
    employeeServices.updateUser.mockReturnValue([{ id: 1675, email: "test" }]);
    await updateUserProfileController(req, res, next);
    expect(employeeServices.updateUser).toHaveBeenCalled();
    expect(responseUtils.setResponse).toHaveBeenCalledWith(
      res,
      200,
      true,
      false,
      "status updated successfully",
      [{ id: 1675, email: "test" }]
    );
  });

  it("it should call next function when error is thrown", async () => {
    const error = new AppError(404, "Custom test error", "ERROR");
    employeeServices.updateUser.mockRejectedValue(error);
    await updateUserProfileController(req, res, next);
    expect(next).toHaveBeenCalledWith(error);
  });
});
