import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "./Post.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons'

export default function Post({postDetails}) {

    const [postUsername, setPostUsername] = useState("");
    const [content, setContent] = useState("");
    const [editing, setEditing] = useState(false);
    const [postContentInput, setPostContentInput] = useState("");

    const [loggedInUsername, setLoggedInUsername] = useState("");
    const [loggedInUserId, setLoggedInUserId] = useState("");
    const [isPostOwner, setIsPostOwner] = useState(false);

    useEffect(() => {
        async function getLoggedInUser() {
            try {
                const response = await axios.get('/api/users/loggedinuser');
                setLoggedInUsername(response.data.username);
                setLoggedInUserId(response.data.userId);
            } catch (e) {
                console.error(e);
            }
        }

        getLoggedInUser();
    }, [])

    useEffect(() => {
        if (!postDetails) {
            return
        }

        async function getPostUsername() {
            const response = await axios.get('/api/users/' + postDetails.userId);
            setPostUsername(response.data.username);
        }

        getPostUsername();

    }, [postDetails])

    useEffect(() => {
        setContent(postDetails.content);
        setPostContentInput(postDetails.content);

    }, [postDetails])

    useEffect(() => {
        if (postDetails.userId === loggedInUserId) {
            setIsPostOwner(true);
        } else {
            setIsPostOwner(false);
        }
    }, [postDetails.userId, loggedInUserId])

    function convertDateTime(datetime) {
        const dt = new Date(datetime)
        return dt.toLocaleString()
    }

    const navigate = useNavigate();
    function goToUserPage() {
        const path = "/profile/" + postDetails.userId;
        navigate(path, {state: {userId: postDetails.userId}});
    }

    function setPostContent(event) {
        const newContent = event.target.value;
        setPostContentInput(newContent);
    }

    function handleEditPostClick() {
        setEditing(true);
    }

    async function submit() {
        if (!postContentInput) {
            return;
        }

        if(!postDetails.userId) {
            console.error("User is not currently logged in.")
        }

        try {
            const response = await axios.put(`/api/posts/${postDetails._id}`, {content: postContentInput})
            if (response.status == 200) {
                setPostContentInput("");
                setContent(response.data.content)
                window.location.reload();
            }
        } catch (e) {
            console.error(e)
        }
        setEditing(false);
    }

    async function handleDeletePostClick() {
        try {
            const response = await axios.delete(`/api/posts/${postDetails._id}`)
            if (response.status == 200) {
                window.location.reload();
            }
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <div className="post-container twitter-font">
            <div className="first-row-container">
                <div className="first-row" onClick={goToUserPage}>
                    {postUsername}
                    <span className="division-dot"> • </span>
                    {convertDateTime(postDetails.created)}</div>
                {isPostOwner && 
                    <div>
                        <FontAwesomeIcon className="faicon" icon={faPenToSquare} onClick={handleEditPostClick} />
                        <FontAwesomeIcon className="faicon" icon={faTrashCan} onClick={handleDeletePostClick} />
                    </div>}
            </div>
            <div>
                {!editing && postDetails.content}
                {editing && 
                    <div className="updating-post-container">
                        <input type='text' value={postContentInput} onInput={setPostContent} ></input>
                        <div className="submit-button white-text twitter-font" onClick={submit}>Submit</div>
                    </div>
                }
            </div>
        </div>
    )
}