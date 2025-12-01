import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Homepage from "./components/Homepage";
import DigitalDiary from "./components/DigitalDiary";
import MoodTracker from "./components/MoodTracker";
import Pet from "./components/Pet";
import Chatbox from "./components/Chatbox";
import CheckMoodPage from "./components/CheckMoodPage";
import MoodHistory from "./components/MoodHistory";
import Login from "./components/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/diary" element={<DigitalDiary />} />
        <Route path="/mood" element={<MoodTracker />} />
        <Route path="/pet" element={<Pet />} />
        <Route path="/chat" element={<Chatbox />} />
        <Route path="/checkmood" element={<CheckMoodPage />} />
        <Route path="/history" element={<MoodHistory />} />
      </Routes>
    </Router>
  );
}

export default App;
