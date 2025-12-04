import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getEntriesForUser } from "../api"; // import your API function
import "./style.css";

function PreviousEntries() {
  const [entries, setEntries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const entries = await getEntriesForUser(); // no userId param needed
        setEntries(entries);
      } catch (err) {
        console.error("Error fetching entries:", err);
        setEntries([]);
      }
    };

    fetchEntries();
  }, []);

  return (
    <div className="entries-wrapper">
      <h2 className="entries-title">📖 Previous Entries</h2>

      <div className="entries-scroll">
        {entries.length === 0 ? (
          <p className="no-entries">No entries yet</p>
        ) : (
          (entries || []).map((item, index) => (
            <div key={index} className="entry-card">
              <div className="entry-date">{item.date}</div>
              <div className="entry-text">{item.text}</div>
            </div>
          ))
        )}
      </div>

      <button className="back-btn" onClick={() => navigate("/diary")}>
        ⬅ Back to Diary
      </button>
    </div>
  );
}

export default PreviousEntries;
