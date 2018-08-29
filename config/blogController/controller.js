const express = require('express')
const mongoose = require('mongoose');
const shortid = require('shortid');
const responses = require('./../../appLibrary/responseLib');
const time = require('./../../appLibrary/timeLib');
const check = require('./../../appLibrary/check');
const logger = require('./../../appLibrary/loggerLib');

const hello = (req, res) => res.send('Hello World');
const print = (req, res) => res.send('print example');
const testRoutes = (req, res) => res.send(req.params);
const testQuery = (req, res) => res.send(req.query);
const testBody = (req, res) => res.send(req.body);

//Importing the model here 
const BlogModel = mongoose.model('Blog')

let getAllBlog = (req, res) => {
    BlogModel.find()
        .select('-__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                res.send(responses.generate(true, 'Failed to get', 500, null));
            } else if (check.isEmpty(result)) {
                console.log('No Blog Found')
                res.send(responses.generate(true, 'No Blog Found', 404, null));
            } else {
                logger.captureInfo('All Blogs found', 'blog controller: getAllBlog', 10);
                res.send(responses.generate(false, 'All blog details found', 200, result));
            }
        })
} // end get all blogs

/**
 * function to read single blog.
 */
let viewByBlogId = (req, res) => {
    console.log(req.user);

    BlogModel.findOne({
        'blogId': req.params.blogId
    }, (err, result) => {

        if (err) {
            console.log(err)
            res.send(responses.generate(true, 'Failed to get', 500, null));
        } else if (check.isEmpty(result)) {
            console.log('No Blog Found')
            res.send(responses.generate(true, 'No Blog Found', 404, null));
        } else {
            res.send(responses.generate(false, `${req.params.blogId} id blog has been found`, 200, result));

        }
    })
}

/**
 * function to read blogs by category.
 */
let viewByCategory = (req, res) => {

    BlogModel.find({
        'category': req.params.category
    }, (err, result) => {

        if (err) {
            console.log(err)
            res.send(responses.generate(true, 'Failed to get', 500, null));
        } else if (check.isEmpty(result)) {
            console.log('No Blog Found')
            res.send(responses.generate(true, 'No Blog Found', 404, null));
        } else {
            res.send(responses.generate(false, `${req.params.category} category of blogs found`, 200, result));

        }
    })
}

/**
 * function to read blogs by author.
 */
let viewByAuthor = (req, res) => {

    BlogModel.find({
        'author': req.params.author
    }, (err, result) => {

        if (err) {
            console.log(err)
            res.send(responses.generate(true, 'Failed to get', 500, null));
            } else if (check.isEmpty(result)) {
                console.log('No Blog Found')
                res.send(responses.generate(true, 'No Blog Found', 404, null));
            } else {
                res.send(responses.generate(false, `${req.params.author}'s blogs found`, 200, result));

        }
    })
}

/**
 * function to edit blog by admin.
 */
let editBlog = (req, res) => {

    let options = req.body;
    console.log(options);
    BlogModel.update({
        'blogId': req.params.blogId
    }, options, {
        multi: true
    }).exec((err, result) => {

        if (err) {
            console.log(err)
            res.send(responses.generate(true, 'Failed to get', 500, null));
            } else if (check.isEmpty(result)) {
                console.log('No Blog Found')
                res.send(responses.generate(true, 'No Blog Found', 404, null));
            } else {
                res.send(responses.generate(false, `${req.params.blogId} id blog has been updated`, 200, result));

        }
    })
}



/**
 * function to delete the assignment collection.
 */
let deleteBlog = (req, res) => {
    BlogModel.remove({
        'blogId': req.params.blogId
    }, (err, result) => {
        if (err) {
            console.log(err)
            res.send(responses.generate(true, 'Failed to get', 500, null));
            } else if (check.isEmpty(result)) {
                console.log('No Blog Found')
                res.send(responses.generate(true, 'No Blog Found', 404, null));
            } else {
                res.send(responses.generate(false, `${req.params.blogId} id blog has been deleted`, 200, result));

        }
    })
}

/**
 * function to create the blog.
 */
let createBlog = (req, res) => {
    var today = Date.now()
    let blogId = shortid.generate()

    let newBlog = new BlogModel({

        blogId: blogId,
        title: req.body.title,
        description: req.body.description,
        bodyHtml: req.body.blogBody,
        isPublished: true,
        category: req.body.category,
        author: req.body.fullName,
        created: time.convLocTime,
        lastModified: today
    }) // end new blog model

    let tags = (check.isEmpty(req.body.tags)) ? req.body.tags.split(',') : []
    newBlog.tags = tags

    newBlog.save((err, result) => {
        if (err) {
            console.log(err)
            res.send(responses.generate(true, 'Failed to create', 500, null));
            } 
            else {
                res.send(responses.generate(false, `${blogId} id blog has been created`, 200, result));

        }
    }) // end new blog save
}

/**
 * function to increase views of a blog.
 */
let increaseBlogView = (req, res) => {

    BlogModel.findOne({
        'blogId': req.params.blogId
    }, (err, result) => {

        if (err) {
            console.log(err)
            res.send(responses.generate(true, 'Failed to update', 500, null));
        } else if (check.isEmpty(result)) {
            console.log('No Blog Found')
            res.send(responses.generate(true, 'No Blog Found', 404, null));
        } else {

            result.views += 1;
            result.save(function (err, result) {
                if (err) {
                    console.log(err)
                    res.send(responses.generate(true, 'Failed to update', 500, null));
            } 
            else {
                res.send(responses.generate(false, `${req.params.blogId} viewer updated`, 200, result));

                }
            }); // end result

        }
    })
}

module.exports = {
    helloFunction: hello,
    printFunction: print,
    testRoutesF: testRoutes,
    testQueryF: testQuery,
    testBodyF: testBody,

    getAllBlog: getAllBlog,
    createBlog: createBlog,
    viewByBlogId: viewByBlogId,
    viewByCategory: viewByCategory,
    viewByAuthor: viewByAuthor,
    editBlog: editBlog,
    deleteBlog: deleteBlog,
    increaseBlogView: increaseBlogView
}