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
      now.setHours(now.getHours() + amount*24*29);
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