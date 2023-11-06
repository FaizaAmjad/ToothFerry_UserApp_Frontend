let mongoose = require("mongoose");

// Variables
let mongoURI = process.env.MONGODB_URI;

// Checking to see if the MONGODB_URI is entered
if (!mongoURI) {
    console.error("MongoDB_URI is required to drop the database, but is not entered.");
    process.exit(1);
}

// Drop database
mongoose.connect(mongoURI).catch(function (err) {
    // The provided URI is wrong or does not exist.
    if (err) {
        console.error(`Failed to connect to MongoDB with URI: ${mongoURI}`);
        console.error(err.stack);
        process.exit(1);
    }
});

// Successful case
mongoose.connection.dropDatabase().then(function () {
    console.log(`Dropped database: ${mongoURI}`);
    process.exit(0);
});