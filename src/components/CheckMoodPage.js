import React from 'react';
import './MoodTracker.css'; // import the CSS
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
    
    const handleSubmit = () => {
        const newEntry = {
            date: date,
            mood: selectedMood,
            note: moodText || '',
            moments: selectedMoments
        };

        const existingEntries = JSON.parse(localStorage.getItem('moodEntries')) || [];
        existingEntries.push(newEntry);
        localStorage.setItem('moodEntries', JSON.stringify(existingEntries));

        setShowOverlap(true);
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

                {showOverlap && (
                    <div className="overlap-bg">
                        <div className="overlap-box">
                        <img src={Night} alt="goodnight" className="overlap-img" />
                         <h1 className="overlap-title">Today's mood saved!</h1>
                         <h2 className="overlap-message">Have a sweet dream🌙!</h2>

                         <button className="home-button" onClick={() => navigate ('/')}>
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
