import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import NavBar from '../components/NavBar';
import "./LoginPage.css";
import axios from 'axios';


export default function LoginPage() {

    const [usernameInput, setUsernameInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    function setUsername(event) {
        setErrorMessage('');
        const username = event.target.value;
        setUsernameInput(username);
    }

    function setPassword(event) {
        setErrorMessage('');
        const password = event.target.value;
        setPasswordInput(password);
    }

    async function submit() {
        setErrorMessage('');

        if (!usernameInput || !passwordInput) {
            setErrorMessage('Please provide a username and password to login.');
            return;
        }

        try {
            const response = await axios.post('/api/users/login', {username: usernameInput, password: passwordInput})
            navigate('/');
        } catch (e) {
            console.error(e)
            setErrorMessage("Something went wrong");
        }

        console.log(usernameInput, passwordInput);
    }

    return (
        <div>
            <NavBar />
            <div>
            <h1>Login</h1>
            <div className="error">
                {errorMessage && errorMessage}
            </div>
            <div>
                <span>Username: </span>
                <input type='text' value={usernameInput} onInput={setUsername}></input>
                <span className="asterisk"> *</span>
            </div>
            <div>
                <span>Password: </span>
                <input type='text' value={passwordInput} onInput={setPassword}></input>
                <span className="asterisk"> *</span>
            </div>
            <button onClick={submit}>Login</button>
        </div>
        </div>
        
    )
}