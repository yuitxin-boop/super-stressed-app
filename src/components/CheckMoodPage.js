import React from 'react';
import './MoodTracker.css'; // import the CSS
import './circle-button.css';
import { useNavigate,useLocation } from "react-router-dom";
import { useState } from 'react';
import Night from './emojis/Night.png';

function CheckMoodPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { selectedMood, moodText, date } = location.state || {};
    const [showOverlap, setShowOverlap] = useState(false);
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

    const [selectedMoments, setSelectedMoments] = useState([]);

    const handleCheckboxChange = (moment) => {
        if (selectedMoments.includes(moment)) {
            setSelectedMoments(selectedMoments.filter(m => m !== moment));
        } else {
            setSelectedMoments([...selectedMoments, moment]);
        }
    };
    
    const handleSubmit = async () => {
        const newEntry = {
            userId: localStorage.getItem("userId"),
            date,
            mood: selectedMood,
            note: moodText || '',
            moments: selectedMoments
        };

        try {
            const res = await fetch("http://localhost:5000/save-mood-entry", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newEntry),
            });

        if (!res.ok) throw new Error("Failed to save mood");

        setShowOverlap(true);
    } catch (err) {
        console.error(err);
        alert("Error saving mood to backend");
        }
    };
    
    return (
        <div className="mood-tracker">
            <div className="check-new-page">
                <h1 className="mood-title">Check Your Day Here!</h1>
                <h3 className="mood-instruction">Select the moments that make your day :</h3>

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

                <button className="mood-submit" onClick={handleSubmit}>
                    Submit Moments
                </button>

                <button className="back-button" onClick={() => navigate('/mood')}>
                    Back
                </button>

                {showOverlap && (
                    <div className="overlap-bg">
                        <div className="overlap-box">
                        <img src={Night} alt="goodnight" className="overlap-img" />
                         <h1 className="overlap-title">Today's mood saved!</h1>
                         <h2 className="overlap-message">Have a sweet dream🌙!</h2>

                         <button className="home-button" onClick={() => navigate ('/homepage')}>
                             Back to Homepage
                         </button>
                        </div>
                    </div>
                )}
            </div>

            <button className ="circle-button" onClick={() => navigate("/chat")}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffffffff"><path d="M240-400h320v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z"/></svg>
            </button>
        </div>
    );
}

export default CheckMoodPage;
