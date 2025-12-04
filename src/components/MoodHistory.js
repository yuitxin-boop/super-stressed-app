import React, { useEffect, useState } from 'react';
import './MoodTracker.css';
import { useNavigate } from 'react-router-dom';
import { getMoodEntries } from '../api';

function MoodHistory() {
  const [historyEntries, setHistoryEntries] = useState([]);
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (!userId) return;

    const fetchHistory = async () => {
      try {
        const res = await getMoodEntries(userId);
        setHistoryEntries(res.data);
      } catch (err) {
        console.error("Error fetching mood history:", err);
      }
    };

    fetchHistory();
  }, [userId]);

  return (
    <div className="history-page">
      <h1 className="history-title">Mood History</h1>

      {historyEntries.length === 0 ? (
        <p>No entries yet.</p>
      ) : (
        <div className="entries-container">
          {historyEntries.map((entry, index) => (
            <div className="entry-card" key={index}>
              <h2>{entry.date}</h2>
              <p><strong>Mood:</strong> {entry.mood || 'N/A'}</p>
              {entry.note && <p><strong>Note:</strong> {entry.note}</p>}
              {entry.moments && entry.moments.length > 0 ? (
                <p><strong>Moments:</strong> {entry.moments.join(', ')}</p>
              ) : (
                <p><strong>Moments:</strong> None selected</p>
              )}
            </div>
          ))}
        </div>
      )}
      
      <button className="back-home-button" onClick={() => navigate('/homepage')}>
        Back to Homepage
      </button>
    </div>
  );
}

export default MoodHistory;
