import dotenv from 'dotenv';
dotenv.config();  // Load .env file

import mongoose from 'mongoose';
import Level from './Question.js';
// import { DailyQuestion } from './dailyNewQuestion.js';

const mongo_url = process.env.MONGO_CONN;

mongoose.connect(mongo_url, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log("mongodb connected...");
})
.catch((error) => {
    console.log("mongodb not connected: ", error);
});

// const sampleData = {
    
//         level: 1,
//         fluency: "Beginner",
//         modules: [
//             {
//                 moduleNumber: 4,
//                 moduleName: "Feelings and Emotions",
//                 questions: [
//                     // Angry
//                     { 
//                         question: "What might you say if you are very angry?",
//                         options: ["I feel furious!", "I'm so happy!", "I'm excited!", "I love this!"],
//                         answer: "I feel furious!",
//                         hint: "It means feeling very upset.",
//                         emotion:"Angry"	
//                     },
//                     {
//                         question: "If someone is shouting and upset, what feeling might they have?",
//                         options: ["Happy", "Angry", "Relaxed", "Excited"],
//                         answer: "Angry",
//                         hint: "People often raise their voice when they feel this way.",
//                         emotion:"Angry"	
//                     },
//                     {
//                         question: "What is a good way to calm down when you're angry?",
//                         options: ["Take deep breaths", "Shout louder", "Throw things", "Ignore it"],
//                         answer: "Take deep breaths",
//                         hint: "Helps to relax and reduce anger.",
//                         emotion:"Angry"	
//                     },
//                     {
//                         question: "What color is often used to show anger?",
//                         options: ["Blue", "Red", "Yellow", "Green"],
//                         answer: "Red",
//                         hint: "It is the color of fire and strong emotions.",
//                         emotion:"Angry"	
//                     },
//                     {
//                         question: "Which action shows anger?",
//                         options: ["Smiling", "Frowning", "Laughing", "Jumping"],
//                         answer: "Frowning",
//                         hint: "People do this with their eyebrows when upset.",
//                         emotion:"Angry"	
//                     },
    
//                     // Sad
//                     {
//                         question: "How might someone feel after losing a something valuable?",
//                         options: ["Sad", "Excited", "Angry", "Happy"],
//                         answer: "Sad",
//                         hint: "They might cry or feel down.",
//                         emotion:"Sad"	
//                     },
//                     {
//                         question: "What is a common reaction when someone is sad?",
//                         options: ["Crying", "Laughing", "Singing", "Jumping"],
//                         answer: "Crying",
//                         hint: "Tears often come out when feeling this way.",
//                         emotion:"Sad"
//                     },
//                     {
//                         question: "What might you say to comfort a sad friend?",
//                         options: ["It’s okay, I’m here for you.", "You should be sad forever.", "Go away!", "Be quiet!"],
//                         answer: "It’s okay, I’m here for you.",
//                         hint: "Kind words help when someone is feeling down.",
//                         emotion:"Sad"
//                     },
//                     {
//                         question: "Which activity might help when you feel sad?",
//                         options: ["Talking to a friend", "Ignoring it", "Staying alone", "Being mean"],
//                         answer: "Talking to a friend",
//                         hint: "Sharing feelings can help.",
//                         emotion:"Sad"
//                     },
//                     {
//                         question: "Which face shows sadness?",
//                         options: ["😊", "😢", "😡", "😂"],
//                         answer: "😢",
//                         hint: "It has a tear."
//                     },
    
//                     // Anxious
//                     {
//                         question: "What does it mean to feel anxious?",
//                         options: ["Worried", "Excited", "Happy", "Angry"],
//                         answer: "Worried",
//                         hint: "It happens when you are nervous about something.",
//                         emotion:"Anxious"
//                     },
//                     {
//                         question: "What is a good way to calm down when feeling anxious?",
//                         options: ["Take deep breaths", "Run away", "Ignore it", "Shout"],
//                         answer: "Take deep breaths",
//                         hint: "It helps to slow your heart rate.",
//                         emotion:"Anxious"
//                     },
//                     {
//                         question: "What is something that might make you anxious?",
//                         options: ["Taking a test", "Watching TV", "Eating lunch", "Playing games"],
//                         answer: "Taking a test",
//                         hint: "It happens when you are unsure about something important.",
//                         emotion:"Anxious"
//                     },
//                     {
//                         question: "What might someone do when they are anxious?",
//                         options: ["Bite their nails", "Laugh loudly", "Sing a song", "Sleep peacefully"],
//                         answer: "Bite their nails",
//                         hint: "It’s a nervous habit.",
//                         emotion:"Anxious"
//                     },
//                     {
//                         question: "What should you say to someone who feels anxious?",
//                         options: ["It’s okay, take your time.", "You should be scared!", "Run away!", "You are wrong!"],
//                         answer: "It’s okay, take your time.",
//                         hint: "Reassurance helps reduce anxiety.",
//                         emotion:"Anxious"
//                     },
    
//                     // Hurt
//                     {
//                         question: "If someone falls and gets a cut, what feeling might they have?",
//                         options: ["Hurt", "Happy", "Excited", "Relaxed"],
//                         answer: "Hurt",
//                         hint: "It happens when you get injured.",
//                         emotion:"Hurt"
//                     },
//                     {
//                         question: "What do you say to someone who is hurt?",
//                         options: ["Are you okay?", "You should cry more!", "That’s funny!", "Ignore it."],
//                         answer: "Are you okay?",
//                         hint: "It shows concern.",
//                         emotion:"Hurt"
//                     },
//                     {
//                         question: "What might someone do when they feel hurt?",
//                         options: ["Cry", "Laugh", "Dance", "Sing"],
//                         answer: "Cry",
//                         hint: "It happens when someone is in pain.",
//                         emotion:"Hurt"
//                     },
//                     {
//                         question: "If you get hurt, what should you do?",
//                         options: ["Tell an adult", "Ignore it", "Run away", "Stay quiet"],
//                         answer: "Tell an adult",
//                         hint: "They can help you feel better.",
//                         emotion:"Hurt"
//                     },
//                     {
//                         question: "Which face shows someone who is hurt?",
//                         options: ["😊", "😢", "😡", "😂"],
//                         answer: "😢",
//                         hint: "They look like they are in pain.",
//                         emotion:"Hurt"
//                     },
//                     // Embarrassed
//                     {
//                         question: "What might make someone feel embarrassed?",
//                         options: ["Tripping in front of others", "Winning a prize", "Getting a hug", "Eating lunch"],
//                         answer: "Tripping in front of others",
//                         hint: "It happens when people feel awkward or shy.",
//                         emotion:"Embarrassed"
//                     },
//                     {
//                         question: "What does someone do when they feel embarrassed?",
//                         options: ["Blush", "Jump", "Laugh loudly", "Run away"],
//                         answer: "Blush",
//                         hint: "Their face might turn red.",
//                         emotion:"Embarrassed"
//                     },
//                     {
//                         question: "What can you say to help a friend who is embarrassed?",
//                         options: ["It’s okay, everyone makes mistakes.", "You should feel bad!", "That was funny!", "Ignore it!"],
//                         answer: "It’s okay, everyone makes mistakes.",
//                         hint: "Kind words help people feel better.",
//                         emotion:"Embarrassed"
//                     },
//                     {
//                         question: "Which situation might make you feel embarrassed?",
//                         options: ["Forgetting your words while speaking", "Getting a gift", "Eating a snack", "Watching TV"],
//                         answer: "Forgetting your words while speaking",
//                         hint: "It can happen when speaking in front of others.",
//                         emotion:"Embarrassed"
//                     },
//                     {
//                         question: "What should you do when you feel embarrassed?",
//                         options: ["Take a deep breath", "Run away", "Stay silent forever", "Shout"],
//                         answer: "Take a deep breath",
//                         hint: "It helps to calm down.",
//                         emotion:"Embarrassed"
//                     },
    
//                     // Happy
//                     {
//                         question: "What might make someone feel happy?",
//                         options: ["Getting a gift", "Losing a toy", "Falling down", "Breaking something"],
//                         answer: "Getting a gift",
//                         hint: "It is something enjoyable.",
//                         emotion:"Happy"
//                     },
//                     {
//                         question: "What do people do when they feel happy?",
//                         options: ["Smile", "Cry", "Frown", "Yell"],
//                         answer: "Smile",
//                         hint: "Their face lights up.",
//                         emotion:"Happy"
//                     },
//                     {
//                         question: "Which of these shows happiness?",
//                         options: ["😊", "😢", "😡", "😟"],
//                         answer: "😊",
//                         hint: "It has a bright expression.",
//                         emotion:"Happy"
//                     },
//                     {
//                         question: "What is something fun that makes people happy?",
//                         options: ["Playing games", "Losing something", "Getting sick", "Falling down"],
//                         answer: "Playing games",
//                         hint: "It is an enjoyable activity.",
//                         emotion:"Happy"
//                     },
//                     {
//                         question: "How can you make a sad friend feel happy?",
//                         options: ["Tell them a joke", "Ignore them", "Make them cry more", "Be mean"],
//                         answer: "Tell them a joke",
//                         hint: "Laughter makes people feel better.",
//                         emotion:"Happy"
//                     }
//                 ]
//             }
    
//         ]
//       };


// const sampleData = {
//     level: 12,
//     fluency: "Beginner", 
//     modules: [
//         {
//             moduleNumber: 1,
//             moduleName: "Feelings and Emotions",
//             questions:
// 		[
//     {
//         question: "If your day was a storm, how would it be?",
//         options: ["A thunderstorm with lightning", "A refreshing summer rain", "A long, heavy downpour", "Dark clouds before a storm"],
//         answer: "A refreshing summer rain",
//         hint: "Think about how your day feels like a storm.",
//         emotion: "Mood"
//     },
//     {
//         question: "What do you feel like doing right now?",
//         options: ["Breaking something to release energy", "Laughing with friends", "Lying in bed all day", "Worrying about everything"],
//         answer: "Laughing with friends",
//         hint: "Imagine what would feel right at this moment.",
//         emotion: "Mood"
//     },
//     {
//         question: "If you were walking alone on a road, how would you feel?",
//         options: ["Frustrated at slow walkers", "Excited to explore", "Lost and tired", "Afraid of what’s ahead"],
//         answer: "Excited to explore",
//         hint: "Your surroundings affect your feelings.",
//         emotion: "Mood"
//     },
//     {
//         question: "Which animal matches your mood today?",
//         options: ["A roaring lion", "A playful dolphin", "A sleepy panda", "A restless bird"],
//         answer: "A playful dolphin",
//         hint: "Animals express different emotions too.",
//         emotion: "Mood"
//     },
//     {
//         question: "If someone interrupted you while working, how would you react?",
//         options: ["Get irritated and snap", "Smile and chat with them", "Feel too drained to respond", "Feel nervous about getting delayed"],
//         answer: "Smile and chat with them",
//         hint: "Your reaction shows your current mood.",
//         emotion: "Mood"
//     },
//     {
//         question: "What kind of dream would you likely have tonight?",
//         options: ["Fighting or arguing", "A fun party or adventure", "A lonely, quiet place", "A stressful situation"],
//         answer: "A fun party or adventure",
//         hint: "Dreams reflect your emotions.",
//         emotion: "Mood"
//     },
//     {
//         question: "If your thoughts were a sound, what would they be?",
//         options: ["Loud shouting", "Cheerful music", "Soft whispering", "A fast, ticking clock"],
//         answer: "Cheerful music",
//         hint: "Sounds can represent your feelings.",
//         emotion: "Mood"
//     },
//     {
//         question: "How would you describe your energy level today?",
//         options: ["Explosive and impatient", "Bouncy and full of energy", "Drained and exhausted", "Restless but unable to focus"],
//         answer: "Bouncy and full of energy",
//         hint: "Your energy often shows how you feel.",
//         emotion: "Mood"
//     }
// ]

	
// 	}
// 	]
// }


//   const addSampleData = async () => {
//     try {
//         // Create a new Level document and insert sample data
//         const level = new Level(sampleData);
//         await level.save();
//         console.log('Sample data added successfully');
//     } catch (error) {
//         console.error('Error adding sample data:', error);
//     }
// };

// // Run the function to add sample data
// addSampleData();


// const addMultipleQuestions = async () => {
//     const questions = [
//       {
//         question: 'What is the capital of Japan?',
//         correctAnswer: 'Tokyo',
//         incorrectAnswers: ['Seoul', 'Beijing', 'Bangkok'],
//         date: new Date('2025-01-02T00:00:00Z'),
//         expiresAt: new Date('2025-01-03T00:00:00Z'),
//       },
//       {
//         question: 'What is the largest planet in our solar system?',
//         correctAnswer: 'Jupiter',
//         incorrectAnswers: ['Earth', 'Mars', 'Saturn'],
//         date: new Date('2025-01-03T00:00:00Z'),
//         expiresAt: new Date('2025-01-04T00:00:00Z'),
//       },
//       {
//         question: 'Who developed the theory of relativity?',
//         correctAnswer: 'Albert Einstein',
//         incorrectAnswers: ['Isaac Newton', 'Galileo Galilei', 'Nikola Tesla'],
//         date: new Date('2025-01-04T00:00:00Z'),
//         expiresAt: new Date('2025-01-05T00:00:00Z'),
//       },
//     ];
  
//     try {
//       await DailyQuestion.insertMany(questions);
//       console.log('Questions added successfully!');
//     } catch (error) {
//       console.error('Error adding multiple questions:', error);
//     }
//   };
  
//   addMultipleQuestions();
  