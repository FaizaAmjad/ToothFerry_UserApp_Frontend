const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * firstName: The first name of the user
 * lastName: The last name of the user
 * birthDay: The birth date of the user
 * postCode: The simple address of the user (Used to find the nearest dentist)
 * email: User email
 * password: User password (hashed)
 * theme: Persisted theme setting for frontend
 */
const userSchema = new Schema({
    firstName: {
        type: String,
        required: [true, "First name must be entered"]
    },
    lastName: {
        type: String,
        required: [true, "Last name must be entered"]
    },
    birthDay: {
        type: Date,
        required: [true, "Birth date must be entered"]
    },
    postCode: {
        type: Number,
        required: true,
        validate: {
            validator: function(val) {
                return val.toString().length === 5
            },
            message: val => `${val.value} has to be 5 digits`
        }
    },
    email: {
        type: String,
        required: [true, "Email must be set"],
        unique: true,
        // regex source: https://regexr.com/3e48o
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "This is not a valid email address"],
    },
    password: { type: String, required: [true, "Password must be set"] },
    admin: { type: Boolean, default: false },
    theme: { type: String, enum: ["light", "dark"], default: "light" },
});

module.exports = mongoose.model("User", userSchema);
