// import express from 'express';
// import { getDailyQuestion } from '../services/getDailyQuestion.js';
// import { DailyQuestion } from '../Models/dailyNewQuestion.js';


// const router = express.Router();

// //In your routes file (e.g., `dailyNewRoute.js`)
// router.get('/dailyQuestion', async (req, res) => {
//     try {
//       const question = await getDailyQuestion();
//       //console.log(`backend question ${question}`);
//         // Ensure `getDailyQuestion` function is properly defined and fetching the data
//       if (!question) {
//         return res.status(404).json({ message: 'No question available for today' });
//       }
//       res.status(200).json(question);
//     } catch (error) {
//       console.error('Error fetching daily question:', error);
//       res.status(500).json({ message: 'Server error' });
//     }
//   });
  


// // router.get('/dailyQuestion', async (req, res) => {
// //   try {
// //     // Fetch the question for today based on the date logic
// //     const today = new Date();
// //     const question = await DailyQuestion.findOne({
// //       date: { $lte: today },
// //       expiresAt: { $gte: today }
// //     }).sort({ date: -1 }); 

// //     if (!question) {
// //       return res.status(404).json({ message: 'No question available for today' });
// //     }

// //     const questionData = {
// //       question: question.question,
// //       options: [question.correctAnswer, ...question.incorrectAnswers].sort(() => Math.random() - 0.5), // Shuffle options
// //       correctAnswer: question.correctAnswer
// //     };

// //     res.status(200).json(questionData); 
// //   } catch (error) {
// //     console.error('Error fetching daily question:', error);
// //     res.status(500).json({ message: 'Server error' });
// //   }
// // });




// export default router;
