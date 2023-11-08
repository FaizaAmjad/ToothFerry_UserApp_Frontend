const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Slots = require("./slots.js");

/**
 * name: The name of the dentist
 * email: The email address of the dentist
 * password: The password of the dentist (hashed)
 * slot: The time slot of the dentist
 */
const dentistSchema = new Schema({
    firstName: {
        type: String,
        required: [true, "Name must be entered"]
    },
    lastName: {
        type: String,
        required: [true, "Name must be entered"]
    },
    email: {
        type: String,
        required: [true, "Email must be set"],
        unique: true,
        // regex source: https://regexr.com/3e48o
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "This is not a valid email address"],
    },
    password: { 
        type: String,
        required: [true, "Password must be set"]
    },
    slot: [
        {
            type: Schema.Types.ObjectId,
            ref: "Slots",
        },
    ],
    
});

module.exports = mongoose.model("Dentists", dentistSchema);