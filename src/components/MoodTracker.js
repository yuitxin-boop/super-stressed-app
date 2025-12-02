import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './MoodTracker.css';
import './circle-button.css';
import happy from './emojis/happy.png';
import angry from './emojis/angry.png';
import nervous from './emojis/nervous.png';
import cry from './emojis/cry.png';
import sleepy from './emojis/sleepy.png';
import { saveMood, getMoods } from '../api'; // make sure getMoods exists

const today = new Date();
const formatteddate = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();

function MoodTracker() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  // Store past moods for history page
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

  useEffect(() => {
    if (userId) fetchMoods();
  }, [userId, fetchMoods]);

  const handleSubmit = async () => {
    if (!selectedMood) return alert('Please select a mood before submitting');

    try {
      await saveMood({ userId, mood: selectedMood, note: moodText }); // send userId, mood, and note
      setMoodText('');
      setSelectedMood('');
      fetchMoods(); // refresh mood history
      navigate('/checkmood', { state: { selectedMood, moodText, date: formatteddate } });
    } catch (err) {
      console.error('Error saving mood:', err);
      alert('Failed to save mood');
    }
  };

  return (
    <div className="mood-tracker">
      <h1 className="mood-title">Mood Tracker</h1>
      <span className="history-link" onClick={() => navigate('/history')}>History</span>
      <span className="homepage-link" onClick={() => navigate('/homepage')}>Homepage</span>
      <h2 className="mood-subtitle">{formatteddate}</h2>
      <h3 className="mood-instruction">How are you feeling today?</h3>

      <div className="mood-emoji">
        <div
          className={`mood-items ${selectedMood === 'Happy' ? 'selected' : ''}`}
          onClick={() => setSelectedMood('Happy')}
        >
          <img src={happy} alt="Happy" />
          <p>Happy</p>
        </div>

        <div
          className={`mood-items ${selectedMood === 'Angry' ? 'selected' : ''}`}
          onClick={() => setSelectedMood('Angry')}
        >
          <img src={angry} alt="Angry" />
          <p>Angry</p>
        </div>

        <div
          className={`mood-items ${selectedMood === 'Nervous' ? 'selected' : ''}`}
          onClick={() => setSelectedMood('Nervous')}
        >
          <img src={nervous} alt="Nervous" />
          <p>Nervous</p>
        </div>

        <div
          className={`mood-items ${selectedMood === 'Cry' ? 'selected' : ''}`}
          onClick={() => setSelectedMood('Cry')}
        >
          <img src={cry} alt="Cry" />
          <p>Sad</p>
        </div>

        <div
          className={`mood-items ${selectedMood === 'Sleepy' ? 'selected' : ''}`}
          onClick={() => setSelectedMood('Sleepy')}
        >
          <img src={sleepy} alt="Sleepy" />
          <p>Sleepy</p>
        </div>
      </div>

      <input
        type="text"
        placeholder="Add some note..."
        value={moodText}
        onChange={(e) => setMoodText(e.target.value)}
        className="mood-input"
      />

      <button className="mood-submit" onClick={handleSubmit}>
        Submit Mood
      </button>

      <button className ="circle-button" onClick={() => navigate("/chat")}>
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffffffff">
          <path d="M240-400h320v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z"/>
        </svg>
      </button>
    </div>
  );
}

export default MoodTracker;

