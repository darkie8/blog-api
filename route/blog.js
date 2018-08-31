const express = require('express');
const appConfig = require('./../config/appConfig');
const controller = require('./../config/blogController/controller');
let middlewares = require('./../middlewares/middlewares')
const authrization = require('./../middlewares/auth');

let setRouter = (app) => {

    app.get('/helloWorld', controller.helloFunction);
    app.get('/example', controller.printFunction);
    app.get('/test/route/:param1/:param2', controller.testRoutesF);
    app.get('/test/query', controller.testQueryF);
    app.post('/test/body', controller.testBodyF);

    let baseUrl = appConfig.apiVersion + '/blogs';

    app.get(baseUrl + '/all', controller.getAllBlog);

    app.get(baseUrl + '/view/:blogId',middlewares.exampleMiddleware, controller.viewByBlogId);

    app.get(baseUrl + '/view/by/author/:author', controller.viewByAuthor);

    app.get(baseUrl + '/view/by/category/:category', controller.viewByCategory);

    app.post(baseUrl + '/:blogId/delete',authrization.isAuth, controller.deleteBlog);

    app.put(baseUrl + '/:blogId/edit',authrization.isAuth, controller.editBlog);

    app.post(baseUrl + '/create',authrization.isAuth, controller.createBlog);

    app.get(baseUrl + '/:blogId/count/view',authrization.isAuth, controller.increaseBlogView);

} //end of setrouter

module.exports = {
    setRouter: setRouter
}