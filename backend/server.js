const posts = require('./apis/posts')
const users = require('./apis/users')
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const cors = require('cors')
const path = require('path')
const cookieParser = require('cookie-parser');

const localMongoEndpoint = 'mongodb://127.0.0.1/project3';
const mongoEndpoint = process.env.MONGODB_URI || localMongoEndpoint;

mongoose.connect(mongoEndpoint, { useNewUrlParser: true });

// Get the connection string
const db = mongoose.connection;

// This will create the connection, and throw an error if it doesn't work
db.on('error', console.error.bind(console, 'Error connecting to MongoDB:'));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/posts/', posts);
app.use('/api/users/', users);

let frontend_dir = path.join(__dirname, '..', 'frontend', 'dist')

app.use(express.static(frontend_dir));
app.get('*', function (req, res) {
    console.log("received request");
    res.sendFile(path.join(frontend_dir, "index.html"));
});

app.listen(process.env.PORT || 8000, function() {
    console.log("Starting server now...")
})