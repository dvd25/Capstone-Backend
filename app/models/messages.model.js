const sql = require("./db.js")

// constructor
const Message = function (message) {
    this.userId = message.userId;
    this.email = message.email;
    this.description = message.description;
    this.name = message.name;
    this.number = message.number;
    this.status = message.status;
};

Message.create = (newMessage, result) => {
    sql.query("INSERT INTO messages SET ?", newMessage, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("Created task: ", { id: res.insertId, ...newMessage });
        result(null, { id: res.insertId, ...newMessage }); //return no error and new task
    });
};

Message.findById = (id, result) => {
    sql.query(`SELECT * FROM messages WHERE messageId = ?`,id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("Found message: ", res[0]);
            result(null, res[0]);
            return;
        }
        // Could not find the product with supplied id
        result({ kind: "not_found" }, null);
    });
};

Message.getAll = (result) => {
    sql.query(`SELECT * FROM messages`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log(`Found ${res.length} messages`);
            result(err, res);
            return;
        }
        result({ kind: "not_found" }, null);
    });
};

Message.updateById = (id, message, result) => { //this updates every field
    sql.query(
        "UPDATE messages SET userId = ?, email = ?, description = ?, name = ?, number = ?, status =? WHERE messageId = ?",
        [message.userId, message.email, message.description, message.name, message.number, message.status ,id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // If no rows affected then there was nothing found
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated message: ", { id: id, ...message });
            result(null, { id: id, ...message });
        }
    );
};

Message.updateByIdStatusOnly = (id, message, result) => { //this updates every field
    sql.query(
        "UPDATE messages SET status =? WHERE messageId = ?",
        [message.status ,id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // If no rows affected then there was nothing found
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated message: ", { id: id, ...message });
            result(null, { id: id, ...message });
        }
    );
};

Message.deleteById = (id, result) => {
    sql.query(`DELETE FROM messages WHERE messageId = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            // cannot find any affectrows so theres no entry with these params
            result({ kind: "not_found" }, null);
            return;
        }
        console.log(`Deleted message successfully with id = ${id}`);
        result(null, null);
    }
    )
}


Message.truncateProducts = (result) => {
    sql.query(`TRUNCATE TABLE messages`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            // Nothing was deleted should mean there was no entries in the table to delete
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("Deleted all messages sucessfully ");
        result(null, null);
    }
    )
}


module.exports = Message;