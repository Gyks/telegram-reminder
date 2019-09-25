let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('user_timers');

// table for notifications.
// id, date recived, execution date, status: 0 / 1, message on exec

db.serialize(()=>{
    db.run(
        `CREATE TABLE IF NOT EXISTS tg_tasks(
            task_id INTEGER PRIMARY KEY,
            date_recived TEXT NOT NULL,
            date_execute TEXT NOT NULL,
            status BOOLEAN,
            message TEXT)`);
});

function addTask(date_recived, date_execute, message) {
    db.run(`INSERT INTO tg_tasks(date_recived, date_execute, status, message) VALUES($date_recived, $date_execute, $status, $message)`, {
        $date_recived: date_recived,
        $date_execute: date_execute,
        $status: false,
        $message: message,
    });
}

function checkTasks() {
 // must return an array of ready for sending messages
}

function deleteTask(id) {
// must delete task if it's done and send already (dates check, status check)
}
// addTask("321", "3123", "zaazaa");
module.exports.addTask = addTask;