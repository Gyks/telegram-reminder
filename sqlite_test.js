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