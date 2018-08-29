const appConfig = require('../config/appConfig');

let reqIpLogger = (req, res, next) => {

    let remoteIp = `${req.connection.remoteAddress}://${req.connection.remotePort}`;
    let realIp = req.headers['Z-REAL-IP'];
    console.log(`${req.method} request made from ${remoteIp} for route ${req.originalUrl}`);

    if(req.method === 'OPTIONS') {
        console.log('!OPTIONS');
        var headers = {};
        
        // access control allow origin
        headers['Access-Control-Allow-Origin'] = '*';
        headers['Access-Control-Allow-Methods'] = 'POST, GET, PUT, DELETE, OPTIONS';
        headers['Access-Control-Allow-Credentials'] = false;
        headers['Access-Control-Max-Age'] = '86400'; // 24 hours
        headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
        res.writeHead(200,headers);
        res.end()
    }
    else {
        res.header('ccess-Control-Allow-Origin', appConfig.allowedCrossOrigin);
        res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        console.log(res.header);
        next()
    } // end CORS config
    
}

module.exports = {
    reqIpLogger: reqIpLogger
}