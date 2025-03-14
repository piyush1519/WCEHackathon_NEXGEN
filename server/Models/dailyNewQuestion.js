// import mongoose from 'mongoose';

// const { Schema } = mongoose;

// const dailyQuestionSchema = new Schema({
//   question: { type: String, required: true },
//   correctAnswer: { type: String, required: true },
//   incorrectAnswers: { type: [String], required: true },
//   date: { type: Date, default: Date.now, unique: true },
//   expiresAt: { type: Date, required: true }, 
// });

// //automatic deletion
// dailyQuestionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// export const DailyQuestion = mongoose.model('DailyQuestion', dailyQuestionSchema);
