let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('user_timers');

// table for notifications.
// id, date recived, execution date, status: 0 / 1, message on exec

db.serialize(() => {
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
    let messages = [];
    let dateNow = new Date();
    db.all("SELECT rowid AS tg_task, date_execute, message, status FROM tg_tasks ORDER BY task_id DESC LIMIT 10", function (err, rows) {
        rows.forEach(function (row) {
            //console.log(row.tg_task + ": " + row.message + " : " + row.status);
            let taskDate = new Date(row.date_execute);
            //console.log(`${taskDate} \n ${dateNow} \n ${taskDate >= dateNow}`);
            if( row.status == 0 && taskDate <= dateNow ) {
                messages.push(row.message);
                //console.log(messages);
                db.run("UPDATE tg_tasks SET status = 1 WHERE task_id = ?", row.tg_task);
            }
        });
    });
    console.log(messages);
    return messages;
}

module.exports.addTask = addTask;
module.exports.checkTasks = checkTasks;
