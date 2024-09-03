const AppError = require("../AppError");
const { loginController, registerController } = require("../controllers/authController");
const authServices = require("../services/authServices");

jest.mock('../services/authServices', () => ({
    loginServices: jest.fn(),
    registerServices: jest.fn(),
}));

describe("loginController", () => {
    let req, res, next;
    beforeEach(() => {
        req = {
            body: {username: 'pooja', password: 'test'},
        }
        res = {
            status: jest.fn().mockReturnThis(),
            send:  jest.fn(),
        }
        next = jest.fn();
    })
    it('should return nothing when no reponse is returned', async() => {
        await loginController(req, res, next);
        expect(res.status).not.toHaveBeenCalled();
        expect(res.send).not.toHaveBeenCalled();
    })
    it('should call res send & status with login success message', async() => {
        authServices.loginServices.mockReturnValue('token')
        await loginController(req, res, next);
        expect(authServices.loginServices).toHaveBeenCalledWith(req.body)
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith({ status: 200, message: "login successfull", token: 'token' });
    })
    it('should call next function when login services throws an error', async() => {
        const error = new AppError(404,
            "Custom test error",
            "ERROR")
        authServices.loginServices.mockRejectedValue(error);
        await loginController(req, res, next);
        expect(next).toHaveBeenCalledWith(error)
    })
});


describe('registerController', () => {
    let req, res, next;
    beforeEach(() => {
        req = {
            body: {username: 'pooja', password: 'test'},
        }
        res = {
            status: jest.fn().mockReturnThis(),
            send:  jest.fn(),
        }
        next = jest.fn();
    })
    it('should return nothing when no reponse is returned', async() => {
        await registerController(req, res, next);
        expect(res.status).not.toHaveBeenCalled();
        expect(res.send).not.toHaveBeenCalled();
    })
    it('should call res send and status on successfull register', async() => {
        authServices.registerServices.mockReturnValue({user: 'pooja'});
        await registerController(req, res, next);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.send).toHaveBeenCalledWith({ status: 201, message: "User registered successfully" });
    })

    it('should call next when register services throws error', async() => {
        const error = new AppError(404,
            "Custom test error",
            "ERROR")
        authServices.registerServices.mockRejectedValue(error);
        await registerController(req, res, next);
        expect(next).toHaveBeenCalledWith(error)
    })
})