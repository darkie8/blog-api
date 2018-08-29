let errHandler = (error, req, resp, next) => {
    console.log('Global error handler called');
    console.log(error);
    resp.send('Some error occured at global level');
} // err handler end

let notFoundhandler = (req, resp, next) => {
    console.log('Global not found handler called');
    resp.status(404).send('route not found in the app');
} // not found handler end

module.exports = {
    errHandler: errHandler,
    notFoundhandler: notFoundhandler
}