const express = require('express');
const appConfig = require('./../config/appConfig');
const controller = require('./../config/blogController/controller');
let middlewares = require('./../middlewares/middlewares')
let setRouter = (app) => {

    app.get('/helloWorld', controller.helloFunction);
    app.get('/example', controller.printFunction);
    app.get('/test/route/:param1/:param2', controller.testRoutesF);
    app.get('/test/query', controller.testQueryF);
    app.post('/test/body', controller.testBodyF);

    let baseUrl = appConfig.apiVersion + '/blogs';

    app.get(baseUrl + '/all', controller.getAllBlog);

    app.get(baseUrl + '/view/:blogId', middlewares.exampleMiddleware, controller.viewByBlogId);

    app.get(baseUrl + '/view/by/author/:author', controller.viewByAuthor);

    app.get(baseUrl + '/view/by/category/:category', controller.viewByCategory);

    app.post(baseUrl + '/:blogId/delete', controller.deleteBlog);

    app.put(baseUrl + '/:blogId/edit', controller.editBlog);

    app.post(baseUrl + '/create', controller.createBlog);

    app.get(baseUrl + '/:blogId/count/view', controller.increaseBlogView);

} //end of setrouter

module.exports = {
    setRouter: setRouter
}