const router = require("express").Router();
const Slot = require("../schemas/slots.js");

// The following endpoints are just for future implementations.
// Once the authentication method is created, we can work on the endpoints.

/**
 * Get /slots
 * @summary Returns all slots
 * @return {object} Successful Response: 200
 * @return {object} Slots not found: 404
 */
router.get("/", function(req, res){
    res.status(501).response("TODO")
})

/**
 * Get /slots/{id}
 * @summary Returns a certain slot by id
 * @return {object} Successful Response: 200
 * @return {object} Slot not found: 404
 */
router.get("/:id", function(req, res){
    res.status(501).response("TODO")
})

/**
 * Post /slots
 * @summary Creates a new slot
 * @return {object} Successful Request (Slot created): 201
 * @return {object} Bad Request Response: 400
 */
router.get("/", function(req, res){
    res.status(501).response("TODO")
})

/**
 * Delete /slots/{id}
 * @summary Delete a certain slot by using id
 * @return {object} Successful response: 204
 * @return {object} Not Authorized (Not logged in): 401
 * @return {object} No permission to delete the account: 403
 * @return {object} Slot with the id does not exist: 404
 */
router.delete("/:id", function(req, res){
    res.status(501).response("TODO")
})

module.exports = router;