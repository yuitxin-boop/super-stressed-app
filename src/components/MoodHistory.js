import React, { useEffect, useState } from 'react';
import './MoodTracker.css';
import { useNavigate } from 'react-router-dom';
import { getMoodEntries } from '../api';

function MoodHistory() {
  const [historyEntries, setHistoryEntries] = useState([]); // State to store mood history entries
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId'); // Get current user ID from localStorage

  // Fetch mood history from backend when component mounts
  useEffect(() => {
    if (!userId) return; // Exit if no userId

    const fetchHistory = async () => {
      try {
        const res = await getMoodEntries(userId); // Get mood entries for this user
        setHistoryEntries(res.data);              // Store fetched entries in state
      } catch (err) {
        console.error("Error fetching mood history:", err);
      }
    };

    fetchHistory();
  }, [userId]);

  return (
    <div className="history-page">
      <h1 className="history-title">Mood History</h1>

      {/* Check if there are any entries */}
      {historyEntries.length === 0 ? (
        <p>No entries yet.</p>    // Message when there are no entries
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
      
      {/* Back to homepage button */}
      <button className="back-home-button" onClick={() => navigate('/homepage')}>
        Back to Homepage
      </button>
    </div>
  );
}

export default MoodHistory;
