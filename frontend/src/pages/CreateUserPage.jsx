import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import NavBar from '../components/NavBar';
import "./LoginOrRegister.css";
import axios from 'axios';

export default function CreateUserPage() {

    const [usernameInput, setUsernameInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [descriptionInput, setDescriptionInput] = useState('');
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

    function setDescription(event) {
        setErrorMessage('');
        const description = event.target.value;
        setDescriptionInput(description);
    }

    async function submit() {
        setErrorMessage('');

        if (!usernameInput || !passwordInput) {
            setErrorMessage('* Please provide a username and password to login.');
            return;
        }

        const newUser = {
            username: usernameInput,
            password: passwordInput,
            description: descriptionInput
        }

        try {
            const response = await axios.post('/api/users/register', newUser)
            navigate('/');
        } catch (e) {
            console.error(e)
            setErrorMessage("Something went wrong.");
        }

        // console.log(usernameInput, passwordInput);
    }

    return (
        <div>
            <NavBar />
            <div className="login-register-container">
                <h1 className="title twitter-font">Create Account</h1>
                <div className="login-register-contents">
                    <div className="input-row twitter-font">
                        <span>Username: </span>
                        <input type='text' value={usernameInput} onInput={setUsername}></input>
                        <span className="asterisk"> *</span>
                    </div>
                    <div className="input-row twitter-font">
                        <span className="password-span">Password: </span>
                        <input type='text' value={passwordInput} onInput={setPassword}></input>
                        <span className="asterisk"> *</span>
                    </div>
                    <div className="input-row twitter-font">
                        <span className="bio-span">User Bio: </span>
                        <input type='text' value={descriptionInput} onInput={setDescription}></input>
                    </div>
                    <div className="submit-button twitter-font white-text"onClick={submit}>Create Account</div>
                    <div className="error twitter-font">
                        {errorMessage && errorMessage}
                    </div>
                </div>
            </div>
        </div>
        
    )
}