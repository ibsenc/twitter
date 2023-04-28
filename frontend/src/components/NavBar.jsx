import React, { useState, useEffect } from 'react';
import "./NavBar.css";
import {Link} from 'react-router-dom';
import axios from 'axios';

export default function NavBar() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [userId, setUserId] = useState("");

    useEffect(() => {
        async function checkIfLoggedIn() {
            try {
                const response = await axios.get('/api/users/loggedinuser');
                setUsername(response.data.username);
                setUserId(response.data.userId);
            } catch (e) {
                console.error(e);
            }
        }

        checkIfLoggedIn();
    }, [])

    useEffect(() => {
        if (username && userId) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, [username, userId])

    const handleLogout = async () => {
        try {
            const response = await axios.post('/api/users/logout');
            if (response.status == 200) {
                setUsername("");
                setUserId("");
            }
            window.location.reload();
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div className="navbar sticky-pos white-text twitter-font">
            <Link className="left-component" to={"/"}>Twitter</Link>
            <div className="right-component">
                {isLoggedIn && <div className="welcome navbar-button">Welcome, {username}</div>}
                {isLoggedIn && <Link className="logout-button navbar-button" to={"/"} onClick={handleLogout}>Logout</Link>}
                {!isLoggedIn && <Link className="login-button navbar-button" to={"/login"}>Login</Link>}
                {!isLoggedIn && <Link className="register-button navbar-button" to={"/register"}>Register</Link>}
            </div>
        </div>
    )
}