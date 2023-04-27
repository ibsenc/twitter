import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import axios from 'axios';
import Feed from '../components/Feed';
import "./UserProfilePage.css";

import { useLocation } from "react-router-dom";

export default function UserProfilePage() {

    const [username, setUsername] = useState("");
    const [userId, setUserId] = useState("");
    const [description, setDescription] = useState("");

    const location = useLocation();

    useEffect(() => {
        setUserId(location.state.userId);
    }, [])

    useEffect(() => {
        if (!userId) {
            return
        }

        async function getUserById() {
            const response = await axios.get('http://localhost:8000/api/users/' + userId);
            setUsername(response.data.username);
            setDescription(response.data.description);
        }

        getUserById();

    }, [userId]);

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        if (!userId) {
            return
        }

        async function getAllPosts() {
            const response = await axios.get(`http://localhost:8000/api/posts/${userId}`);
            setPosts(response.data);
        }
        getAllPosts()
    }, [userId])

    return (
        <div>
            <NavBar />
            <div className="user-details-container">
                <div className="username-title twitter-font">{username}</div>
                <div className="user-description twitter-font">{description}</div>
            </div>
            <Feed posts={posts}/>
        </div>
    )
}