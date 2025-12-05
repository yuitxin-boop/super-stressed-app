import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './MoodTracker.css';
import joy from './emojis/Joy.png';
import anger from './emojis/Angry (4).png';
import anxiety from './emojis/Anxiety.png';
import sadness from './emojis/Sad (1).png';
import embarrassed from './emojis/Embarrassed.png';
import { saveMood, getMoods } from '../api'; 

//Get today's date in DD-MM-YYYY format
const today = new Date();
const formatteddate = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();

function MoodTracker() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  // State to store mood history, current mood note, and selected mood
  const [moodHistory, setMoodHistory] = useState([]);
  const [moodText, setMoodText] = useState('');
  const [selectedMood, setSelectedMood] = useState('');

  // Fetch moods from backend
  const fetchMoods = useCallback(async () => {
    try {
      const res = await getMoods(userId); // pass userId to get moods for this user
      setMoodHistory(res.data);
    } catch (err) {
      console.error('Error fetching moods:', err);
    }
  }, [userId]);

  // Fetch moods when component mounts or userId changes
  useEffect(() => {
    if (userId) fetchMoods();
  }, [userId, fetchMoods]);

  // Handle mood submission 
  const handleSubmit = async () => {
    if (!selectedMood) return alert('Please select a mood before submitting'); // check is a mood is selected

    try {
      await saveMood({ userId, mood: selectedMood, note: moodText }); // send userId, mood, and note to backend
      setMoodText('');
      setSelectedMood('');
      fetchMoods(); // refresh mood history after submission
      navigate('/checkmood', { state: { selectedMood, moodText, date: formatteddate } });
    } catch (err) {
      console.error('Error saving mood:', err);
      alert('Failed to save mood');
    }
  };

  return (
    <div className="mood-tracker">
      <h1 className="mood-title">Mood Tracker</h1>

      {/* Navigation links */}
      <span className="history-link" onClick={() => navigate('/history')}>History</span>
      <span className="homepage-link" onClick={() => navigate('/homepage')}>Homepage</span>

      {/* Current date */}
      <h2 className="mood-subtitle">{formatteddate}</h2>
      <h3 className="mood-instruction">How are you feeling today?</h3>

      {/* Mood emoji selection */}
      <div className="mood-emoji">
        <div
          className={`mood-items ${selectedMood === 'Joy' ? 'selected' : ''}`}
          onClick={() => setSelectedMood('Joy')}
        >
          <img src={joy} alt="Joy" />
          <p>Joy</p>
        </div>

        <div
          className={`mood-items ${selectedMood === 'Anger' ? 'selected' : ''}`}
          onClick={() => setSelectedMood('Anger')}
        >
          <img src={anger} alt="Anger" />
          <p>Anger</p>
        </div>

        <div
          className={`mood-items ${selectedMood === 'Anxiety' ? 'selected' : ''}`}
          onClick={() => setSelectedMood('Anxiety')}
        >
          <img src={anxiety} alt="Anxiety" />
          <p>Anxiety</p>
        </div>

        <div
          className={`mood-items ${selectedMood === 'Sadness' ? 'selected' : ''}`}
          onClick={() => setSelectedMood('Sadness')}
        >
          <img src={sadness} alt="Sadness" />
          <p>Sadness</p>
        </div>

        <div
          className={`mood-items ${selectedMood === 'Embarrassed' ? 'selected' : ''}`}
          onClick={() => setSelectedMood('Embarrassed')}
        >
          <img src={embarrassed} alt="Embarrassment" />
          <p>Embarassment</p>
        </div>
      </div>

      {/* Optional note input */}
      <input
        type="text"
        placeholder="Add some note..."
        value={moodText}
        onChange={(e) => setMoodText(e.target.value)}
        className="mood-input"
      />
      
      {/* Submit button */}
      <button className="mood-submit" onClick={handleSubmit}>
        Submit Mood
      </button>
    </div>
  );
}

export default MoodTracker;

