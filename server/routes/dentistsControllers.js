const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Dentist = require("../schemas/dentists.js");
const bcrypt = require("bcryptjs");
const { flatMap, uniq } = require("lodash");
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
  const dentists = await Dentist.find(filters).catch((err) => {
    err.status = 422;
    next(err);
  });
  res.status(200).json(dentists);
});

router.get("/me", async (req, res, next) => {
  try {
    const id = req.dentistid;

    const dentist = await Dentist.findById(id);
    if (dentist == null) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.status(200).json(dentist);
    }
  } catch (error) {
    error.status = 403;
    next(error);
  }
});


router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;

    const dentist = await Dentist.findById(id);
    if (dentist == null) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.status(200).json(dentist);
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
      var new_dentist = new Dentist(req.body);
      new_dentist.password = hashedPass;
      new_dentist
        .save()
        .then(() => res.status(201).json(new_dentist))
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
    const dentist = await Dentist.findById(id);

    if (!dentist) {
      return res.status(404).json({ message: "User not found" });
    }

    dentist.firstName = req.body.firstName;
    dentist.email = req.body.email;
    dentist.lastName = req.body.lastName;

    await dentist.save();

    res.status(200).json(dentist);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async function (req, res, next) {
  try {
    const id = req.params.id;
    const dentist = await Dentist.findById(id);

    if (!dentist) {
      return res.status(404).json({ message: "User not found" });
    }

    if (req.body.firstName) {
        dentist.firstName = req.body.firstName;
    }
    if (req.body.email) {
        dentist.email = req.body.email;
    }
    if (req.body.lastName) {
        dentist.lastName = req.body.lastName;
    }

    await dentist.save();

    res.status(200).json(dentist);
  } catch (error) {
    next(error);
  }
});

//DELETE
router.delete("/:id", async function (req, res, next) {
  try {
    var id = req.params.id;
    const dentist = await Dentist.findByIdAndDelete({ _id: id });

    if (dentist === null) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(204).json({ message: "User deleted" });
  } catch (err) {
    next(err);
  }
});

router.delete("/", async function (req, res, next) {
  try {
    await Dentist.deleteMany({});
    // Success
    res.status(204).json({ message: "Deleted all users" });
  } catch (error) {
    console.error(error); // Failure
    next(error);
  }
});

module.exports = router;
