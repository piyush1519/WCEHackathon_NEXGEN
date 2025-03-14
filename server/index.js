

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'; 
import authRoutes from './routes/authRoutes.js';
import wordRoutes from './routes/wordRoutes.js'; 
import ttsRoutes from './routes/ttsRoutes.js'; 
import mistakeRoutes from './routes/mistakeRoutes.js';
import progressRoute from './routes/progressRoute.js';
import newQues from './routes/newQues.js';
import streakRoute from './routes/streakRoute.js';
// import dailyNewRoute from './routes/dailyNewRoute.js';

// Environment variable initialization
 import dotenv from 'dotenv';
 dotenv.config();

// MongoDB connection
 import './Models/db.js';
// import { scheduleDailyQuestionJob } from './utils/cronJobs.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


// Routes
app.use("/auth", authRoutes);
app.use("/word", wordRoutes);
app.use("/api", ttsRoutes);
app.use("/mistake", mistakeRoutes);
app.use("/p", progressRoute);
app.use("/levels", newQues);
app.use("/daily", streakRoute);
// app.use("/new", dailyNewRoute);
// scheduleDailyQuestionJob()




// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
