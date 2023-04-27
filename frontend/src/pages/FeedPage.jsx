import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar'
import CreatePost from '../components/CreatePost'
import Feed from '../components/Feed'
import axios from 'axios'
import "./FeedPage.css";

export default function FeedPage() {

    const [posts, setPosts] = useState([]);

    useEffect(() => {

        async function getAllPosts() {
            const response = await axios.get("/api/posts/");
            setPosts(response.data);
        }
        getAllPosts()
    }, [])

    return (
        <div>
            <NavBar />
            <div className="feed-outer-container">
                {/* if logged in, show CreatePost */}
                <CreatePost />
                <Feed posts={posts}/>
            </div>
        </div>
    )
}