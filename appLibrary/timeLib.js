const moment = require('moment');
const momenttz = require('moment-timezone');
const timezone = 'Asia/Calcutta';

let now = () => moment.utc().format() ;
let getLocTime = () => moment().tz(timezone).format() ;
let convLocTime = () => momenttz.tz(time, timezone).format('LLLL');

module.exports = {
    now: now,
    getLocTime: getLocTime,
    convLocTime: convLocTime
}