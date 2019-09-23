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

let re = /напомни\s+через\s(\d+) (час|недел|секун|месяц|дней|день).\w{0,2},?\s?(.+)/im;

function createReminder(inputString, amount) {
    let now = new Date();
    let nowString = '';
    switch (inputString) {
      case 'час':
        now.setHours(now.getHours() + amount);
        nowString = now.toString();
        break;
      case 'дней' || 'день':
        now.setHours(now.getHours() + amount*24);
        nowString = now.toString();
        break;
      case 'недел':
        now.setHours(now.getHours() + amount*24*7);
        nowString = now.toString();
        break;
      case 'месяц':
        now.setHours(now.getHours() + amount*24*30);
        nowString = now.toString();
        break;
      case 'секун':
        now.setSeconds(now.getSeconds() + amount);
        nowString = now.toString();
        break;
      default:
        return 'error';
    }
    let remindAfter = {
      'dateObj': now,
      'dateString': nowString,
    };
    return remindAfter;
  }
  
  console.log(createReminder('секун', 2999));
  test_msgs.forEach(function(item) {
    console.log(item.match(re));
});