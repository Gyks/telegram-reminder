test_msgs = [
    'напомни через 2 часа вынести мусор',
    'напомни через 10 дней вынести тиммейтов в доке2',
    'напомни через 2 недели сделать харакири',
    'напомни через 20 секунд помыть пол',
    'напомни через 2 месяца, сделать паунс в окно',
];


let re = /напомни\s+через\s(\d+) (час|недел|секун|месяц|дней|день).\w{0,2},?\s?(.+)/im;

test_msgs.forEach(function(item) {
    console.log(item.match(re));
});