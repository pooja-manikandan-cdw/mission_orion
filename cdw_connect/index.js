const express = require("express");
const passport = require("./middleware/passport.mIddleware");
const cookieSession = require("cookie-session");
const employeeRoutes = require("./routes/employee.route");
const postRoutes = require("./routes/post.routes");
const { sendMail } = require("./utils/mailer.utils");
require("dotenv").config();
const connection = require("./db");
const errorHandler = require("./middleware/errorHandler.middleware");
const { authorizeUser } = require("./middleware/authorizeUser.middleware");

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
app.use("/post", authorizeUser, postRoutes);

app.use(errorHandler);

// sendMail(
//   "test email",
//   "pooja17122@gmail.com",
//   `<!doctype html>
//     <html ⚡4email>
//       <body>
//       <h1>heading</h1><br><br>
//         <p>some random content</p><br>
//         <p>another random contwnet</p>
//       </body>
//     </html>`
// );

app.listen(process.env.PORT, () => {
  console.log(`App is listening at port ${process.env.PORT}`);
});

connection.once("open", () => {
  console.log("Connection available to use");
});
