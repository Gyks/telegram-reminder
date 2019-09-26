const { addTask, checkTasks } = require('./sqlite_test.js');
test_msgs = [
    'напомни через 2 часа вынести мусор',
    'напомни через 10 дней вынести тиммейтов в доке2',
    'напомни через 2 недели сделать харакири',
    'напомни через 20 секунд помыть пол',
    'напомни через 2 месяца, сделать паунс в окно',
    'напомни 24 октября убить кота'
];
//TODO
// добавить парсер сообщения для даты (21 октября)
// юзать текущий год, обработать исключение, когда пользователь пишет дату <= текущей.
// попробовать переписать через this и конструктор объектов.

function createReminder(message, dateTypeString, amount) {
    let now = new Date();
    let nowString = '';
    let taskDateString = '';
    nowString = now.toString();
    switch (dateTypeString) {
        case 'час':
            now.setHours(now.getHours() + +amount);
            taskDateString = now.toString();
            break;
        case 'дней' || 'день':
            now.setHours(now.getHours() + +amount * 24);
            taskDateString = now.toString();
            break;
        case 'недел':
            now.setHours(now.getHours() + +amount * 24 * 7);
            taskDateString = now.toString();
            break;
        case 'месяц':
            now.setHours(now.getHours() + +amount * 24 * 30);
            taskDateString = now.toString();
            break;
        case 'секунд':
            now.setSeconds(now.getSeconds() + +amount);
            taskDateString = now.toString();
            break;
        default:
            return 'error';
    }
    let remindAfter = {
        'nowDateString': nowString,
        'taskDateString': taskDateString,
        'message': message,
    };
    return remindAfter;
}

function parseUserInput(userMessage) {
    let re = /напомни\s+через\s(\d+) (час|недел|секунд|месяц|дней|день).\w{0,2},?\s?(.+)/im;
    let user_params = userMessage.match(re);
    if (user_params)
        return createReminder(user_params[3], user_params[2], user_params[1]);
}

module.exports.parseUserInput = parseUserInput;