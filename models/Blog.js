const mongoose = require('mongoose');

const schema = mongoose.Schema;

let blogSchema = new schema(
    {
        blogId: {
            type: String,
            unique: true
        },
        title: {
            type: String,
            default: 'This is default'
        },
        description: {
            type: String,
            default: 'This is default'
        },
        bodyHtml: {
            type: String,
            default: 'This is default'
        },
        views: {
            type: Number,
            default: 111
        },
        isPublished: {
            type: Boolean,
            default: false
        },
        category: {
            type: String,
            default: 'This is default'
        },
        author: {
            type: String,
            default: 'This is default'
        },
        tags: [],
        created: {
            type: Date,
            default: Date.now
        },
        lastModified: {
            type: Date,
            default: Date.now
        },
    }
)
mongoose.model('Blog', blogSchema)