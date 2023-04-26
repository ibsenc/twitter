import React from 'react';
import "./NavBar.css";
import {Link} from 'react-router-dom';

export default function NavBar() {

    return (
        <div className="navbar sticky-pos white-text twitter-font">
            <Link className="left-component" to={"/"}>Twitter</Link>
            <div className="right-component">
                <Link className="login-button" to={"/login"}>Login</Link>
                <Link className="register-button" to={"/register"}>Register</Link>
            </div>
        </div>
    )
}