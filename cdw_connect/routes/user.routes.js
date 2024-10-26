const express = require("express");
const passport = require("passport");

const router = express.Router();

// router.post("/signup", registerUserController);

router.post("/login", (req, res, next) => {
  console.log("rev=ceived request");
  passport.authenticate("local", (err, user) => {
    console.log("user", user);
    if (err) {
      console.log("err", err);
    }
    req.logIn(user, (err) => {
      if (err) next(err);
      res.status(200).send({ data: user });
    });
  })(req, res, next);
});

router.get("/pending");

router.patch("/pending/:employeeId");

module.exports = router;
