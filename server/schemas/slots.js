const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * time: The date and time of the registered slot
 * availability: The availability of the registered slot
 */
const slotSchema = new Schema({
    time: {
        type: Date,
        required: [true, "Date and time must be registered"]
    },
    availability: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("Slots", slotSchema);