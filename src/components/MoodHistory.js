import React, { useEffect, useState } from 'react';
import './MoodTracker.css'; // you can keep the same CSS or create MoodHistory.css
import { useNavigate } from 'react-router-dom';

function MoodHistory() {
  const [historyEntries, setHistoryEntries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Load all saved mood entries from localStorage
    const entries = JSON.parse(localStorage.getItem('moodEntries')) || [];
    setHistoryEntries(entries);
  }, []);

  return (
    <div className="history-page">
      <h1 className="history-title ">Mood History</h1>

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

        <button className="back-home-button" onClick={() => navigate('/')}>
           Back to Homepage
        </button>

        </div>
      )}
    </div>
  );
}

export default MoodHistory;