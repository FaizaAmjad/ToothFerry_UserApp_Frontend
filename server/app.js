
// Requiring module
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require("mongoose");
var userRoutes = require('./routes/users');
const usersControllers = require("./routes/usersControllors");
const dentistsControllers = require("./routes/dentistsControllers");
const clinicsControllers = require("./routes/clinics");
const morgan = require("morgan");
const path = require("path");
const history = require("connect-history-api-fallback");
const Authentication = require("./routes/AuthenticationController");
const authorizationMiddleware = require("./middlewares/AuthorizationMiddleware");
const methodOverride = require("method-override");
const hateoasLinker = require("express-hateoas-links");
// Creating express object
const app = express();

app.use(methodOverride("X-HTTP-Method-Override"));
app.use(hateoasLinker);
app.use(morgan("dev"));
 
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// Handling GET request
app.get('/api', (req, res) => { 
    res.json({ message: "ToothFerry API is running!"})
}) 
app.use("/api/v1/auth", Authentication);
app.use("/api/v1/users", authorizationMiddleware, usersControllers);
app.use("/api/v1/dentists", authorizationMiddleware, dentistsControllers);
app.use("/api/v1/clinics", clinicsControllers);
app.use('/', userRoutes)




// Catch all non-error handler for api (i.e., 404 Not Found)
app.use("/api/*", function (req, res) {
    res.status(404).json({ message: "Not Found" });
  });
  var root = path.normalize(__dirname + "/..");
var client = path.join(root, "client", "dist");
app.use(express.static(client));

  app.use(history());

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
    console.log(`Backend: http://localhost:${port}/api/v1`);
    console.log(`Frontend (production): http://localhost:${port}/`);
    });


  