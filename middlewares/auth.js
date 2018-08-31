const logger = require('./../appLibrary/loggerLib');
const response = require('./../appLibrary/responseLib');
const check = require('./../appLibrary/check');

let isAuth = (req, res, next) => {
    if(req.params.authToken || req.query.authToken || req.header('authToken'))
    {
        if(req.params.authToken === 'Admin_code_alpha_101'
         || req.query.authToken === 'Admin_code_alpha_101' 
         || req.header('authToken') === 'Admin_code_alpha_101') {
             req.user = {
                 fullname: 'Alpha',
                 userId: 'id_gen101'
             }
             next();
         } else {
             logger.captureError('Incorrect authentication token', 'Authentication Middleware', 10);
             let apiResponse = response.generate(true, 'Authentication Token Is Missing In Request', 403, null);
             res.send(apiResponse);
         }
    } else{
        logger.captureError('Authentication Token Missing', 'Authentication Middleware', 10);
        let apiResponse = response.generate(true, 'Authentication Token Is Missing In Request', 403, null);
        res.send(apiResponse);
    }
}

module.exports = {
    isAuth: isAuth
}