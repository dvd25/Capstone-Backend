const User = require("../models/users.model.js");
const sql = require("../models/db.js")
const bcrypt = require('bcrypt')
const session = require('express-session')

// Create and Save a new user
exports.create = async (req, res) => {
    // Validate request  
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }



    try {
        //bcrypt password hashing
        //generate and use salt for extra security
        const salt = await bcrypt.genSalt()
        const hash = await bcrypt.hash(req.body.password, salt)
        
        // Create a new product 
        const user = new User({
            role: req.body.role ? req.body.role : "customer",
            membership: req.body.membership ? req.body.membership : "free",
            email: req.body.email,
            password: hash,
            firstName: req.body.firstName,
            lastName: req.body.lastName
        });

        // Save product in the database  
        User.create(user, (err, data) => {
            if (err)
                res.status(500).send({
                    message:
                        err.message || "Some error occurred during creation."
                });
            else res.status(200).send(data);
        });

    } catch (error) { res.status(500).send("Error") }


};

// Retrieve all users from database.
exports.findAll = (req, res) => {
    User.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "There are no entries in the Users Table."
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    const id = Number(req.params.id);
    User.findById(id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Couldn't find product with id ${req.params.id}.`
                })
            } else
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieval"
                })
        } else res.send(data);
    });
}

exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    console.log(req.body);

    User.updateById(
        req.params.id,
        new User(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Couldn't find user with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating user with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    //deletes one by one

    User.deleteById(req.params.id,
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Could not find user with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Could not find user with id " + req.params.id
                    });
                }
            } else res.send({ message: "successfully deleted" });
        }
    );
};

exports.deleteAll = (req, res) => {
    //truncate tables it also reinitializes the auto increment primary key back to one
    User.truncateUsers(
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Nothing to delete.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error deleting all"
                    });
                }
            } else res.send({ message: "successfully deleted all users" });
        }
    );
};



exports.login = (req, res) => {
    //gets all users by a condition
    let email = req.body.email;
	let password = req.body.password;
	// Ensure the input fields exists and are not empty
	if (email && password) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
		sql.query('SELECT * FROM users WHERE email = ?', [email], async function(error, results, fields) {
			// If there is an issue with the query, output the error
			if (error) throw error;
			// If the account exists
			if (results.length > 0) {
				// If successful and found account send an Object with response
                const validPassword = await bcrypt.compare(password, results[0].password);
                //if the hash password comparison returns true
                if (validPassword === true) {
                    //express session middleware that sends current user info when logged in
                    //makes maintaing user states easier
                    //will pass the userInfo data to the front end to use
                    const userInfo = Object.assign({}, {...results[0]})
                    //req.session.user = userInfo;
                    //send console message, a signedIn value for state, and the current sessions userInfo
                    res.status(200).send({message: 'Successfully signed in', signedIn: 'true', userInfo});
                    res.end();
                } else {
                    res.status(401).send({message: 'Incorrect Password', signedIn: 'false'})
                }
				
			} else {
				res.status(404).send({message: 'Email not found'});
			}			
			res.end();
		});
	} else {
		res.status(401).send({message: 'Please enter Email and Password!'});
		res.end();
	}
};



