// https://api.telegram.org/bot<token>/METHOD_NAME
const request = require('request');
const dotenv = require('dotenv');
dotenv.config();
const token = process.env.API_TOKEN;
const baseUrl = `https://api.telegram.org/bot${token}/`;
console.log(token);

// переписать это говно
function parseShite(body) {
    let updateObj = JSON.parse(body);
    if (updateObj.result[0] == null) {
        getUpdates();
        return;
    }
    let chat_id = updateObj.result[0].message.chat.id;
    let text = updateObj.result[0].message.text;
    sendMessage(text, chat_id);
    getUpdates(updateObj.result[0].update_id);
}

function getUpdates(update_id) {
    let url = baseUrl + 'getUpdates';
    request({
        url: url,
        method: 'POST',
        form: {
            offset: update_id + 1,
            timeout: 99,
        },
      }, function(error, response, body){
        parseShite(body);
      });
}

function sendMessage(msg, chat_id) {
    let url = baseUrl + 'sendMessage';
    request({
        url: url,
        method: 'POST',
        form: {
            chat_id: chat_id,
            text: msg,
        }
      }, function(error, response, body){
      });
}

// убрать комент, чтобы запустить
// getUpdates();