const mongoURI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/ToothFerry";

const mongoose = require("mongoose");
const User = require("../schemas/users");
const Dentist = require("../schemas/dentists");
const Slot = require("../schemas/slots");
const Clinic = require("../schemas/clinics");

async function insertData() {
    await mongoose.connect(mongoURI);
    console.log(`Connected to MongoDB with URI: ${mongoURI}`);

    await mongoose.connection.dropDatabase();
    console.log("DB dropped");
    
    // Test data for each schemas
    await new Slot({ 
        time: "2023-12-01T13:00:00"
     }).save();
    console.log("Inserted a test slot");
    const slotId = slot._id;

    await new Dentist({ 
        name: "Dentist1",
        email: "dentist@dentist.com",
        password: "",
        slot: [slotId]
     }).save();
    console.log("Inserted a test dentist");
    const dentistId = dentist._id;

    await new Clinic({ 
        clinicName: "Test Clinic",
        address: "Västra Hamngatan 5, 411 17 Göteborg",
        workingDentists: [dentistId]
     }).save();
    console.log("Inserted a test clinic");

    await new User({
        firstName: "Test",
        lastName: "User",
        birthDay: "2023-11-06",
        postCode: 47141,
        email: "example@example.com",
        password: "",
        admin: false  
    }).save();
    console.log("Inserted test user");
    await mongoose.disconnect();
    process.exit(0);
}

(async function () {
    try {
        await insertData();
    } catch (err) {
        console.error(`Failed to connect to MongoDB with URI: ${mongoURI}`);
        console.error(err.stack);
        process.exit(1);
    }
});