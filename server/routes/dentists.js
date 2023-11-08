const router = require("express").Router();
const Dentists = require("../schemas/dentists.js");

// The following endpoints are just for future implementations.
// Once the authentication method is created, we can work on the endpoints.

/**
 * Get /dentists
 * @summary Returns all dentists
 * @return {object} Successful Response: 200
 * @return {object} Dentists not found: 404
 */
router.get("/", function (req, res) {
    res.status(501).send("TODO")
})

/**
 * Get /dentists/{id}
 * @summary Returns a specific dentist through id
 * @return {object} Successful Response: 200
 * @return {object} Dentist not found: 404
 */
router.get("/:id", function (req, res) {
    res.status(501).send("TODO")
})

/**
 * Post /dentists/login
 * @summary Logs in a dentist
 * @return {object} Successful response: 200
 * @return {object} Bad request response: 400
 */
router.post("/login", function (req, res) {
    res.status(501).send("TODO")
})

/**
 * Post /dentists/signup
 * @summary Signup a dentist to the system
 * @return {object} Successful response (Account Created): 201
 * @return {object} Bad request response: 400
 */
router.post("/signup", function (req, res) {
    res.status(501).send("TODO")
})

/**
 * Patch /dentists/{id}
 * @summary Partially change the dentist information.
 * @return {object} Successful response: 200
 * @return {object} Bad request response: 400
 * @return {object} Not Authorized (Like not logged in): 401
 * @return {object} Dentist with the id does not exist: 404
 */
router.patch("/:id", function (req, res) {
    res.status(501).send("TODO")
})

/**
 * Delete /dentists/{id}
 * @summary Delete personal account of a dentist
 * @return {object} Successful response: 204
 * @return {object} Not Authorized (Not logged in): 401
 * @return {object} No permission to delete the account: 403
 * @return {object} Dentist with the id does not exist: 404
 */
router.delete("/:id", function (req, res) {
    res.status(501).send("TODO")
})

// In case we decide to implement an admin account, we should finish these too.

/**
 * Delete /dentists
 * @summary Delete personal account of a dentists
 * @return {object} Successful response: 200
 * @return {object} Not authorized: 403
 * 
 */
router.delete("/", function (req, res) {
    res.status(501).send("TODO")
})

module.exports = router;
