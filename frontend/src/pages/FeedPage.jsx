import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Post from '../components/Post'
import NavBar from '../components/NavBar'
import CreatePost from '../components/CreatePost'
import "./FeedPage.css";

export default function FeedPage() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        
        async function getAllPosts() {
            const response = await axios.get('http://localhost:8000/api/posts/');
            setPosts(response.data);
        }
        getAllPosts()
    }, [])


    return (
        <div>
            <NavBar />
            <div className="feed-outer-container">
                <CreatePost />
                <div className="feed-container">
                    <div className="feed-content">
                        {posts.map((post) => {
                            return (
                            <Post key={post._id} postDetails={post}>
                            </Post>)
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}