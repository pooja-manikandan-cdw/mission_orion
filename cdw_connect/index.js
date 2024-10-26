const express = require("express");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const cookieSession = require("cookie-session");
const userRoutes = require("./routes/user.routes");
const { sendMail } = require("./utils/mailer.utils");
require("dotenv").config();
require("./db");

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
app.use(passport.session());

passport.serializeUser((user, done) => {
  console.log("inside serialxe", user);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // logic to find the user by id in our case email
  // if(found) {
  //   return done(null, id)
  // } else {
  //   return done('errr')
  // }
});
passport.use(
  "local",
  new LocalStrategy(
    { passReqToCallback: true },
    (req, username, password, done) => {
      console.log("usernma", username, password);
      // login to validate user
      return done(null, { id: "test" });
    }
  )
);

// passport.use(
//   new LocalStrategy(function (username, password, done) {
//     console.log("usernma", username, password);
//     // User.findOne({ username: username, password: password }, function (err, user) {
//     done(err, user);
//     // });
//   })
// );

app.use("/", userRoutes);

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

// connection.once('open', () => {
//   console.log('Connect to DB');
// })
