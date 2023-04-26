import React from 'react';
import "./CreatePost.css";

export default function CreatePost() {

    return (
        <div className="create-post-container">
            <div className="new-status-update">
                <input className="input-status-update twitter-front" placeholder="What's happening?"></input>
                <div className="submit-button white-text twitter-font">Tweet</div>
            </div>
        </div>
    )
}