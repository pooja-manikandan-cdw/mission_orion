const superTest = require("supertest");
const fs = require("fs");
const jwt = require("jsonwebtoken");
// const {expect} = require("@jest/globals");
const { loginServices, registerServices } = require("../services/authServices");
const fileSystem = require("../utils/fileSystemUtils");
const dataUtils = require("../utils/dataEncryptionUtils");
const AppError = require("../AppError");

jest.mock("../utils/dataEncryptionUtils", () => ({
  decryptPassword: jest.fn().mockReturnValue(true),
  encryptPassword: jest.fn().mockReturnValue("hashedPassword"),
}));
jest.mock("../utils/fileSystemUtils", () => ({
  writeIntoFile: jest.fn(),
  readFromFile: jest.fn().mockReturnValue([
    {
      username: "pooja",
      password: "welcome",
    },
  ]),
}));

const jwtSignSpy = jest.spyOn(jwt, "sign").mockReturnValue("testToken");

describe("login services", () => {
  it("should throw an error when username or password is missing in request body", async () => {
    expect(loginServices({})).rejects.toThrow(AppError);
    expect(loginServices({ password: "test" })).rejects.toThrow(AppError);
    expect(loginServices({ username: "test" })).rejects.toThrow(
      expect.objectContaining({
        statusCode: 400,
        errorCode: "MISSING_PAYLOAD",
        message: "Recheck missing payload",
      })
    );
  });

  it("should throw an error for invalid credentials when user is not found", () => {
    expect(
      loginServices({ username: "test", password: "test" })
    ).rejects.toThrow(
      expect.objectContaining({
        statusCode: 404,
        errorCode: "USER_NOT_FOUND",
        message: "Invalid credentials user not found",
      })
    );
  });

  it("should throw an error when password is incorrect", () => {
    dataUtils.decryptPassword.mockReturnValue(false);
    expect(
      loginServices({ username: "pooja", password: "test" })
    ).rejects.toThrow(
      expect.objectContaining({
        statusCode: 404,
        errorCode: "USER_NOT_FOUND",
        message: "Invalid credentials password incorrect",
      })
    );
  });

  it("should return token on successfull login", async () => {
    dataUtils.decryptPassword.mockReturnValue(true);
    const result = await loginServices({
      username: "pooja",
      password: "welcome",
    });
    expect(result).toEqual("testToken");
  });
});

describe("testing registerServices", () => {
  it("should throw an error when username or password is missing in request body", async () => {
    expect(
      registerServices({ password: null, username: null })
    ).rejects.toThrow(AppError);
    expect(
      registerServices({ username: null, password: "test" })
    ).rejects.toThrow(AppError);
    expect(
      registerServices({ username: "test", password: null })
    ).rejects.toThrow(
      expect.objectContaining({
        statusCode: 400,
        errorCode: "MISSING_PAYLOAD",
        message: "Recheck missing payload",
      })
    );
  });

  it("should throw an error when user already exists", () => {
    expect(
      registerServices({ username: "pooja", password: "test" })
    ).rejects.toThrow(
      expect.objectContaining({
        statusCode: 400,
        errorCode: "USER_EXIST",
        message: "User already exist",
      })
    );
  });
  it("should return users on successfull register", async () => {
    const results = await registerServices({
      username: "test",
      password: "test",
    });
    expect(results).toStrictEqual([
      { username: "pooja", password: "welcome" },
      { username: "test", password: "hashedPassword" },
    ]);
  });
  it("should return users on successfull register", async () => {
    fileSystem.readFromFile.mockReturnValue(null);
    const results = await registerServices({
      username: "test",
      password: "test",
    });
    expect(results).toStrictEqual([
      { username: "test", password: "hashedPassword" },
    ]);
  });
});
