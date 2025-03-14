import axios from "axios";

// Fetch daily question
export const fetchDailyQuestion = async () => {
  try {
    const response = await axios.get("http://localhost:5000/new/dailyQuestion");
    return response.data;
  } catch (error) {
    console.error("Error fetching daily question:", error);
    throw error;
  }
};

// Fetch progress by level
export const fetchProgressByLevel = async (level, userId) => {
  try {
    const response = await axios.get("http://localhost:5000/p/progress/", {
      params: { level, userId },
    });
    return response.data.levels;
  } catch (error) {
    console.error("Error fetching progress:", error);
    throw error;
  }
};

// Update streak
export const updateUserStreak = async (userId, isCorrect) => {
  try {
    const response = await axios.post("http://localhost:5000/daily/updateStreak", {
      userId,
      isCorrect,
    });
    return response.data.streak;
  } catch (error) {
    console.error("Error updating streak:", error);
    throw error;
  }
};

// Function to fetch streak from backend
export const fetchStreak = async (userId, setStreak) => {
  try {
    const response = await axios.get(`http://localhost:5000/daily/getStreak/${userId}`);
    if (response.data.streak !== undefined) {
      setStreak(response.data.streak);
    } else {
      console.log(response.data.message);
    }
  } catch (error) {
    console.error('Error fetching streak:', error);
  }
};

// API call to fetch mistakes
export const fetchMistakes = async (userId) => {
  try {
    const response = await axios.get('http://localhost:5000/mistake/get-mistakes', {
      params: { userId },
    });
    return response.data.mistakes[0]?.mistakes || [];
  } catch (err) {
    throw new Error(`Error: ${err.response ? err.response.data.error : err.message}`);
  }
};


const API_URL = "http://localhost:5000";

// Fetch questions for the quiz based on level and module
export const fetchQuestions = async (level, module, emotion) => {
  // console.log(`Level ${level}, module ${module}, emotion ${emotion}`);
  
    try {
        const response = await axios.get(`${API_URL}/levels/${level}/modules/${module}/${emotion}`);
        return response.data.questions || [];
        
        
    } catch (error) {
        console.error("Error fetching questions:", error);
        throw new Error("Error fetching questions");
    }
};

// Save mistakes to the server
export const saveMistakes = async (mistakes, userId) => {
    try {
        const response = await axios.post(`${API_URL}/mistake/save-mistakes`, {
            mistakes,
            userId,
        });
        return response.data;
    } catch (error) {
        console.error("Error saving mistakes:", error);
        throw new Error("Error saving mistakes");
    }
};

// Update the progress of a module
export const updateModulePercentage = async (level, module, percentage, userId) => {
    try {
        const response = await axios.post(`${API_URL}/p/progress/`, {
            level,
            module,
            percentage,
            userId,
        });
        return response.data;
    } catch (error) {
        console.error("Error updating module percentage:", error);
        throw new Error("Error updating module percentage");
    }
};
