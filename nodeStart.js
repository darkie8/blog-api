const express = require('express');
const appConfig = require('./config/appConfig');
const fs = require('fs');
const app = express();
const mongoose = require('mongoose');
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let routesPath = './route';
let globalErrMiddleware = require('./middlewares/appMiddleware');
let routeLogger = require('./middlewares/appLogger');
const helmet = require('helmet');
// middleware
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(globalErrMiddleware.errHandler);
app.use(routeLogger.reqIpLogger);

// model 
let modelPath = './models'
fs.readdirSync(modelPath).forEach((file) => {
    if (~file.indexOf('.js')) {
        require(`${modelPath}/${file}`)

    }
});

fs.readdirSync(routesPath).forEach((file) => {
    if (~file.indexOf('.js')) {
        console.log(`${file} included`);
        let route = require(`${routesPath}/${file}`);
        route.setRouter(app);

    }
})// route called

// for 404 route error handler
app.use(globalErrMiddleware.notFoundhandler);



app.listen(appConfig.port, () => {
    console.log('Example app listening on port 3000!')

    let db = mongoose.connect(appConfig.db.uri, {
        useNewUrlParser: true
    });
});

// handling the error
mongoose.connection.on('error', (err) => {
    console.log('database connection error');
    console.log(err);

});

mongoose.connection.on('open', (err) => {
    if (err) {
        console.log('database error');
        console.log(err);


    } else {
        console.log('database has been connected correctly !');

    }
})