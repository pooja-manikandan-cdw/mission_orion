const mongoose = require("mongoose");

const DB_URL =
  "mongodb+srv://pooja17122:pooja@cluster0.mp5ub.mongodb.net/cdw_connect";
const CONNECTION_PARAMS = {};

const connection = mongoose.connection;
mongoose.set('debug', true);

// console.log("cone", connection);
mongoose
  .connect(DB_URL, {
    serverSelectionTimeoutMS: 60000,
    socketTimeoutMS: 60000,
  })
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log("Error while connecting to Db", err);
  });

module.exports = connection;
