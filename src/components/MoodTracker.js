import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './MoodTracker.css';
import joy from './emojis/Joy.png';
import anger from './emojis/Angry (4).png';
import anxiety from './emojis/Anxiety.png';
import sadness from './emojis/Sad (1).png';
import embarrassed from './emojis/Embarrassed.png';
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
    </div>
  );
}

export default MoodTracker;

