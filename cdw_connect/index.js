const express = require("express");
const passport = require("./middleware/passport.mIddleware");
const cookieSession = require("cookie-session");
const employeeRoutes = require("./routes/employee.route");
const postRoutes = require("./routes/post.routes");
require("dotenv").config();
const connection = require("./db");
const errorHandler = require("./middleware/errorHandler.middleware");
const { authorizeUser } = require("./middleware/authorizeUser.middleware");
require("./schedulers/appMaintenance");

const app = express();

app.use(
  cookieSession({
    name: "auth",
    keys: ["123234", "3223432"],
    maxAge: 60 * 60 * 24,
  })
);

app.use(express.json());
app.use(passport.initialize());

app.use("/", employeeRoutes);
app.use("/post", postRoutes);
// app.use("/post", authorizeUser, postRoutes);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`App is listening at port ${process.env.PORT}`);
});

connection.once("open", () => {
  console.log("Connection available to use");
});
