const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { flatMap, uniq } = require("lodash");
const User = require("../schemas/users.js");
// GET
router.get("/", async function (req, res, next) {
  const filterfirstName = req.query.firstName;
  const filterlastName = req.query.lastName;
  const filteremail = req.query.email;
  const filterbirthDay = req.body.birthDay;

  // Constructing filters object
  const filters = {};
  if (filterlastName) {
    filters.lastName = filterlastName;
  }
  if (filteremail) {
    filters.email = filteremail;
  }
  if (filterfirstName) {
    filters.firstName = filterfirstName;
  }
  if (filterbirthDay) {
    filters.birthDay = filterbirthDay;
  }

  // Sending filters object to the find function
  const users = await User.find(filters).catch((err) => {
    err.status = 422;
    next(err);
  });
  res.status(200).json(users);
});

router.get("/me", async (req, res, next) => {
  try {
    const id = req.userid;

    const user = await User.findById(id);
    if (user == null) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    error.status = 403;
    next(error);
  }
});


router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;

    const user = await User.findById(id);
    if (user == null) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    error.status = 403;
    next(error);
  }
});

router.post("/", function (req, res, next) {
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

// PUT
router.put("/:id", async function (req, res, next) {
  try {
    const id = req.params.id;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.firstName = req.body.firstName;
    user.email = req.body.email;
    user.lastName = req.body.lastName;

    await user.save();

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async function (req, res, next) {
  try {
    const id = req.params.id;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (req.body.firstName) {
      user.firstName = req.body.firstName;
    }
    if (req.body.email) {
      user.email = req.body.email;
    }
    if (req.body.lastName) {
      user.lastName = req.body.lastName;
    }

    await user.save();

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

//DELETE
router.delete("/:id", async function (req, res, next) {
  try {
    var id = req.params.id;
    const user = await User.findByIdAndDelete({ _id: id });

    if (user === null) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(204).json({ message: "User deleted" });
  } catch (err) {
    next(err);
  }
});

router.delete("/", async function (req, res, next) {
  try {
    await User.deleteMany({});
    // Success
    res.status(204).json({ message: "Deleted all users" });
  } catch (error) {
    console.error(error); // Failure
    next(error);
  }
});

module.exports = router;
