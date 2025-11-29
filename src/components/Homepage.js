import React from "react";
import { useNavigate } from "react-router-dom";

export default function Homepage() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to Super Stressed App</h1>
      <p>A safe space to share your thoughts and feelings.</p>

      <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "20px" }}>
        <button onClick={() => navigate("/diary")}>Digital Diary</button>
        <button onClick={() => navigate("/mood")}>Mood Tracker</button>
        <button onClick={() => navigate("/pet")}>Pet Adoption</button>
        <button onClick={() => navigate("/chat")}>AI Chat</button>
      </div>
    </div>
  );
}
