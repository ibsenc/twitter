const express = require('express')
const router = express.Router();
const PostsModel = require('../db/posts/posts.model');

// /api/posts/
router.get('/', async function(request, response) {
    try {
        const allPostsResponse = await PostsModel.getAllPosts()
        response.send(allPostsResponse);
    } catch (error) {
        console.error(error)
        return response.status(500).send(error)
    }
});

router.get('/:username', async function(request, response) {
    const username = request.params.username;

    try {
        const userPostsResponse = await PostsModel.getPostsByUser(username)
        response.send(userPostsResponse);
    } catch (error) {
        console.error(error)
        return response.status(500).send(error)
    }
});

router.post('/', async function(request, response) {
    const newPost = request.body;

    try {
        const createPostResponse = await PostsModel.createPost(newPost)
        return response.send(createPostResponse)
    } catch (error) {
        console.error(error)
        return response.status(500).send(error)
    }
});

router.put('/:postId', async function(request, response) {
    const postId = request.params.postId;
    const newPostContent = request.body.content;

    try {
        const updatePostResponse = await PostsModel.updatePost(postId, newPostContent)
        return response.send(updatePostResponse)
    } catch (error) {
        console.error(error)
        return response.status(500).send(error)
    }
});

router.delete('/:postId', async function(request, response) {
    const postId = request.params.postId;

    const deleteResponse = await PostsModel.deletePost(postId)
    return response.send("Successfully deleted post")
});

module.exports = router;