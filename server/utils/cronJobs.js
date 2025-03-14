// import cron from 'node-cron';
// import { fetchAndStoreDailyQuestion } from '../services/getDailyQuestion.js';

// export const scheduleDailyQuestionJob = () => {
//   cron.schedule('0 0 * * *', async () => {
//     console.log('Running daily question fetch task...');
//     await fetchAndStoreDailyQuestion();
//   });
// };


// import { userModel } from '../Models/user.js';

// // Schedule the task to run once every 24 hours
// cron.schedule('0 0 * * *', async () => {
//   try {
//     console.log('Resetting streakAttempted for all users...');
//     await userModel.updateMany({}, { $set: { streakAttempted: false } });
//     console.log('streakAttempted reset successfully.');
//   } catch (error) {
//     console.error('Error resetting streakAttempted:', error);
//   }
// });
