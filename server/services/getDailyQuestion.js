// import axios from 'axios';
// import { DailyQuestion } from '../Models/dailyNewQuestion.js';


// // Function to get today's date in UTC
// const getUTCToday = () => {
//   const today = new Date();
//   today.setHours(0, 0, 0, 0); // Set to midnight UTC
//   return today.toISOString().split('T')[0]; 
// };

// // Fetch today's daily question
// export const getDailyQuestion = async () => {
//   const today = getUTCToday();
//   console.log('Today (UTC):', today);
//   const response = await DailyQuestion.findOne({
//     date: today
//   }).exec();

//   console.log('Fetched question:', response);

//   if (response) {
//     return response;
//   } else {
//     console.log('No question available for today');
//     return null;
//   }
// };


// export const fetchAndStoreDailyQuestion = async () => {
//   try {
//     const response = await axios.get('https://opentdb.com/api.php?amount=1&category=9&type=multiple');
//     const questionData = response.data.results[0];
    
//     const newQuestion = {
//       question: questionData.question,
//       correctAnswer: questionData.correct_answer,
//       incorrectAnswers: questionData.incorrect_answers,
//       date: getUTCToday(), // Format as YYYY-MM-DD
//       expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // Expiration in 24 hours
//     };

//     const today = getUTCToday();
//     await DailyQuestion.findOneAndUpdate({ date: today }, newQuestion, { upsert: true })
//       .then(result => {
//         console.log('Update or Insert result:', result);
//       })
//       .catch(err => {
//         console.error('Error updating daily question:', err);
//       });

//     console.log('Daily question fetched and stored:', newQuestion);
//   } catch (error) {
//     console.error('Error fetching or storing daily question:', error);
//   }
// };
