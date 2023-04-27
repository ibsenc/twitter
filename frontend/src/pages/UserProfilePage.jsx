import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import axios from 'axios';
import Feed from '../components/Feed';
import CreatePost from '../components/CreatePost';
import "./UserProfilePage.css";

import { useLocation } from "react-router-dom";

export default function UserProfilePage() {

    const [username, setUsername] = useState("");
    const [userId, setUserId] = useState("");
    const [description, setDescription] = useState("");
    const [joined, setJoined] = useState("");
    const [posts, setPosts] = useState([]);

    const location = useLocation();

    useEffect(() => {
        setUserId(location.state.userId);
    }, [])

    useEffect(() => {
        if (!userId) {
            return
        }

        async function getUserById() {
            const response = await axios.get('/api/users/' + userId);
            setUsername(response.data.username);
            setDescription(response.data.description);
            setJoined(response.data.joined);
        }

        getUserById();

    }, [userId]);

    useEffect(() => {
        if (!userId) {
            return
        }

        async function getAllPosts() {
            const response = await axios.get(`/api/posts/${userId}`);
            setPosts(response.data);
        }
        getAllPosts()
    }, [userId])

    function convertDateTime(datetime) {
        const dt = new Date(datetime)
        return dt.toLocaleString()
    }

    return (
        <div>
            <NavBar />
            <div className="user-details-container">
                <div className="username-title twitter-font">{username}</div>
                <div className="user-description twitter-font">{description}</div>
                <div className="date-joined twitter-font">Joined: {convertDateTime(joined)}</div>
            </div>
            {/* if logged in, show the below */}
            <div className="profile-create-post-container">
                <CreatePost />
            </div>
            <Feed posts={posts}/>
        </div>
    )
}