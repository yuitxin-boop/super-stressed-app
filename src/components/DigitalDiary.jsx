import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { saveEntry as saveEntryAPI, getEntriesForUser } from "../api";
import "./style.css";

import seal from "./images/Rectangle 4.png";
import close from "./images/X.png";
import clouds from "./images/Cloudssss.png";
import star from "./images/Star.png";
import moon from "./images/moon.png";
import bear from "./images/bear.png";

function DigitalDiary() {
  const navigate = useNavigate();
  const [entry, setEntry] = useState("");
  const [entries, setEntries] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showReflection, setShowReflection] = useState(false);
  const userId = localStorage.getItem("userId");

  // If no user, redirect
  useEffect(() => {
    if (!userId) {
      alert("User not found. Please login again.");
      navigate("/");
    }
  }, [userId, navigate]);

  // Fetch entries from backend
  const fetchEntries = useCallback(async () => {
    if (!userId) return;
    try {
      const res = await getEntriesForUser(userId);
      const fetchedEntries = res?.data || [];
      setEntries(fetchedEntries);
    } catch (err) {
      console.error("Error fetching entries:", err);
      setEntries([]);
    }
  }, [userId]);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  // Save entry to backend
  const saveEntry = async () => {
    if (!entry.trim()) {
      alert("Write something first!");
      return;
    }

    try {
      const savedEntry = await saveEntryAPI(entry);
      setEntries((prev) => [...prev, savedEntry]);
      setEntry("");
      setShowModal(true);
    } catch (err) {
      console.error("Error saving entry:", err);
      alert("Failed to save entry");
    }
  };

  return (
    <>
      <div className="wrapper">
        <nav>
          <div className="logo">Digital diary</div>

          <ul>
            <li>
              <button className="btn" onClick={saveEntry}>
                Save Entry
              </button>
            </li>

            <li>
              <button className="btn" onClick={() => navigate("/entries")}>
                Previous Entries
              </button>
            </li>

            <li>
              <button className="btn" onClick={() => setShowReflection(true)}>
                Daily Reflection
              </button>
            </li>

            <li>
              <button className="btn" onClick={() => navigate("/homepage")}>
                Homepage
              </button>
            </li>
          </ul>
        </nav>

        <div className="hero-section">
          <div className="notepad-wrapper">
            <div className="notepad">
              <textarea
                className="diary-box"
                placeholder="How was your day"
                value={entry}
                onChange={(e) => setEntry(e.target.value)}
              />
            </div>

            <img src={seal} alt="seal" className="diary-image" />
          </div>
        </div>
      </div>

      {/* Save Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <img
              src={close}
              alt="close"
              className="close-img"
              onClick={() => setShowModal(false)}
            />
            <p>
              <br />
              Entry Saved! <br />
              <br />
              Be proud of how far you made today. <br />
              Tomorrow is waiting!
            </p>
          </div>
        </div>
      )}

      {/* Reflection Modal */}
      {showReflection && (
        <div className="reflection-modal">
          <div className="reflection-content">
            <img
              src={close}
              alt="close"
              className="close-img"
              onClick={() => setShowReflection(false)}
            />

            <img src={clouds} className="clouds-img" alt="" />
            <img src={star} className="star-img" alt="" />
            <img src={star} className="star2-img" alt="" />
            <img src={moon} className="moon-img" alt="" />
            <img src={bear} className="bear-img" alt="" />

            <h2 className="title">Daily Reflection</h2>

            <p>
              1. What went well today? <br />
              2. What could have gone better? <br />
              3. What am I proud of today? <br />
              4. What will I improve tomorrow? <br />
              5. How did I feel overall?
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default DigitalDiary;


