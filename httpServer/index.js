const http = require("http");
const fs = require("fs");

http
  .createServer((req, res) => {
    fs.readFile("color_palette.json", { encoding: "utf8" }, (err, data) => {
      if (err) {
        console.log("Error", err);
      }
      if (data) {
        const readData = JSON.parse(data).data
        const randomColors = generateRandomColorPalette(readData, 5)
        fs.writeFile("randomized_color_palette.json", JSON.stringify(randomColors), (err) => {
          if (err) {
            console.log("error in writing", err);
          } else {
              console.log("saved...");
              const result =  fs.readFileSync("randomized_color_palette.json", "utf8")
              res.writeHead(200, {'Content-Type': 'json'});
              res.write(result);
              res.end();
          }
        });
      }
    });
  })
  .listen(3000, () => {
    console.log("app listening on port 3000");
  });


  /**
 * @description to generate random colors using the data received
 * @param {array} data array of data that contains color json
 * @param {number} quantity numbers of items required
 * @param {number} max max limit of the colors array
 * @returns randomized array with the data received
 */
function generateRandomColorPalette(data, quantity) {
  let result = [];
  let max = data.length-1;
  for(let i=0;i<quantity; i++) {
    const index = Math.floor(Math.random() * max) + 1
      result.push(data[index]);
      data=[...data.slice(0, index), ...data.slice(index+1)];
      max--;
  }
  return(result);
}