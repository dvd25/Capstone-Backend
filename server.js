const express = require("express");
const cors = require("cors");
const session = require("express-session")
// const sqlLibrary = require("./app/libraries/sqlTable")
const app = express();

var corsOptions = {
    origin: "http://localhost:3000" //cross origin
};

app.use(cors(corsOptions));
// parse requests of content-type - application/json

app.use(session({
	secret: 'secret', //for learning purposes
	resave: true,
	saveUninitialized: false,
}));

app.use(express.json()); /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); /* bodyParser.urlencoded() is deprecated */

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Mysql Nodejs Connection application." });
});

// require("./app/routes/products.route")(app);
require("./app/routes/users.route")(app);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
