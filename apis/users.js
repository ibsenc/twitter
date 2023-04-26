const express = require('express')
const router = express.Router();
const PostsModel = require('../db/posts/posts.model');

// /api/users/
router.get('/', async function(request, response) {
    try {
        const allPostsResponse = await PostsModel.getAllPosts()
        response.send(allPostsResponse);
    } catch (error) {
        console.error(error)
        return response.status(500).send(error)
    }
});

module.exports = router;