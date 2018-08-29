const logger = require('pino');
const time = require('./timeLib');

let captureError = (errMsg, errOrgn, errlvl) => { logger.error({
    timeStamp: time.convLocTime,
    errorMessage: errMsg,
    errorOrigin: errOrgn,
    errorLevel: errlvl
})}

let captureInfo = (msg, org, imp) => {
    let response = {
        timeStamp: time.convLocTime,
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