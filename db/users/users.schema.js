const Schema = require('mongoose').Schema;

exports.UsersSchema = new Schema({
    username: { 
        type: String,
        require: true,
    },
    joined: { 
        type : Date, 
        default: Date.now,
    },
    description: String,

}, { collection : 'users' });