const sql = require("./db.js")

// constructor
const Task = function (task) {
    this.category = task.category;
    this.description = task.description;
    this.comments = task.comments;
    this.status = task.status;
    this.assignedTo = task.assignedTo;
    this.priority = task.priority;
};

Task.create = (newTask, result) => {
    sql.query("INSERT INTO tasks SET ?", newTask, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("Created task: ", { id: res.insertId, ...newTask });
        result(null, { id: res.insertId, ...newTask }); //return no error and new task
    });
};

Task.findById = (id, result) => {
    sql.query(`SELECT * FROM tasks WHERE taskId = ?`,id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("Found tasks: ", res[0]);
            result(null, res[0]);
            return;
        }
        // Could not find the product with supplied id
        result({ kind: "not_found" }, null);
    });
};

Task.getAll = (result) => {
    sql.query(`SELECT * FROM tasks`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log(`Found ${res.length} tasks`);
            result(err, res);
            return;
        }
        result({ kind: "not_found" }, null);
    });
};

Task.updateById = (id, task, result) => { //this updates every field
    sql.query(
        "UPDATE tasks SET category = ?, description = ?, comments = ?, status = ?, assignedTo = ?, priority=? WHERE taskId = ?",
        [task.category, task.description, task.comments, task.status, task.assignedTo, task.priority, id],
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

            console.log("updated task: ", { id: id, ...task });
            result(null, { id: id, ...task });
        }
    );
};

Task.deleteById = (id, result) => {
    sql.query(`DELETE FROM tasks WHERE taskId = ${id}`, (err, res) => {
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
        console.log(`Deleted task successfully with id = ${id}`);
        result(null, null);
    }
    )
}


Task.truncateProducts = (result) => {
    sql.query(`TRUNCATE TABLE tasks`, (err, res) => {
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
        console.log("Deleted all users sucessfully ");
        result(null, null);
    }
    )
}


module.exports = Task;