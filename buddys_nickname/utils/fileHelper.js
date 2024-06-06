const fs = require('fs');

const readFile = (fileName) => {
    const data = fs.readFileSync(fileName, { encoding: "utf8" });
    return data;
}

const writeFile = (fileName, data) => {
    fs.writeFileSync(fileName, JSON.stringify(data));
    return true;
}

module.exports = { readFile, writeFile };
