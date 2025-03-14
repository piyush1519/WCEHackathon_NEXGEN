import { Router } from 'express';
import { userModel } from '../Models/user.js';

const router = Router();

// router.post('/updateStreak', async (req, res) => {
//   try {
//     const { userId, isCorrect } = req.body;
//     console.log(`backend userId ${userId} and ${isCorrect}`);

//     if (!userId) {
//       return res.status(400).json({ message: 'User ID is required' });
//     }

//     const user = await userModel.findById(userId);
//     console.log(user);

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     const currentDate = new Date();
//     const lastQuestionDate = user.lastStreakDate ? new Date(user.lastStreakDate) : null; // Using lastStreakDate instead
//     const timeDifference = lastQuestionDate ? currentDate - lastQuestionDate : 0;
//     const twentyFourHours = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

//     console.log(`lastQuestionDate: ${lastQuestionDate}`);
//     console.log(`timeDifference: ${timeDifference}`);
    
//     // Check if lastStreakDate is null (first question)
//     if (lastQuestionDate === null) {
//       if (isCorrect) {
//         user.streak = 1;
//         user.lastStreakDate = currentDate; // Update lastStreakDate field
//         await user.save();
//         return res.status(200).json({
//           streak: user.streak,
//           message: 'First question answered correctly! Streak started.',
//         });
//       } else {
//         user.streak = 0;
//         user.lastStreakDate = currentDate; // Update lastStreakDate field
//         await user.save();
//         return res.status(200).json({
//           streak: 0,
//           message: 'First question answered incorrectly. Streak reset.',
//         });
//       }
//     }

//     // Check if more than 24 hours have passed
//     if (timeDifference >= twentyFourHours) {
//       console.log("true greater than 24 hours");
//       user.streak = 0; // Reset streak after 24 hours of inactivity

//       user.lastStreakDate = currentDate; // Update the last streak date (lastStreakDate)
//       await user.save(); // Save the updated user

//       return res.status(200).json({
//         streak: user.streak,
//         message: isCorrect ? 'Correct answer! Streak started.' : 'Incorrect answer. Streak reset.',
//       });
//     }

//     // If less than 24 hours have passed, update streak if answer is correct
//     if (timeDifference < twentyFourHours) {
//       console.log("true less than 24 hours");

//       if (isCorrect) {
        
//         user.streak += 1; // Increment streak if the answer is correct
//         console.log(`incremented streak: ${user.streak}`);
//       } else {
//         user.streak = 0; // Reset streak if the answer is incorrect
//       }

//       user.lastStreakDate = currentDate; // Update the last question date (lastStreakDate)
//       await user.save(); // Save the updated user

//       return res.status(200).json({
//         streak: user.streak,
//         message: isCorrect ? 'Correct answer! Streak updated.' : 'Incorrect answer. Streak reset.',
//       });
//     }

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });



router.post('/updateStreakAttempted/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { isAttempted } = req.body; 

    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.streakAttempted = isAttempted;
    await user.save();
    res.status(200).json({ message: 'Streak Attempted status updated.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});



router.get('/getStreakAttempted/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ streakAttempted: user.streakAttempted });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});



router.post('/updateStreak/:userId', async (req, res) => {
  try {
    const { userId } = req.params;  
    const { isCorrect } = req.body; 

    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const currentDate = new Date();
    const lastStreakDate = user.lastStreakDate ? new Date(user.lastStreakDate) : null;

    let message;
    if (!lastStreakDate) {
      
      user.streak = user.streakAttempted ? 1 : 0;
      message = user.streakAttempted
        ? 'First question answered correctly! Streak started.'
        : 'First question answered incorrectly. Streak reset.';
    } else {
      
      if (user.streakAttempted && isCorrect) {
        user.streak = user.streak + 1;
      } else {
        user.streak = 0;
      }
      message = user.streakAttempted
        ? 'Question answered correctly! Streak incremented.'
        : 'Question answered incorrectly. Streak reset.';
    }

    user.lastStreakDate = currentDate;
    await user.save();

    res.status(200).json({ streak: user.streak, message });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});




router.get('/getStreak/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ streak: user.streak });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});



export default router;