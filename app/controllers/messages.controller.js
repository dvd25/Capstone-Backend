const Messages = require("../models/messages.model.js");

// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request  
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    // Create a new product 
    const message = new Messages({
        userId: req.body.userId,
        description: req.body.description,
        email: req.body.email,
        name: req.body.name,
        number: req.body.number,
        status: "unreviewed"
    });
    // Save product in the database  
    Messages.create(message, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred during creation."
            });
        else res.status(200).send(data);
    });
};

// Retrieve all messages from database.
exports.findAll = (req, res) => {
    Messages.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "There are no entries in the messages Table."
            });
        else res.status(200).send(data);
    });
};

exports.findOne = (req, res) => {
    const id = Number(req.params.id); 
    Messages.findById(id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
            res.status(404).send({
                message: `Couldn't find message with id ${req.params.id}.`
            })} else
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieval"
            })} else res.status(200).send(data);
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

    Messages.updateById(
        req.params.id,
        new Messages(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Couldn't find message with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating message with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

exports.updateStatusOnly = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    console.log(req.body);

    Messages.updateByIdStatusOnly(
        req.params.id,
        new Messages(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Couldn't find message with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating message with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    //deletes one by one

    Messages.deleteById(req.params.id,
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Could not find message with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Could not find message with id " + req.params.id
                    });
                }
            } else res.status(200).send({ message: "successfully deleted" });
        }
    );
};

exports.deleteAll = (req, res) => {
    //truncate tables it also reinitializes the auto increment primary key back to one
    Messages.truncateProducts(
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
            } else res.send({ message: "successfully deleted all message" });
        }
    );
};


