const express = require("express");
const authRouter = require("./routers/authRouters");
const tasksRouter = require("./routers/tasksRouter");
const { PATH, TASKS } = require("./constants");
const errorHandler = require("./middleware/errorHandler");
const { authoriseUser } = require("./middleware/authoriseUser");
// require("dotenv").config();

const app = express();

app.use(express.json());
app.use(PATH, authRouter);
app.use(TASKS, authoriseUser, tasksRouter);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`App is listening at port ${process.env.PORT}`);
});
