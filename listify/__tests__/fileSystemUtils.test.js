const fs = require("fs");
const { readFromFile, writeIntoFile } = require("../utils/fileSystemUtils");

jest.mock('fs', () => ({
    readFileSync: jest.fn().mockReturnValue('[{"test": "test"}]'),
    writeFileSync: jest.fn().mockImplementation(() => {}),
}))


describe('testing readFromFile', () => {
    it('should return data read fom file', () => {
        const res = readFromFile();
        expect(res).toEqual([{'test': 'test'}])
    })
    it('should return empty array when no data found from file', () => {
        fs.readFileSync.mockReturnValue([])
        const res = readFromFile();
        expect(res).toEqual([])
    })
})

describe('testing writeIntoFile', () => {
    it('should write into file', () => {
        const res = writeIntoFile();
        expect(fs.writeFileSync).toHaveBeenCalled();
    })
})