const mongoose = require("mongoose");

const DB_URL =
  "mongodb+srv://pooja17122:pooja@cluster0.mp5ub.mongodb.net/cdw_connect";
const CONNECTION_PARAMS = {};

const connection = mongoose.connection;

// console.log("cone", connection);
mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log("Error while connecting to Db", err);
  });

module.exports = connection;
