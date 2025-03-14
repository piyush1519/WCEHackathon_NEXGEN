import express from 'express';
import Progress from '../Models/Progress.js';
const router = express.Router();

router.post('/progress', async (req, res) => {
    const { userId, level, module, percentage } = req.body;
  
    // Validate input
    if (!userId || typeof userId !== 'string') {
      return res.status(400).json({ message: 'Invalid or missing userId' });
    }
  
    const levelNumber = Number(level);
    const moduleNumber = Number(module);
    const progressValue = Number(percentage);
  
    if (isNaN(levelNumber) || levelNumber < 1) {
      return res.status(400).json({ message: 'Invalid level number' });
    }
    if (isNaN(moduleNumber) || moduleNumber < 1) {
      return res.status(400).json({ message: 'Invalid module number' });
    }
    if (isNaN(progressValue) || progressValue < 0 || progressValue > 100) {
      return res.status(400).json({ message: 'Invalid percentage value' });
    }
  
    try {
      let progress = await Progress.findOne({ userId });
  
      if (!progress) {
        console.log("New user, creating progress record...");
        
        progress = new Progress({
          userId,
          levels: [],
          totalProgress: 0,
        });
      }
      const existingLevel = progress.levels.find(l => l.level === levelNumber);
  
      if (existingLevel) {
        // If the level exists, update the module progress for that level
        const existingModule = existingLevel.modules.find(m => m.moduleId === moduleNumber);
  
        if (existingModule) {
          if(existingModule.value <= progressValue){
            existingModule.value = progressValue;
            existingModule.completed = progressValue === 100;
          }
        } else {
          // If the module doesn't exist, add a new module
          existingLevel.modules.push({
            moduleId: moduleNumber,
            value: progressValue,
            completed: progressValue === 100,
          });
        }
  
        // Check if the level is fully completed (all modules complete)
        existingLevel.completed = existingLevel.modules.every(m => m.completed);
  
      } else {
        progress.levels.push({
          level: levelNumber,
          modules: [{
            moduleId: moduleNumber,
            value: progressValue,
            completed: progressValue === 100,
          }],
          completed: progressValue === 100,
        });
      }
  
      progress.totalProgress = progress.levels.filter(level => level.completed).length;
  
      await progress.save();
  
      res.status(200).json({ message: 'Progress updated successfully', data: progress });
  
    } catch (error) {
      console.error('Error updating progress:', error);
      res.status(500).json({ message: 'Error updating progress', error: error.message });
    }
  });
  


  router.get('/progress', async (req, res) => {
    const { userId } = req.query;
  
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }
  
    console.log(`Fetching progress for userID: ${userId}`);
  
    try {
      const progress = await Progress.findOne({ userId });
  
      if (!progress) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.json(progress);
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  






export default router;

