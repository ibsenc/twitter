import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar'
import CreatePost from '../components/CreatePost'
import Feed from '../components/Feed'
import axios from 'axios'
import "./FeedPage.css";

export default function FeedPage() {

    const [posts, setPosts] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [userId, setUserId] = useState("");

    useEffect(() => {

        async function getAllPosts() {
            const response = await axios.get("/api/posts/");
            setPosts(response.data);
        }
        getAllPosts()
    }, [isLoggedIn])

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

    return (
        <div>
            <NavBar />
            <div className="feed-outer-container">
                {isLoggedIn && <CreatePost username={username} userId={userId}/>}
                <Feed posts={posts}/>
            </div>
        </div>
    )
}