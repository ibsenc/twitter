const express = require('express')
const router = express.Router();
const UsersModel = require('../db/users/users.model');
const jwt = require('jsonwebtoken');
const {isAuthentic, isAuthorized} = require('./common.js');

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

router.get('/loggedinuser', async function(request, response) {
    if (isAuthentic(request)) {
        const jwtPayload = request.cookies.userToken;
        const decryptedJwtPayload = jwt.verify(jwtPayload, "Camille's password");
        return response.send(decryptedJwtPayload)
    } else {
        return response.send({userId: null, username: null})
    }
});

router.get('/:userId', async function(request, response) {
    const userId = request.params.userId;

    try {
        const getUserByUserIdResponse = await UsersModel.getUserByUserId(userId)
        return response.send(getUserByUserIdResponse);
    } catch (error) {
        console.error(error)
        return response.status(500).send(error)
    }
});

router.get('/username/:username', async function(request, response) {
    const username = request.params.username;

    try {
        const getUserResponse = await UsersModel.getUserByUsername(username)
        return response.send(getUserResponse);
    } catch (error) {
        console.error(error)
        return response.status(500).send(error)
    }
});

router.post('/register', async function(request, response) {

    if(!request.body.username || !request.body.password) {
        return res.status(400).send({message: "Must include username AND password"});
    }

    const newUser = request.body;

    try {
        const createUserResponse = await UsersModel.createUser(newUser)
        const userId = createUserResponse._id;
        const username = createUserResponse.username;

        const jwtPayload = {
            userId,
            username
        }

        const token = jwt.sign(jwtPayload, "Camille's password")
        response.cookie("userToken", token);

        return response.send(createUserResponse)
    } catch (error) {
        console.error(error)
        return response.status(500).send(error)
    }
});

router.put('/:userId', async function(request, response) {
    const userId = request.params.userId;
    const newDescription = request.body.description;

    if (!isAuthorized(request, userId)) {
        return response.status(401).send("User is not authorized to perform this action.")
    }

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

    if (!isAuthorized(request, userId)) {
        return response.status(401).send("User is not authorized to perform this action.")
    }

    const deleteResponse = await UsersModel.deleteUser(userId)
    return response.send("Successfully deleted user")
});

router.post('/login', async function(request, response) {
    const username = request.body.username;
    let password = request.body.password;

    if(!username || !password) {
        return res.status(400).send({message: "Must include username AND password"});
    }

    try {
        const getUserResponse = await UsersModel.getUserByUsername(username);

        if (getUserResponse.password !== password) {
            return response.status(403).send("Username or password is incorrect.");
        }

        const userId = getUserResponse._id;

        const jwtPayload = {
            userId,
            username
        }

        const token = jwt.sign(jwtPayload, "Camille's password")
        response.cookie("userToken", token);
        
        return response.send("Logged in successfully");
    
    } catch (e) {
        console.error(e);
        response.status(401).send("Unauthorized: access denied.");
    }
});

router.post('/logout', async function(request, response) {

    response.cookie('userToken', {}, {
        maxAge: 0,
    })

    response.send(true);
});

module.exports = router;
