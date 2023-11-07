const router = require("express").Router();
const User = require("../schemas/users.js");
const bcrypt = require('bcrypt');

// The following endpoints are just for future implementations.
// Once the authentication method is created, we can work on the endpoints.

/**
 * Post /users/login
 * @summary Logs in a user
 * @return {object} Successful response: 200
 * @return {object} Bad request response: 400
 */
router.post("/login", function (req, res) {
    res.status(501).send("TODO")
})

/**
 * Post /users/signup
 * @summary Signup a user to the system
 * @return {object} Successful response (Account Created): 201
 * @return {object} Bad request response: 400
 */
router.post("/signup", function (req, res) {
    const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthday: req.body.birthday,
        postCode: req.body.postCode,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10)
      })
      console.log(newUser);
      newUser.save()
      .then ((err) => {
        if (err) {
            return res.status(400).json({
            title: 'error',
            error: 'Email is already in use.'
            })
        }
        return res.status(200).json({
            title: 'signup success'
        })
      })
})

/**
 * Patch /users/{id}
 * @summary Partially change the user information.
 * @return {object} Successful response: 200
 * @return {object} Bad request response: 400
 * @return {object} Not Authorized (Like not logged in): 401
 * @return {object} User with the id does not exist: 404
 */
router.patch("/:id", function (req, res) {
    res.status(501).send("TODO")
})

/**
 * Delete /users/{id}
 * @summary Delete personal account of a user
 * @return {object} Successful response: 204
 * @return {object} Not Authorized (Not logged in): 401
 * @return {object} No permission to delete the account: 403
 * @return {object} User with the id does not exist: 404
 */
router.delete("/:id", function (req, res) {
    res.status(501).send("TODO")
})

// In case we decide to implement an admin account, we should finish these too.

/**
 * Delete /users
 * @summary Delete personal account of a user
 * @return {object} Successful response: 200
 * @return {object} Not authorized: 403
 * 
 */
router.delete("/", function (req, res) {
    res.status(501).send("TODO")
})

module.exports = router;