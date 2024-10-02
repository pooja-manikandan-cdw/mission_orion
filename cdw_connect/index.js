const express = require("express");
require("dotenv").config();
const connection = require("./db");

const app = express();

app.use(express.json());

app.listen(process.env.PORT, () => {
  console.log(`App is listening at port ${process.env.PORT}`);
});

// connection.once('open', () => {
//   console.log('Connect to DB');
// })
