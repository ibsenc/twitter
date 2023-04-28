import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import axios from 'axios';
import Feed from '../components/Feed';
import CreatePost from '../components/CreatePost';
import "./UserProfilePage.css";

import { useLocation } from "react-router-dom";

export default function UserProfilePage() {

    const [profileUsername, setProfileUsername] = useState("");
    const [profileUserId, setProfileUserId] = useState("");
    const [profileDescription, setProfileDescription] = useState("");
    const [profileJoined, setProfileJoined] = useState("");
    const [posts, setPosts] = useState([]);

    const [isProfileOwner, setIsProfileOwner] = useState(false);
    const [loggedInUsername, setLoggedInUsername] = useState("");
    const [loggedInUserId, setLoggedInUserId] = useState("");

    const location = useLocation();

    useEffect(() => {
        setProfileUserId(location.state.userId);
    }, [])

    useEffect(() => {
        async function getLoggedInUser() {
            console.log("checkIfLoggedIn()...")
            try {
                const response = await axios.get('/api/users/loggedinuser');
                setLoggedInUsername(response.data.username);
                setLoggedInUserId(response.data.userId);
                console.log(`Setting logged in username: ${response.data.username}`)
                console.log(`Setting logged in userId: ${response.data.userId}`)
            } catch (e) {
                console.error(e);
            }
        }

        getLoggedInUser();
    }, [])

    useEffect(() => {
        if (!profileUserId) {
            return
        }

        async function getUserById() {
            const response = await axios.get('/api/users/' + profileUserId);
            setProfileUsername(response.data.username);
            setProfileDescription(response.data.description);
            setProfileJoined(response.data.joined);
        }

        getUserById();

    }, [profileUserId]);

    useEffect(() => {
        if (profileUserId != loggedInUserId) {
            setIsProfileOwner(false);
        } else {
            setIsProfileOwner(true);
        }
    }, [profileUserId, loggedInUserId])

    useEffect(() => {
        if (!profileUserId) {
            return
        }

        async function getAllPosts() {
            const response = await axios.get(`/api/posts/${profileUserId}`);
            setPosts(response.data);
        }
        getAllPosts()
    }, [profileUserId, isProfileOwner])

    function convertDateTime(datetime) {
        const dt = new Date(datetime)
        return dt.toLocaleString()
    }

    return (
        <div>
            <NavBar />
            <div className="user-details-container">
                <div className="username-title twitter-font">{profileUsername}</div>
                <div className="user-description twitter-font">{profileDescription}</div>
                <div className="date-joined twitter-font">Joined: {convertDateTime(profileJoined)}</div>
            </div>
            {isProfileOwner && 
            <div className="profile-create-post-container">
                <CreatePost username={profileUsername} userId={profileUserId}/>
            </div>}
            <Feed posts={posts}/>
        </div>
    )
}