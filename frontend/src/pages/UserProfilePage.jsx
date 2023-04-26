import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import axios from 'axios';
import { useLocation } from "react-router-dom";

export default function UserProfilePage() {

    const [username, setUsername] = useState("");
    const [userId, setUserId] = useState("");
    const [description, setDescription] = useState("");

    const location = useLocation();

    useEffect(() => {
        setUserId(location.state.userId);
    }, [])

    useEffect(() => {
        if (!userId) {
            return
        }

        async function getUserById() {
            const response = await axios.get('http://localhost:8000/api/users/' + userId);
            setUsername(response.data.username);
            setDescription(response.data.description);
        }

        getUserById();

    }, [userId]);

    return (
        <div>
            <NavBar />
            <div>
                {userId}
                {username}
                {description}
            </div>
        </div>
    )
}