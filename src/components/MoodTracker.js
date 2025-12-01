import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MoodTracker.css';
import happy from './emojis/happy.png';
import angry from './emojis/angry.png';
import nervous from './emojis/nervous.png';
import cry from './emojis/cry.png';
import sleepy from './emojis/sleepy.png';

const today = new Date();
const formatteddate = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();

function MoodTracker() {
  const [moodText, setMoodText] = useState('');
  const [selectedMood, setSelectedMood] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {

    if (!selectedMood) {
      alert('Please select a mood before submitting');
      return;
    }

    navigate('/checkmood', {
      state: {
        selectedMood: selectedMood,
        moodText: moodText,
        date: formatteddate
      }
    });
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
    </div>
  );
}

export default MoodTracker;