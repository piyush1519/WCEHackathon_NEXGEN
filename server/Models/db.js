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


// const sampleData = {
//     level: 3,
//     fluency: "Advanced",
//     modules: [
//         {
//             moduleNumber: 1,
//             moduleName: "Expressing Emotions",
//             questions: [
//                     // Angry → Promoting Self-Control
//                     {
//                         question: "A wise person always chooses ___ over anger.",
//                         options: ["patience", "revenge", "blame", "shouting"],
//                         answer: "patience",
//                         hint: "Patience helps in avoiding unnecessary conflicts.",
//                         emotion: "Angry"
//                     },
//                     {
//                         question: "What is the best response to criticism?",
//                         options: ["understanding", "arguing", "shouting", "ignoring"],
//                         answer: "understanding",
//                         hint: "Understanding helps in growth and self-improvement.",
//                         emotion: "Angry"
//                     },
//                     {
//                         question: "True strength is shown through ___.",
//                         options: ["forgiveness", "aggression", "stubbornness", "anger"],
//                         answer: "forgiveness",
//                         hint: "Forgiveness brings inner peace.",
//                         emotion: "Angry"
//                     },
//                     {
//                         question: "Which quality helps in avoiding unnecessary arguments?",
//                         options: ["patience", "stubbornness", "irritation", "rage"],
//                         answer: "patience",
//                         hint: "Patience helps in handling tough situations calmly.",
//                         emotion: "Angry"
//                     },
//                     {
//                         question: "A calm mind leads to better ___.",
//                         options: ["decisions", "conflicts", "regrets", "fights"],
//                         answer: "decisions",
//                         hint: "Calmness helps in clear thinking.",
//                         emotion: "Angry"
//                     },

//                     // Sad → Encouraging Hopefulness
//                     {
//                         question: "Every new day is a new ___.",
//                         options: ["beginning", "failure", "regret", "problem"],
//                         answer: "beginning",
//                         hint: "Each day brings new opportunities.",
//                         emotion: "Sad"
//                     },
//                     {
//                         question: "Even in tough times, it’s important to have ___.",
//                         options: ["hope", "doubt", "fear", "regret"],
//                         answer: "hope",
//                         hint: "Hope keeps us moving forward.",
//                         emotion: "Sad"
//                     },
//                     {
//                         question: "Which word completes this sentence? 'Happiness grows when we practice ___.'",
//                         options: ["gratitude", "comparison", "complaints", "jealousy"],
//                         answer: "gratitude",
//                         hint: "Gratitude shifts focus to positive things.",
//                         emotion: "Sad"
//                     },
//                     {
//                         question: "True strength is shown when we choose ___ over giving up.",
//                         options: ["resilience", "regret", "sadness", "isolation"],
//                         answer: "resilience",
//                         hint: "Resilience helps in overcoming tough times.",
//                         emotion: "Sad"
//                     },
//                     {
//                         question: "Every setback is a lesson for future ___.",
//                         options: ["growth", "failure", "worry", "loss"],
//                         answer: "growth",
//                         hint: "Mistakes help in learning and improving.",
//                         emotion: "Sad"
//                     },

//                     // Happy → Reinforcing Positivity
//                     {
//                         question: "A happy heart is filled with ___.",
//                         options: ["kindness", "jealousy", "fear", "doubt"],
//                         answer: "kindness",
//                         hint: "Kindness makes happiness grow.",
//                         emotion: "Happy"
//                     },
//                     {
//                         question: "The secret to long-lasting happiness is ___.",
//                         options: ["contentment", "comparison", "worry", "perfection"],
//                         answer: "contentment",
//                         hint: "Being content brings true happiness.",
//                         emotion: "Happy"
//                     },
//                     {
//                         question: "What spreads when you smile at someone?",
//                         options: ["joy", "stress", "doubt", "fear"],
//                         answer: "joy",
//                         hint: "Smiles create positive energy.",
//                         emotion: "Happy"
//                     },
//                     {
//                         question: "What makes memories even better?",
//                         options: ["sharing", "forgetting", "ignoring", "avoiding"],
//                         answer: "sharing",
//                         hint: "Sharing happiness makes it more meaningful.",
//                         emotion: "Happy"
//                     },
//                     {
//                         question: "Which action brings happiness to both you and others?",
//                         options: ["helping", "judging", "criticizing", "arguing"],
//                         answer: "helping",
//                         hint: "Helping others spreads joy.",
//                         emotion: "Happy"
//                     },

//                     // Anxious → Promoting Relaxation & Confidence
//                     {
//                         question: "A peaceful mind comes from ___.",
//                         options: ["acceptance", "overthinking", "worry", "fear"],
//                         answer: "acceptance",
//                         hint: "Acceptance helps in reducing stress.",
//                         emotion: "Anxious"
//                     },
//                     {
//                         question: "To feel confident, I remind myself of my ___.",
//                         options: ["strengths", "weaknesses", "mistakes", "fears"],
//                         answer: "strengths",
//                         hint: "Focusing on strengths builds confidence.",
//                         emotion: "Anxious"
//                     },
//                     {
//                         question: "When facing challenges, it’s important to stay ___.",
//                         options: ["calm", "worried", "fearful", "hesitant"],
//                         answer: "calm",
//                         hint: "Calmness helps in making the right decisions.",
//                         emotion: "Anxious"
//                     },
//                     {
//                         question: "Fear disappears when we take ___.",
//                         options: ["action", "excuses", "regret", "avoidance"],
//                         answer: "action",
//                         hint: "Taking action removes fear.",
//                         emotion: "Anxious"
//                     },
//                     {
//                         question: "When overwhelmed, I take a moment to ___.",
//                         options: ["breathe", "panic", "give up", "overthink"],
//                         answer: "breathe",
//                         hint: "Breathing deeply helps in reducing stress.",
//                         emotion: "Anxious"
//                     },
//                     {
//                         question: "Which of the following sentences is in the active voice?",
//                         options: [
//                             "The book was read by John.",
//                             "John read the book.",
//                             "The book is being read by John.",
//                             "The book had been read by John."
//                         ],
//                         answer: "John read the book.",
//                         hint: "In active voice, the subject performs the action.",
//                         emotion: "None"
//                     },
//                     {
//                         question: "Choose the correct option to complete the sentence: 'I would have helped you if I ___ your problem earlier.'",
//                         options: ["knew", "know", "had known", "knows"],
//                         answer: "had known",
//                         hint: "Use the past perfect tense to refer to an unreal past situation in the third conditional.",
//                         emotion: "None"
//                     },
//                     {
//                         question: "Which of the following statements is an example of irony?",
//                         options: [
//                             "The firefighter's house burned down.",
//                             "She passed the test after studying hard.",
//                             "The sun set over the ocean.",
//                             "He went to the store to buy bread."
//                         ],
//                         answer: "The firefighter's house burned down.",
//                         hint: "Irony involves a contrast between what is expected and what actually happens.",
//                         emotion: "None"
//                     },
//                     {
//                         question: "Which of the following is the correct form of the word 'unbelievable' used in the sentence: 'Her performance was truly ___'?",
//                         options: ["unbelievably", "unbelieve", "unbelieving", "unbelievable"],
//                         answer: "unbelievably",
//                         hint: "The adverb form of 'unbelievable' is 'unbelievably'.",
//                         emotion: "None"
//                     },
//                     {
//                         question: "Which is the correct use of the colon (:)?",
//                         options: [
//                             "She has three hobbies: reading, painting, and hiking.",
//                             "She has three hobbies; reading, painting, and hiking.",
//                             "She has three hobbies, reading: painting, and hiking.",
//                             "She has three hobbies reading: painting, and hiking."
//                         ],
//                         answer: "She has three hobbies: reading, painting, and hiking.",
//                         hint: "A colon is used to introduce a list or explanation after an independent clause.",
//                         emotion: "None"
//                     }
//             ]
            
//         },
//         {
//             "moduleNumber": 2,
//             "moduleName": "Mastering Emotional Resilience",
//             "questions": [
//                     // Angry → Cultivating Emotional Intelligence
//                     {
//                         "question": "True emotional strength is shown through ___.",
//                         "options": ["self-control", "aggression", "impulsiveness", "retaliation"],
//                         "answer": "self-control",
//                         "hint": "Mastering emotions leads to better outcomes.",
//                         "emotion": "Angry"
//                     },
//                     {
//                         "question": "Before reacting in anger, it is wise to consider ___.",
//                         "options": ["the consequences", "who is to blame", "how to argue", "revenge"],
//                         "answer": "the consequences",
//                         "hint": "Thinking ahead prevents regretful actions.",
//                         "emotion": "Angry"
//                     },
//                     {
//                         "question": "Transforming anger into ___ leads to personal growth.",
//                         "options": ["understanding", "revenge", "blame", "resentment"],
//                         "answer": "understanding",
//                         "hint": "Understanding turns conflict into opportunity.",
//                         "emotion": "Angry"
//                     },
//                     {
//                         "question": "What is the most constructive way to communicate frustration?",
//                         "options": ["calm discussion", "yelling", "silent treatment", "blaming"],
//                         "answer": "calm discussion",
//                         "hint": "Calm conversations resolve conflicts better.",
//                         "emotion": "Angry"
//                     },
//                     {
//                         "question": "Which mindset helps turn conflict into connection?",
//                         "options": ["empathy", "hostility", "stubbornness", "criticism"],
//                         "answer": "empathy",
//                         "hint": "Empathy allows for deeper understanding.",
//                         "emotion": "Angry"
//                     },
        
//                     // Sad → Encouraging Self-Compassion
//                     {
//                         "question": "What is the healthiest way to process sadness?",
//                         "options": ["self-reflection", "ignoring it", "isolating", "self-blame"],
//                         "answer": "self-reflection",
//                         "hint": "Understanding emotions helps in healing.",
//                         "emotion": "Sad"
//                     },
//                     {
//                         "question": "Challenging times teach us ___.",
//                         "options": ["resilience", "helplessness", "permanence", "defeat"],
//                         "answer": "resilience",
//                         "hint": "Difficult moments build inner strength.",
//                         "emotion": "Sad"
//                     },
//                     {
//                         "question": "To support my emotional well-being, I practice ___.",
//                         "options": ["self-care", "self-criticism", "overthinking", "avoidance"],
//                         "answer": "self-care",
//                         "hint": "Taking care of yourself is essential for healing.",
//                         "emotion": "Sad"
//                     },
//                     {
//                         "question": "Painful emotions are a sign of ___.",
//                         "options": ["growth", "weakness", "failure", "permanence"],
//                         "answer": "growth",
//                         "hint": "Every challenge teaches valuable lessons.",
//                         "emotion": "Sad"
//                     },
//                     {
//                         "question": "Which thought helps in overcoming sadness?",
//                         "options": ["This too shall pass", "Things will never get better", "I am stuck", "I am alone"],
//                         "answer": "This too shall pass",
//                         "hint": "Situations change, and emotions evolve.",
//                         "emotion": "Sad"
//                     },
        
//                     // Happy → Deepening Fulfillment
//                     {
//                         "question": "True happiness comes from ___.",
//                         "options": ["gratitude", "possessions", "external approval", "comparison"],
//                         "answer": "gratitude",
//                         "hint": "Gratitude shifts focus to what truly matters.",
//                         "emotion": "Happy"
//                     },
//                     {
//                         "question": "What enhances long-term happiness?",
//                         "options": ["meaningful connections", "short-term pleasures", "material wealth", "perfectionism"],
//                         "answer": "meaningful connections",
//                         "hint": "Relationships bring lasting joy.",
//                         "emotion": "Happy"
//                     },
//                     {
//                         "question": "What is a sign of a fulfilling life?",
//                         "options": ["purpose", "constant success", "never facing challenges", "seeking validation"],
//                         "answer": "purpose",
//                         "hint": "A meaningful life creates deeper happiness.",
//                         "emotion": "Happy"
//                     },
//                     {
//                         "question": "Which action strengthens inner peace?",
//                         "options": ["helping others", "seeking fame", "chasing perfection", "avoiding emotions"],
//                         "answer": "helping others",
//                         "hint": "Giving brings true satisfaction.",
//                         "emotion": "Happy"
//                     },
//                     {
//                         "question": "What is a key element of lasting joy?",
//                         "options": ["self-acceptance", "fear of failure", "external validation", "constant excitement"],
//                         "answer": "self-acceptance",
//                         "hint": "Being at peace with yourself leads to true happiness.",
//                         "emotion": "Happy"
//                     },
        
//                     // Anxious → Developing a Grounded Mindset
//                     {
//                         "question": "To reduce anxiety, I focus on what I can ___.",
//                         "options": ["control", "fear", "avoid", "ignore"],
//                         "answer": "control",
//                         "hint": "Focusing on actions helps reduce worry.",
//                         "emotion": "Anxious"
//                     },
//                     {
//                         "question": "A powerful way to manage stress is through ___.",
//                         "options": ["mindfulness", "overthinking", "worrying", "panic"],
//                         "answer": "mindfulness",
//                         "hint": "Being present calms the mind.",
//                         "emotion": "Anxious"
//                     },
//                     {
//                         "question": "When I feel overwhelmed, I remind myself to take ___.",
//                         "options": ["one step at a time", "everything at once", "nothing seriously", "unrealistic goals"],
//                         "answer": "one step at a time",
//                         "hint": "Breaking tasks down makes them manageable.",
//                         "emotion": "Anxious"
//                     },
//                     {
//                         "question": "What helps turn uncertainty into confidence?",
//                         "options": ["trusting myself", "seeking perfection", "avoiding risks", "staying afraid"],
//                         "answer": "trusting myself",
//                         "hint": "Believing in yourself builds confidence.",
//                         "emotion": "Anxious"
//                     },
//                     {
//                         "question": "Which thought reduces stress?",
//                         "options": ["I can handle this", "I will fail", "Everything is out of control", "I am not good enough"],
//                         "answer": "I can handle this",
//                         "hint": "A positive mindset makes challenges easier.",
//                         "emotion": "Anxious"
//                     },
//                             {
//                                 question: "Which sentence uses the correct form of the verb in the subjunctive mood?",
//                                 options: [
//                                     "I wish I was a better player.",
//                                     "I wish I were a better player.",
//                                     "I wish I am a better player.",
//                                     "I wish I will be a better player."
//                                 ],
//                                 answer: "I wish I were a better player.",
//                                 hint: "In the subjunctive mood, 'were' is used for all persons when expressing a hypothetical situation.",
//                                 emotion: "None"
//                             },
//                             {
//                                 question: "Choose the correct form of the verb: 'By the time she ___, the movie will have started.'",
//                                 options: ["arrives", "arrived", "has arrived", "will arrive"],
//                                 answer: "arrives",
//                                 hint: "Use the present simple tense after 'by the time' when referring to a future event.",
//                                 emotion: "None"
//                             },
//                             {
//                                 question: "Which of the following is an example of a metaphor?",
//                                 options: [
//                                     "Her voice is music to my ears.",
//                                     "She sings like an angel.",
//                                     "He runs as fast as lightning.",
//                                     "The stars danced in the sky."
//                                 ],
//                                 answer: "Her voice is music to my ears.",
//                                 hint: "A metaphor directly compares two things without using 'like' or 'as'.",
//                                 emotion: "None"
//                             },
//                             {
//                                 question: "Which of the following sentences is an example of parallel structure?",
//                                 options: [
//                                     "She enjoys reading, writing, and to swim.",
//                                     "She enjoys reading, writing, and swimming.",
//                                     "She enjoys to read, write, and swim.",
//                                     "She enjoys to read, writing, and swimming."
//                                 ],
//                                 answer: "She enjoys reading, writing, and swimming.",
//                                 hint: "In parallel structure, the items in a list must have the same grammatical form.",
//                                 emotion: "None"
//                             },
//                             {
//                                 question: "Which word is the best synonym for 'arduous'?",
//                                 options: ["Easy", "Difficult", "Quick", "Simple"],
//                                 answer: "Difficult",
//                                 hint: "A synonym is a word that has the same or a similar meaning.",
//                                 emotion: "None"
//                             }                 
//             ]
//         },
//         {
//             moduleNumber: 3,
//             moduleName: "Leadership & Wisdom from Indian Mythology",
//             questions: [
//                     // ANGRY → Calming Down (Mahabharata & Ramayana)
//                     {
//                         question: "Duryodhana was filled with jealousy and anger towards the Pandavas. Even when given many chances to make peace, he refused and chose war. This decision led to his downfall. What leadership mistake did Duryodhana make?",
//                         options: ["Arrogance", "Patience", "Wisdom", "Kindness"],
//                         answer: "Arrogance",
//                         hint: "A good leader controls anger and makes wise choices.",
//                         emotion: "Angry"
//                     },
//                     {
//                         question: "When Ravana was advised to return Sita peacefully, he ignored his ministers and let his anger control his decisions. This led to his defeat and destruction. What does this teach us about leadership?",
//                         options: ["Recklessness", "Calmness", "Patience", "Wisdom"],
//                         answer: "Recklessness",
//                         hint: "A good leader does not let anger cloud judgment.",
//                         emotion: "Angry"
//                     },
//                     {
//                         question: "Bhima wanted to take immediate revenge for Draupadi’s insult, but Krishna advised patience and strategy. What leadership lesson did Krishna teach Bhima?",
//                         options: ["Wisdom", "Hatred", "Revenge", "Impulsiveness"],
//                         answer: "Wisdom",
//                         hint: "A great leader plans before taking action.",
//                         emotion: "Angry"
//                     },
//                     {
//                         question: "Karna was insulted many times in his life, but instead of reacting with anger, he remained calm and focused on his goals. What quality did Karna display?",
//                         options: ["Patience", "Arrogance", "Hatred", "Revenge"],
//                         answer: "Patience",
//                         hint: "Staying calm helps in achieving great things.",
//                         emotion: "Angry"
//                     },
        
//                     // SAD → Encouraging Positivity (Mahabharata & Ramayana)
//                     {
//                         question: "After the Kurukshetra war, Yudhishthira was sad because of the destruction it caused. Even though he had won, he did not feel happy. Krishna guided him and reminded him of his duty to rule wisely. What leadership lesson does this teach?",
//                         options: ["Responsibility", "Fear", "Jealousy", "Arrogance"],
//                         answer: "Responsibility",
//                         hint: "A true leader takes responsibility even in difficult times.",
//                         emotion: "Sad"
//                     },
//                     {
//                         question: "Gandhari lost all her sons in the Kurukshetra war. Even though she was heartbroken, she chose to forgive instead of seeking revenge. What leadership trait does Gandhari’s action represent?",
//                         options: ["Forgiveness", "Revenge", "Hatred", "Anger"],
//                         answer: "Forgiveness",
//                         hint: "Forgiving others helps bring peace to the heart.",
//                         emotion: "Sad"
//                     },
//                     {
//                         question: "Vidura was a wise and honest advisor, but Duryodhana never listened to him. He remained loyal to truth even though it made him sad to see his advice ignored. What value did Vidura display?",
//                         options: ["Integrity", "Fear", "Jealousy", "Greed"],
//                         answer: "Integrity",
//                         hint: "Sticking to truth is the sign of a great leader.",
//                         emotion: "Sad"
//                     },
//                     {
//                         question: "Lord Rama accepted exile without complaint. Even though he lost his throne, he stayed strong and did not become sad. What value did Rama display?",
//                         options: ["Patience", "Fear", "Anger", "Arrogance"],
//                         answer: "Patience",
//                         hint: "A true leader stays strong in tough times.",
//                         emotion: "Sad"
//                     },
        
//                     // HAPPY → Strengthening Happiness (Mahabharata & Ramayana)
//                     {
//                         question: "When Lord Rama returned to Ayodhya, the entire kingdom celebrated with lamps and happiness. He ruled with fairness and justice, ensuring peace for everyone. What leadership quality did Rama display?",
//                         options: ["Justice", "Selfishness", "Hatred", "Doubt"],
//                         answer: "Justice",
//                         hint: "A good leader always puts duty before self.",
//                         emotion: "Happy"
//                     },
//                     {
//                         question: "Vidura, the wise advisor of the Kauravas, always gave just and fair advice. Even when Duryodhana ignored him, he stayed committed to truth and righteousness. What leadership quality did Vidura exhibit?",
//                         options: ["Wisdom", "Fear", "Greed", "Selfishness"],
//                         answer: "Wisdom",
//                         hint: "Good leaders always choose honesty and fairness.",
//                         emotion: "Happy"
//                     },
//                     {
//                         question: "Krishna was always smiling and spreading joy, even during serious situations. His ability to stay positive gave strength to his followers. What quality did Krishna show?",
//                         options: ["Optimism", "Anger", "Fear", "Laziness"],
//                         answer: "Optimism",
//                         hint: "A happy leader inspires others.",
//                         emotion: "Happy"
//                     },
//                     {
//                         question: "After the Kurukshetra war, Bhishma lay on a bed of arrows but remained calm and peaceful. He shared wisdom with Yudhishthira, ensuring future happiness for the kingdom. What value did Bhishma display?",
//                         options: ["Peace", "Hatred", "Revenge", "Fear"],
//                         answer: "Peace",
//                         hint: "A wise leader remains peaceful in all situations.",
//                         emotion: "Happy"
//                     },
        
//                     // ANXIOUS → Encouraging Relaxation (Mahabharata & Ramayana)
//                     {
//                         question: "Before the Kurukshetra war, Arjuna was anxious and did not want to fight. Krishna reminded him of his duty and gave him the wisdom to stay strong. What leadership quality did Krishna teach Arjuna?",
//                         options: ["Courage", "Fear", "Hesitation", "Doubt"],
//                         answer: "Courage",
//                         hint: "A good leader does not let fear stop them.",
//                         emotion: "Anxious"
//                     },
//                     {
//                         question: "Hanuman was given the difficult task of finding Sita in Lanka. At first, he doubted himself, but Jambavan reminded him of his strength. Hanuman then took a great leap across the ocean and completed his mission. What does Hanuman’s journey teach us?",
//                         options: ["Confidence", "Fear", "Hesitation", "Weakness"],
//                         answer: "Confidence",
//                         hint: "Believing in yourself removes self-doubt.",
//                         emotion: "Anxious"
//                     },
//                     {
//                         question: "Lakshmana had to stay awake for 14 years to protect Rama and Sita in the forest. Even when he felt tired, he never let worry take over. What quality did Lakshmana show?",
//                         options: ["Determination", "Fear", "Doubt", "Hesitation"],
//                         answer: "Determination",
//                         hint: "Staying focused helps overcome anxiety.",
//                         emotion: "Anxious"
//                     },
//                     {
//                         question: "Bhishma took a vow never to marry so that his father could be happy. Even though it was a big sacrifice, he never regretted it. What quality did Bhishma show?",
//                         options: ["Commitment", "Fear", "Jealousy", "Greed"],
//                         answer: "Commitment",
//                         hint: "A strong leader stands by their decisions.",
//                         emotion: "Anxious"
//                     },
//                     {
//                         question: "Which sentence correctly uses an idiom?",
//                         options: [
//                             "She was feeling under the weather, so she took a day off.",
//                             "He walked under the rain and got sick.",
//                             "She was under the light when she read the book.",
//                             "He is under the chair studying for his test."
//                         ],
//                         answer: "She was feeling under the weather, so she took a day off.",
//                         hint: "'Under the weather' means feeling unwell.",
//                         emotion: "None"
//                     },
//                     {
//                         question: "Which sentence correctly uses a **past perfect tense**?",
//                         options: [
//                             "Before the movie started, we had bought popcorn.",
//                             "Before the movie started, we buy popcorn.",
//                             "Before the movie started, we have bought popcorn.",
//                             "Before the movie started, we will buy popcorn."
//                         ],
//                         answer: "Before the movie started, we had bought popcorn.",
//                         hint: "Past perfect is used to describe an action completed before another past action.",
//                         emotion: "None"
//                     },
//                     {
//                         question: "Choose the correct transition word to complete the sentence: 'He was very tired; **___**, he continued working.'",
//                         options: ["However", "For example", "In conclusion", "Because"],
//                         answer: "However",
//                         hint: "'However' shows contrast between being tired and continuing to work.",
//                         emotion: "None"
//                     },
//                     {
//                         question: "Which of the following sentences uses the **correct order of adjectives**?",
//                         options: [
//                             "She adopted a brown small adorable puppy.",
//                             "She adopted an adorable small brown puppy.",
//                             "She adopted a small adorable brown puppy.",
//                             "She adopted a small brown adorable puppy."
//                         ],
//                         answer: "She adopted an adorable small brown puppy.",
//                         hint: "The correct order is: opinion → size → age → shape → color → origin → material → purpose.",
//                         emotion: "None"
//                     },
//                     {
//                         question: "Which word best completes the sentence? 'The teacher demanded that the students **___** their assignments on time.'",
//                         options: ["submit", "submits", "submitted", "submitting"],
//                         answer: "submit",
//                         hint: "After verbs like 'demand', 'suggest', 'insist', the **bare infinitive** is used.",
//                         emotion: "None"
//                     },
//             ]
//         },            
//     ]
// };




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
  