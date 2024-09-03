const bcrypt = require("bcrypt");
const { encryptPassword, decryptPassword } = require("../utils/dataEncryptionUtils");

jest.mock('bcrypt', () => ({
    hashSync: jest.fn().mockReturnValue("hashedpassword"),
    compareSync: jest.fn().mockReturnValue(true)
}))

describe('testing encryptPassword', () => {
    it('should return hashed password when a password is received', () => {
        expect(encryptPassword("test")).toEqual("hashedpassword")
    })
})

describe('testing compareSync', () => {
    it('should return hashed password when a password is received', () => {
        expect(decryptPassword("test")).toBeTruthy();
    })
})