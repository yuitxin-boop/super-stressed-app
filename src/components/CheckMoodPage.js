import React from 'react';
import './MoodTracker.css'; // import the CSS
import { useNavigate,useLocation } from "react-router-dom";
import { useState, useEffect } from 'react';
import Night from './emojis/Night.png';
import {saveMoodEntry} from '../api';

function CheckMoodPage() {

    const navigate = useNavigate();
    const location = useLocation();

    // Get mood data passed from previous page
    const { selectedMood, moodText, date } = location.state || {};

    // State to show overlay
    const [showOverlap, setShowOverlap] = useState(false);

    // List of daily moments 
    const momentsList = [
        "👩‍💻 Work",
        "📖 Study",
        "📃 Exam",
        "🏋️ Exercise",
        "🎮 Gaming",
        "🛌 Sleep",
        "🍽️ Food",
        "💬 Socializing",
        "🎵 Music",
        "🎨 Hobbies",
        "🌳 Outdoors",
        "👨‍👩‍👧‍👦 Family",
        "🫂 Friends",
        "💞 Partner",
        "🛍️ Shopping",
        "✈️ Travel",
        "⛅ Weather",
        "🐶 Pets"
    ];

    // State to store selected moments
    const [selectedMoments, setSelectedMoments] = useState([]);

    // Handle checkbox toggle for each moment
    const handleCheckboxChange = (moment) => {
        if (selectedMoments.includes(moment)) {
            // Remove moment if already selected
            setSelectedMoments(selectedMoments.filter(m => m !== moment));
        } else {
            // Add moment to selected moments
            setSelectedMoments([...selectedMoments, moment]);
        }
    };
    
    // Handle submission of mood + selected moments
    const handleSubmit = async () => {
        const newEntry = {
            userId: localStorage.getItem("userId"), //current user
            date,                                   //date entries
            mood: selectedMood,                     //mood selected
            note: moodText || '',                   //optional note
            moments: selectedMoments                //selected moments
        };

        try {
            await saveMoodEntry(newEntry); // Save the mood entry to backend
            setShowOverlap(true); // Show confirmation overlay
        } catch (err) {
            console.error(err);
            alert("Error saving mood to backend");
        }
    };
    
    return (
        <div className="mood-tracker">
            <div className="check-new-page">
                <h1 className="mood-title">Check Your Day Here!</h1>
                {/* Instruction text */}
                <h3 className="mood-instruction">Select the moments that make your day :</h3>

                 {/* Checklist of moments */}
                <div className="checklist-container">
                     {momentsList.map((item) => (
                        <label className="checklist-item" key={item}>
                             <input
                                type="checkbox"
                                checked={selectedMoments.includes(item)}
                                onChange={() => handleCheckboxChange(item)}
                             />
                              {item}
                        </label>
                     ))}
                </div>
                
                {/* Submit moments button */}
                <button className="moment-submit" onClick={handleSubmit}>
                    Submit Moments
                </button>

                {/* Back to mood tracker page button */}
                <button className="back-button" onClick={() => navigate('/mood')}>
                    Back
                </button>

                {/* Confirmation overlay */}
                {showOverlap && (
                    <div className="overlap-bg">
                        <div className="overlap-box">
                        <img src={Night} alt="goodnight" className="overlap-img" />
                         <h1 className="overlap-title">Today's mood saved!</h1>
                         <h2 className="overlap-message">Have a sweet dream🌙!</h2>

                         {/* Back to homepage button */}
                         <button className="home-button" onClick={() => navigate ('/homepage')}>
                             Back to Homepage
                         </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CheckMoodPage;
