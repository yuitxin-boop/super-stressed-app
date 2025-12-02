import React from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { saveUser } from "../api"; 

export default function Login() {
    const navigate = useNavigate();
    const [name,setName] = useState('');

    const handleSubmit = async () => { 
        if (!name) {
            alert("Please enter your name");
            return;
     }

        try {
            const res = await saveUser(name);

            const userId = res.data.userId;
            localStorage.setItem('name', name);
            localStorage.setItem('userId', userId);

            navigate('/homepage');
        } catch (error) {
            console.error("Error saving user:", error);
            alert("Failed to save user.");
        }
    };

    return (
        <div className="gradient-bg">
            <div className="login-box">
                <h1>Super-Stressed App</h1>
                <p>A little space for your thoughts.</p>

                <div className="input-group">
                    <p>Enter your name</p>
                    <input type="text" placeholder="Username" value={name} onChange={(e) => setName(e.target.value)}/>
                </div>
                <button onClick = {handleSubmit}> Get started!</button>
            </div>

        </div>
    )
}