import express from 'express';
import mongoose from 'mongoose'; 
import Level from '../Models/Question.js';

const router = express.Router();



router.post('/level/:level/modules/:module/questions', async (req, res) => {
  const { question, options, answer, hint } = req.body;

  try {
    const { levelId, moduleId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(levelId) || !mongoose.Types.ObjectId.isValid(moduleId)) {
      return res.status(400).json({ message: 'Invalid levelId or moduleId' });
    }

    const levelObjectId = new mongoose.Types.ObjectId(levelId);
    const moduleObjectId = new mongoose.Types.ObjectId(moduleId);

    const level = await Level.findById(levelObjectId);
    if (!level) return res.status(404).json({ message: 'Level not found' });

    const module = level.modules.id(moduleObjectId);
    if (!module) return res.status(404).json({ message: 'Module not found' });

    module.questions.push({ question, options, answer, hint });

    await level.save();

    res.status(201).json(module);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.get('/:level/modules/:moduleId/:emotion', async (req, res) => {
  const { level, moduleId , emotion} = req.params;
  //console.log(`Processing request for module ${moduleId} at level ${level}`);

    try {
      const levelData = await Level.findOne({
        level: parseInt(level), 
      });

      if (!levelData) {
        console.log('Level not found');
        return res.status(404).json({ message: 'Level not found' });
      }

      const module = levelData.modules.find(
        (mod) => mod.moduleNumber === parseInt(moduleId)
      );
      if (!module) {
        console.log('Module not found in level data');
        return res.status(404).json({ message: 'Module not found' });
      }

      console.log(emotion);
      
      // Filter questions by emotion
      const filteredQuestions = module.questions.filter(q => q.emotion === emotion);

      if (filteredQuestions.length === 0) {
        console.log('No questions found for this emotion');
        return res.status(404).json({ message: 'No questions found for this emotion' });
      }

      //console.log(filteredQuestions);
      
      return res.json({ questions: filteredQuestions });
  } catch (error) {
      console.error('Error fetching questions:', error);
      res.status(500).json({ message: 'Server Error' });
  }

});




export default router;
