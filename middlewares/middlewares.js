let exampleMiddleware = (req,res,next) => {
    req.user = {
        'firstNamw': 'Sayantan',
        'lastName': 'Saha'
    }
    next();
}
module.exports = {
    exampleMiddleware: exampleMiddleware
}