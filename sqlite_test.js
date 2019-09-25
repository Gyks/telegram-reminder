let sqlite3 = require("sqlite3").verbose();
let db = new sqlite3.Database("user_timers");

// table for notifications.
// id, date recived, execution date, status: 0 / 1, message on exec

db.serialize(() => {
    db.run(
        `CREATE TABLE IF NOT EXISTS tg_tasks(
            task_id INTEGER PRIMARY KEY,
            date_recived TEXT NOT NULL,
            date_execute TEXT NOT NULL,
            chat_id TEXT NOT NULL,
            status BOOLEAN,
            message TEXT)`
    );
});

function addTask(date_recived, date_execute, message, chat_id) {
    db.run(
        `INSERT INTO tg_tasks(date_recived, date_execute, status, message, chat_id) VALUES($date_recived, $date_execute, $status, $message, $chat_id)`, {
            $date_recived: date_recived,
            $date_execute: date_execute,
            $status: false,
            $message: message,
            $chat_id: chat_id,
        }
    );
}

function checkTasks(sendMessage) {
    let dateNow = new Date();
    db.all(
        "SELECT rowid AS tg_task, date_execute, message, status, chat_id FROM tg_tasks ORDER BY task_id DESC LIMIT 5",
        function(err, rows) {
            rows.forEach(function(row) {
                let taskDate = new Date(row.date_execute);
                if (row.status == 0 && taskDate <= dateNow) {
                    //sendMessage(row.message, chat_id);
                    db.run(
                        "UPDATE tg_tasks SET status = 1 WHERE task_id = ?",
                        row.tg_task,
                        function(err) {
                            console.log(row.message);
                            sendMessage(row.message, row.chat_id);
                        }
                    );
                }
            });
        }
    );
}

module.exports.addTask = addTask;
module.exports.checkTasks = checkTasks;