import React, {useEffect, useState} from 'react';
import Post from '../components/Post';
import "./Feed.css";

export default function Feed({posts}) {

    return (
        <div className="feed-container">
            <div className="feed-content">
                {posts.map((post) => {
                    return (
                    <Post key={post._id} postDetails={post}>
                    </Post>)
                })}
            </div>
        </div>
    )
}