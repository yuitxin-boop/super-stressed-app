import axios from "axios";

const API = "https://miracle-backend-eq4m.onrender.com"; // backend URL

// ===== User =====
// Save user: sends name, backend generates userId
export const saveUser = (name) =>
  axios.post(`${API}/save-user`, { name });

// Get user by userId
export const getUser = (userId) =>
  axios.get(`${API}/get-user/${userId}`);

// ===== Diary Entries =====

// Save a new diary entry (with userId from localStorage)
export const saveEntry = async (text) => {
  const userId = localStorage.getItem("userId"); // get logged-in user
  if (!userId) throw new Error("User not logged in");

  try {
    const res = await axios.post(`${API}/entries`, { text, userId });
    return res.data; // returns the saved entry
  } catch (err) {
    console.error("Error saving entry:", err);
    throw err;
  }
};

// Get all diary entries for current user
export const getEntriesForUser = async () => {
  const userId = localStorage.getItem("userId");
  if (!userId) throw new Error("User not logged in");

  try {
    const res = await axios.get(`${API}/entries/${userId}`);
    return res.data; // array of entries from backend
  } catch (err) {
    console.error("Error fetching entries:", err);
    throw err;
  }
};

// ===== Mood =====
export const saveMood = async ({ userId, mood, note }) => {
  return await axios.post(`${API}/mood`, { userId, mood, note });
};

export const getMoods = async (userId) => {
  return await axios.get(`${API}/mood/${userId}`);
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

// ===== Pet =====
export const savePet = async ({ userId, happiness, hunger, energy, name }) =>
  axios.post(`${API}/pet`, { userId, happiness, hunger, energy, name });

export const getPet = async (userId) =>
  axios.get(`${API}/pet/${userId}`);

// ===== Chat/OpenAI =====
export const chatWithAI = (message) =>
  axios.post(`${API}/chat`, { message });

// ===== Health check =====
export const dataStatus = () => axios.get(`${API}/__data_status`);
