var api2015 = 'http://act.17173.com/2015/07/cj0715/index.php?do=';
var api2014 = 'http://act.17173.com/2014/06/cj2014/index.php?do=';
var lotteryConfig = {
    host: 'http://p.act.17173.com/api/v1/activity/',
    actId: 7373,
    lotteryId: 182,
    fieldsetId: 208
}
var API = {
    lotteryId: 7373,
    sendMsg: lotteryConfig.host + lotteryConfig.actId + '/lottery/' + lotteryConfig.lotteryId + '/smsCaptchaCode',
    lottery: api2015 + 'lottery',
    userInfo: api2015 + 'save',
    join: api2015 + 'Join',
    suggest: api2015 + 'info',
    getCategory: api2014 + 'GetCategory&year=2016',
    getGoddess: api2014 + 'GetGoddess',
    like: api2014 + 'vote&type=1',
    matchCount: api2014 + 'GetMatch',
    sgInfo: api2014 + 'getinfo',
    GetData: api2014 + 'GetData&year=2016',

    doLottery: lotteryConfig.host + lotteryConfig.actId + '/lottery/' + lotteryConfig.lotteryId,
    winnerList: lotteryConfig.host + lotteryConfig.actId + '/log/' + lotteryConfig.lotteryId + '?callback=?',
    winnerListMobile: lotteryConfig.host + '7392' + '/log/192?callback=?',
    fieldset: lotteryConfig.host + lotteryConfig.actId + '/form?callback=?',
    submitInfo: lotteryConfig.host + lotteryConfig.actId + '/form/' + lotteryConfig.fieldsetId + '/saveData?callback=?',
};

module.exports = API;