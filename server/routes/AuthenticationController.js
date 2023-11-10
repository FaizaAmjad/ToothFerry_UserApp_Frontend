var express = require("express");
var mongoose = require("mongoose");
var router = express.Router();
var bcrypt = require("bcryptjs");
const encryption = require("../utilities/crypto-utils");
const User = require("../schemas/users.js");
const Dentist = require("../schemas/dentists.js");

router.post("/register/", function (req, res, next) {
  bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
    if (err) {
      res.status(401).json({
        err: "no password provided",
      });
    } else {
      var new_user = new User(req.body);
      new_user.password = hashedPass;
      new_user
        .save()
        .then(() => res.status(201).json(new_user))
        .catch((err) => {
          err.status = 422;
          next(err);
        });
    }
  });
});



router.post("/login", async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user === null) {
      res.status(404).json({ message: "User not found " });
      return;
    }

    const ispasswordmatched = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (ispasswordmatched) {
      res
        .status(200)
        .json({ token: encryption.encryptToken(user._id.toString()) });
      return;
    }

    res.status(404).json({ message: "User not matched" });
  } catch (error) {
    error.status = 422;
    next(error);
  }
});




module.exports = router;
