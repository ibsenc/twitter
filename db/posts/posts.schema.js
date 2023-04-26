const Schema = require('mongoose').Schema;

exports.PostsSchema = new Schema({
    username: { 
        type: String,
        require: true,
    },
    created : { 
        type : Date, 
        default: Date.now,
    },
    content: {
        type: String,
        require: true,
    },

}, { collection : 'posts' });