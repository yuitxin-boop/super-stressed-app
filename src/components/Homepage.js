import React from "react";
import { useNavigate } from "react-router-dom";
import './Homepage.css';
import {useEffect, useState} from 'react';
import background from './emojis/background(2).png';
import './ai.css';


export default function Homepage() {
  const navigate = useNavigate();
  const [name,setName] = useState('');
  useEffect(() => {
    const storedName = localStorage.getItem('name');
    setName(storedName);}, 
    []);

  return (
    <div className="background-homepage">
      <img src={background} alt='Background'/>
      <div className="home-tittle">
        <h2>Welcome, {name} !</h2>
        <p>A safe space to share your thoughts and feelings.</p>
        
          <button onClick={() => navigate("/diary")}> 
            Digital Diary
            <span className="button-subtext">Write what's on your mind.</span>
          </button>
            
          <button onClick={() => navigate("/mood")}>
            Mood Tracker
            <span className="button-subtext">Track your emotional wellbeing.</span>
          </button>

          <button onClick={() => navigate("/pet")}>
            Virtual Pet
            <span className="button-subtext">Care for your visual companion.</span>
          </button>
      </div>

      <button className ="circle-button" onClick={() => navigate("/chat")}>
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000ff"><path d="M240-400h320v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z"/></svg>
      </button>
    </div>
  );
}
