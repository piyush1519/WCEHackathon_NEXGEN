

import mongoose from 'mongoose';

const mistakeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  mistakes: [
    {
      question: { type: String, required: true },
      selectedAnswer: { type: String, required: true },
      correctAnswer: { type: String, required: true },
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

mistakeSchema.index({ 'mistakes.timestamp': 1 }, { expireAfterSeconds: 604800 });

const Mistake = mongoose.model('Mistake', mistakeSchema);

export default Mistake;
