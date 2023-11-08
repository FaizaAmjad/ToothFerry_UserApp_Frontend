const router = require("express").Router();
const Clinics = require("../schemas/clinics.js");

// The following endpoints are just for future implementations.
// Once the authentication method is created, we can work on the endpoints.

/**
 * Get /clinics
 * @summary Returns all clinics
 * @return {object} Successful Response: 200
 * @return {object} Clinics not found: 404
 */
router.get("/", function(req, res){
    res.status(501).response("TODO")
})

/**
 * Get /clinics/{id}
 * @summary Returns a certain clinic by id
 * @return {object} Successful Response: 200
 * @return {object} Clinic not found: 404
 */
router.get("/:id", function(req, res){
    res.status(501).response("TODO")
})

/**
 * Post /clinics
 * @summary Creates a new clinic
 * @return {object} Successful Request (Clinic created): 201
 * @return {object} Bad Request Response: 400
 */
router.get("/", function(req, res){
    res.status(501).response("TODO")
})

/**
 * Delete /clinics/{id}
 * @summary Delete a certain clinic by using id
 * @return {object} Successful response: 204
 * @return {object} Not Authorized (Not logged in): 401
 * @return {object} No permission to delete the account: 403
 * @return {object} Clinic with the id does not exist: 404
 */
router.delete("/:id", function(req, res){
    res.status(501).response("TODO")
})

// In case we decide to implement an admin account, we should finish these too.

/**
 * Delete /clinics
 * @summary Delete every clinics
 * @return {object} Successful response: 200
 * @return {object} Not authorized: 403
 */
router.delete("/", function(req, res){
    res.status(501).response("TODO")
})

module.exports = router;