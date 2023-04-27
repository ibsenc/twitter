import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "./Post.css";

export default function Post({postDetails}) {
    const [username, setUsername] = useState("");

    useEffect(() => {
        if (!postDetails) {
            return
        }

        async function getUsername() {
            const response = await axios.get('http://localhost:8000/api/users/' + postDetails.userId);
            setUsername(response.data.username);
        }

        getUsername();

    }, [postDetails])

    function convertDateTime(datetime) {
        const dt = new Date(datetime)
        return dt.toLocaleString()
    }

    const navigate = useNavigate();
    function goToUserPage() {
        const path = "/profile/" + postDetails.userId;
        navigate(path, {state: {userId: postDetails.userId}});
    }

    return (
        <div className="post-container twitter-font" onClick={goToUserPage}>
            {username} - {convertDateTime(postDetails.created)}
            <div>
                {postDetails.content}
            </div>
        </div>
    )
}