import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { saveUser } from "../api"; 
import bg from './emojis/background(3).png';

import './Homepage.css';

function Login() {
    const navigate = useNavigate();

    //state to store user input
    const [name,setName] = useState('');

    //handle login button click
    const handleSubmit = async () => { 
        if (!name.trim()) {
            alert("Please enter your name");
            return;
     }

        try {
            //send name to backend and save user
            const res = await saveUser(name);
            const userId = res.data.userId;

            //store user data locally so other pages can use it
            localStorage.setItem('name', name);
            localStorage.setItem('userId', userId);

            //navigate to homepage after successful login
            navigate('/homepage');
        } catch (error) {
            console.error("Error saving user:", error);
            alert("Failed to save user.");
        }
    };

    return (
        <div className="background-homepage">
            <img src={bg} alt='Background'/>
            <div className="login-box">
                <h1>Miracle</h1>
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

export default Login;