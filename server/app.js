
// Requiring module
const express = require('express');
const mongoose = require("mongoose");
 
// Creating express object
const app = express();
 
// Handling GET request
app.get('/api', (req, res) => { 
    res.json({ message: "ToothFerry API is running!"})
}) 

// Set URI to connect to
const mongoURI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/ToothFerry";
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose
    .connect(mongoURI)
    .then(function () {
        console.log(`Connected to MongoDB with URI: ${mongoURI}`);
    })
    .catch(function (err) {
        if (err) {
            console.error(`Failed to connect to MongoDB with URI: ${mongoURI}`);
            console.error(err.stack);
            process.exit(1);
        }
        console.log(`Connected to MongoDB with URI: ${mongoURI}`);
    });
 
app.listen(port, function (err) {
    if (err) throw err;
    console.log(`Express server listening on port ${port}`);
    console.log(`Backend: http://localhost:${port}/api/`);
    });


  