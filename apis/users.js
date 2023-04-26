const express = require('express')
const router = express.Router();
const UsersModel = require('../db/users/users.model');

// /api/users/
router.get('/', async function(request, response) {
    try {
        const allUsersResponse = await UsersModel.getAllUsers()
        response.send(allUsersResponse);
    } catch (error) {
        console.error(error)
        return response.status(500).send(error)
    }
});

router.get('/:username', async function(request, response) {
    const username = request.params.username;

    try {
        const getUserByUsernameResponse = await UsersModel.getUserByUsername(username)
        console.log(username)
        console.log(getUserByUsernameResponse)
        return response.send(getUserByUsernameResponse);
    } catch (error) {
        console.error(error)
        return response.status(500).send(error)
    }
});

router.post('/', async function(request, response) {
    const newUser = request.body;

    try {
        const createUserResponse = await UsersModel.createUser(newUser)
        return response.send(createUserResponse)
    } catch (error) {
        console.error(error)
        return response.status(500).send(error)
    }
});

router.put('/:userId', async function(request, response) {
    const userId = request.params.userId;
    const newDescription = request.body.description;

    console.log(newDescription)
    try {
        const updateUserResponse = await UsersModel.updateUser(userId, newDescription)
        return response.send(updateUserResponse)
    } catch (error) {
        console.error(error)
        return response.status(500).send(error)
    }
});

router.delete('/:userId', async function(request, response) {
    const userId = request.params.userId;

    const deleteResponse = await UsersModel.deleteUser(userId)
    return response.send("Successfully deleted user")
});

module.exports = router;