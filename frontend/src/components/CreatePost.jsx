import React, { useState, useEffect } from 'react';
import "./CreatePost.css";
import axios from 'axios';

export default function CreatePost({username, userId}) {

    const [tweetContentInput, setTweetContentInput] = useState('');
    const [errorMessage, setErrorMessage] = useState("");

    function setTweetContent(event) {
        const tweetInput = event.target.value;
        setTweetContentInput(tweetInput);
    }

    async function submit() {
        setErrorMessage('');

        if (!tweetContentInput) {
            return;
        }

        if(!userId) {
            console.error("User is not currently logged in.")
            setErrorMessage("Something went wrong. Please try again later.")
        }

        try {
            const response = await axios.post('/api/posts/', {userId: userId, content: tweetContentInput})
            if (response.status == 200) {
                setTweetContentInput("");
                window.location.reload();
            }
        } catch (e) {
            console.error(e)
            setErrorMessage("Sorry, we could not send your tweet right now. Please try again later.");
        }
    }

    return (
        <div className="post-and-error-container">
            <div className="create-post-container">
                <div className="new-status-update">
                    <input type='text' value={tweetContentInput} onInput={setTweetContent} 
                    className="input-status-update twitter-front" placeholder="What's happening?"></input>
                    <div className="submit-tweet-button white-text twitter-font" onClick={submit}>Tweet</div>
                </div>
            </div>
            <div className="error-message twitter-font">{errorMessage}</div>
        </div>
    )
}