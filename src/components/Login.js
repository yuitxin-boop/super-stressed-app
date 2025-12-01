import React from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();

    return (
        <div className="gradient-bg">
            <div className="login-box">
                <h1>Super-Stressed App</h1>
                <p>A little space for your thoughts.</p>

                <div className="input-group">
                    <p>Enter your name</p>
                    <input type="text" placeholder="Username" />
                </div>
                <button onClick = { () => navigate ('/homepage')}> Get started!</button>
            </div>

        </div>
    )
}