import axios from "axios";

const API = "http://localhost:5000"; // your backend URL

// ===== User =====
// Save user: only sends name, backend generates userId
export const saveUser = (name) =>
  axios.post(`${API}/save-user`, { name });

// Get user by userId
export const getUser = (userId) =>
  axios.get(`${API}/get-user/${userId}`);

// ===== Diary =====
// Save a diary entry
export const saveDiary = (title, content) => {
  const userId = localStorage.getItem("userId");
  return axios.post(`${API}/diary`, { userId, title, content });
};

// Get all diary entries for logged-in user
export const getDiaries = () => {
  const userId = localStorage.getItem("userId");
  return axios.get(`${API}/diary/${userId}`);
};

// ===== Mood =====
// Save a mood entry
export const saveMood = async ({ userId, mood, note }) => {
  return await axios.post('http://localhost:5000/mood', {
    userId,
    mood,
    note,
  });
};

export const getMoods = async (userId) => {
  return await axios.get(`http://localhost:5000/mood/${userId}`);
};

export const saveMoodEntry = async ({ userId, date, mood, note, moments }) => {
  return await axios.post(`${API}/save-mood-entry`, {
    userId,
    date,
    mood,
    note,
    moments
  });
};

export const getMoodEntries = async (userId) => {
  return await axios.get(`${API}/mood-entries/${userId}`);
};