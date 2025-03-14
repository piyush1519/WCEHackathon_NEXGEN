import express from 'express';
const router = express.Router();
import Mistake from '../Models/mistakes.js';



router.post('/save-mistakes', async (req, res) => {
    try {
        const { mistakes, userId } = req.body;
  
        console.log("Request Body:", req.body);
  
        if (!mistakes || mistakes.length === 0) {
            return res.status(400).json({ error: 'No mistakes to save.' });
        }
  
        if (!userId) {
            return res.status(400).json({ error: 'User ID is required.' });
        }
  
        if (!Array.isArray(mistakes)) {
            return res.status(400).json({ error: 'Mistakes should be an array.' });
        }
  
        let userMistakes = await Mistake.findOne({ user: userId });
  
        if (!userMistakes) {
            userMistakes = new Mistake({
                user: userId,
                mistakes: [],
            });
        }
  
        const existingMistakesSet = new Set(
            userMistakes.mistakes.map((mistake) => mistake.correctAnswer)
        );
  
        const uniqueMistakes = mistakes.filter(
            (mistake) => !existingMistakesSet.has(mistake.correctAnswer)
        );
  
        if (uniqueMistakes.length > 0) {
            userMistakes.mistakes.push(
                ...uniqueMistakes.map((mistake) => ({
                    ...mistake,
                    timestamp: new Date(), 
                }))
            );
  
            await userMistakes.save();
        }
  
        return res.status(200).json({
            message: 'Mistakes saved successfully.',
            savedMistakes: uniqueMistakes, 
        });
    } catch (error) {
        console.error('Error saving mistakes:', error);
        return res.status(500).json({ error: 'An error occurred while saving mistakes.' });
    }
});


router.get('/get-mistakes', async (req, res) => {
    const { userId } = req.query;
    //console.log(userId);
    
    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    try {
        const mistakes = await Mistake.find({ user: userId }); 
        
        if (!mistakes || mistakes.length === 0) {
            return res.status(404).json({ error: 'No mistakes found for this user' });
        }

        res.json({ mistakes });
    } catch (err) {
        console.error('Error fetching mistakes:', err); 
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
