// https://api.telegram.org/bot<token>/METHOD_NAME
const request = require('request');
const dotenv = require('dotenv');
const { addTask, checkTasks } = require('./sqlite_test.js');
const { parseUserInput } = require('./message_parser.js');
dotenv.config();
const TOKEN = process.env.API_TOKEN;
const baseUrl = `https://api.telegram.org/bot${TOKEN}/`;
console.log(TOKEN);

// переписать это говно
function parseShite(body) {
    let updateObj = JSON.parse(body);
    if (!updateObj.result.length) {
        getUpdates();
        return;
    }
    const {
        chat_id,
        text
    } = updateObj.result[0].message
    let task = parseUserInput(text);
    if (task != null) {
        addTask(task.nowDateString, task.taskDateString, task.message, chat_id);
        sendMessage('Да будет так.', chat_id);
    }
    getUpdates(updateObj.result[0].update_id, chat_id);
}

function getUpdates(update_id, chat_id) {
    let url = baseUrl + 'getUpdates';
    request({
        url: url,
        method: 'GET',
        form: {
            offset: update_id + 1,
            timeout: 30,
        },
    }, function(error, response, body) {
        checkTasks(sendMessage);
        parseShite(body);
    });
}

function sendMessage(msg, chat_id) {
    let url = baseUrl + 'sendMessage';
    msg = '' + msg;
    request({
        url: url,
        method: 'GET',
        form: {
            chat_id: chat_id,
            text: msg,
        }
    }, function(error, response, body) { console.log(body); });
}

// убрать комент, чтобы запустить
getUpdates();