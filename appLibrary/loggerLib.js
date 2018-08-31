const logger = require('pino')();
const time = require('./timeLib');

let captureError = (errMsg, errOrgn, errlvl) => { logger.error({
    timeStamp: time.getLocTime,
    errorMessage: errMsg,
    errorOrigin: errOrgn,
    errorLevel: errlvl
})}

let captureInfo = (msg, org, imp) => {
    let response = {
        timeStamp: time.getLocTime,
        message: msg,
        origin: org,
        importanceLevel: imp
    }
    logger.info(response)
}

module.exports = {
    captureError: captureError,
    captureInfo: captureInfo
}