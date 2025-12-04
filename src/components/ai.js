import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ai.css";
import ChatForm from "./ChatForm";
import dog from "./images/dog.png";
import mat from "./images/mat.png"; 

function AI() {
  const navigate = useNavigate();
  const [chatHistory, setChatHistory] = useState([
    { sender: "ai", text: "Hi… I'm here with you 💛 How are you feeling today?" }
  ]);
  const [loading, setLoading] = useState(false);

  const generateBotResponse = async (userMessage) => {
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await res.json();

      setChatHistory((prev) => [
        ...prev,
        { sender: "ai", text: data.reply },
      ]);
    } catch (error) {
      console.error("AI ERROR:", error);
      setChatHistory((prev) => [
        ...prev,
        { sender: "ai", text: "Everything will be alright💛" },
      ]);
    }

    setLoading(false);
  };

  return (
  <div className="ai-bg">  
    <div className="scenery-area">
      <div className="chat-box">

        <div className="chat-messages">
          {chatHistory.map((msg, index) => (
            <div key={index}
              className={`chat-bubble ${msg.sender === "user" ? "user" : "ai"}`}
            >
              {msg.text}
            </div>
          ))}

          {loading && <div className="chat-bubble ai">Typing…</div>}
        </div>

        <div className="chat-input">
          <ChatForm
            setChatHistory={setChatHistory}
            generateBotResponse={generateBotResponse}
          />
        </div>

      </div>
    </div>

    <div className="right-panel">

      <div className="rules-box">
        <h4>🌼 Safe Space Rules</h4>
        <br />
        <p>1.🥰Share safely</p>
        <p>No real names, numbers, or private info</p>
        <p>2.🫶Support only</p>
        <p>I’m your cozy chat buddy, not a doctor</p>
        <p>3.👀Keep it safe</p>
        <p>No advice for violence or illegal stuff</p>
        <p>4.🚨Emergencies</p>
        <p>If you’re in danger, contact a real human ASAP</p>
      </div>

      <div className="pet-box">
        <img src={dog} className="dog-img" alt="dog" />
        <img src={mat} className="mat-img" alt="mat" />
      </div>

      <button className="back-btn" onClick={() => navigate("/homepage")}>
        ⬅ Back
      </button>

    </div>
  </div> 
 
);
}

export default AI;