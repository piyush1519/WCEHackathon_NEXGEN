import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ type: mongoose.Schema.Types.Mixed }],
  answer: { type: String, required: true }, 
  hint: { type: String, required: true }, 
  emotion: { type: String, required: true, default: "emotionLess" },
});

const moduleSchema = new mongoose.Schema({
  moduleNumber: { type: Number, required: true },  
  moduleName: { type: String, required: true },
  questions: [questionSchema], 
});

const levelSchema = new mongoose.Schema({
  level: { type: Number, required: true },
  fluency: { type: String, required: true },
  modules: [moduleSchema], 
});

const Level = mongoose.model('Level', levelSchema);

export default Level;


