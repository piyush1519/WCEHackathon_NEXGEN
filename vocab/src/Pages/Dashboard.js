import React, { useContext, useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { NavBarTwo } from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../ApiCall/userContext";
import { SideBar } from '../components/SideBar';
import { optionButton as OptionButton } from '../components/Button';
import axios from "axios";
import {
  fetchDailyQuestion,
  fetchProgressByLevel,
  fetchQuestions,
  updateUserStreak,
} from "../ApiCall/api";
import ModalComponent from "../components/ModalComp";

function Dashboard() {
  const [expandedLevel, setExpandedLevel] = useState(null);
  const [progressDataByLevel, setProgressDataByLevel] = useState({});
  const [question, setQuestion] = useState(null);
  const [level, setLevel] = useState(null);
  const [module, setModule] = useState(false);
  const [streak, setStreak] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [questionChanged, setQuestionChanged] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  // const [dailyQuestionAttempted, setDailyQuestionAttempted] = useState(
  //   () => JSON.parse(localStorage.getItem("dailyQuestionAttempted")) || false
  const [EmotionPopUp, setEmotionPopUp] = useState(true);
  const [Emotion, setEmotion] = useState(null);
  
  const [EmoQuestions, setEmoQuestions] = useState([]);
  const [EmofetchError, setEmoFetchError] = useState("");

  const EmoLevel = 12;
  const EmoModule = 1;
  // );

  const [dailyQuestionAttempted, setDailyQuestionAttempted] = useState(false)
  //console.log(`dailt Question: ${dailyQuestionAttempted}`);
  

  const navigate = useNavigate();
  const { userId } = useContext(UserContext);

  const minimumModules = [
    { color: "#664419", shadow: "2px 2px 8px #161101, inset 3px 3px 14px #BA8A30, inset -12px -12px 45px #2B1A02" },
    { color: "#B37212", shadow: "2px 2px 8px #574002, inset 3px 3px 8px #8F6921, inset -12px -12px 45px #85530A" },
    { color: "#FCF4D5", shadow: "2px 2px 8px #574002, inset 3px 3px 8px #DCBD82, inset -12px -12px 45px #B37212" },
  ];

  const shuffleOptions = (questionData) => {
    const { correctAnswer, incorrectAnswers = [] } = questionData;
    const options = [correctAnswer, ...incorrectAnswers];
    setShuffledOptions(options.sort(() => Math.random() - 0.5));
  };

  const toggleSidebar = () => {
    setSidebarVisible((prev) => !prev);
  };

  const { question: questionText, correctAnswer, incorrectAnswers = [] } = question || {};
  const options = shuffledOptions;

  const handleToggleLevel = (level) => {
    setExpandedLevel((prevLevel) => (prevLevel === level ? null : level));
  };

  const handleLevelClick = (selectedLevel) => {
    setLevel(selectedLevel);
    setModule(null); 
  };

  const handleModuleClick = (level, moduleIndex, Emotion) => {
    navigate(`/hello/${level + 1}/${moduleIndex + 1}/${Emotion}`);
    
    
  };

  useEffect(() => {
    setSelectedOption(null);
    setIsAnswered(false);
    setQuestionChanged(true);
  }, [questionText]);


  //to find if daily question attempted or not 
  useEffect(() => {
    
    
    const fetchtStreakAttempted = async (userId) => {
      try {
        console.log("UserId:", userId); // Log userId to check its value
        const response = await axios.get(`http://localhost:5000/daily/getStreakAttempted/${userId}`);
        setDailyQuestionAttempted(response.data.streakAttempted || false);
      } catch (error) {
        console.error('Error fetching daily question status:', error);
      }
    };
  
    if (userId) {
      fetchtStreakAttempted(userId);
    } else {
      console.log("User ID is not set in dashboard ");
    }
  }, [userId]);
  
  
  

 
  const postStreakAttempted = async (userId, isAttempted) => {
    try {
      const response = await axios.post(`http://localhost:5000/daily/updateStreakAttempted/${userId}`, {
        isAttempted, // Pass isAttempted in the body
      });
  
      if (response.data.message === 'Streak Attempted status updated.') {
        console.log(response.data.message);
      }
    } catch (error) {
      console.error('Error updating streakAttempted:', error);
    }
  };
  

  

 

  const levels = [1, 2, 3, 4, 5, 6, 7];

  const handleOptionClick = async (option) => {
    if (isAnswered) return;
  
    setSelectedOption(option);
    setIsAnswered(true);
    setDailyQuestionAttempted(true);
  
    const isCorrect = option === correctAnswer;
  
    try {
      // Update streakAttempted in the backend
      await postStreakAttempted(userId, true);
  
      // Optionally update streak after question attempt
      const response = await axios.post(`http://localhost:5000/daily/updateStreak/${userId}`,
        {
          isCorrect, // Pass isAttempted in the body
        }
      );
      setStreak(response.data.streak);
      console.log(response.data.message);
    } catch (error) {
      console.error("Error handling option click:", error);
    }
  };
  


  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const data = await fetchDailyQuestion();
        setQuestion(data);
        shuffleOptions(data);
      } catch (error) {
        console.error("Error fetching daily question:", error);
      }
    };

    if (!dailyQuestionAttempted) {
      fetchQuestion();
    }
  }, [dailyQuestionAttempted]);


  useEffect(() => {
    const fetchProgress = async () => {
      if (!level || !userId) return;
  
      try {
        // const response = await axios.get(`http://localhost:5000/p/progress/`, {
        //   params: { level, userId },
        // });

        // const backendProgressData = response.data.levels;
        const backendProgressData = await fetchProgressByLevel(level, userId);
        const currentLevelData = backendProgressData.find(
          (levelData) => levelData.level === level
        );
  
        const updatedProgressData = (currentLevelData?.modules || []).map(
          (module, index) => ({
            value: module?.value || 0,
            color: module?.color || minimumModules[index]?.color,
            shadow: module?.shadow || minimumModules[index]?.shadow,
          })
        );
  
        const finalProgressData = [
          ...updatedProgressData,
          ...minimumModules.slice(updatedProgressData.length),
        ];
  
        setProgressDataByLevel((prevData) => ({
          ...prevData,
          [level]: finalProgressData,
        }));
      } catch (error) {
        console.error("Error fetching progress Frontend:", error);
        setProgressDataByLevel((prevData) => ({
          ...prevData,
          [level]: minimumModules,
        }));
      }
    };
  
    fetchProgress();
  }, [level, userId]);



   useEffect(() => {
        
          const getEmoQuestions = async () => {
              try {
                  const fetchedQuestions = await fetchQuestions(EmoLevel, EmoModule, "Mood");
                  setEmoQuestions(fetchedQuestions);
              } catch (error) {
                  setEmoFetchError("Sorry, there was an issue fetching the questions. Please try again.");
              }
          };
  
          getEmoQuestions();
          
          
      }, []);

  const handleEmotionPopUp = (Emo, index) => {
    
      setEmotion(index%4);
      setEmotionPopUp(false)
};


const R = Math.floor(Math.random()*10+1)%8;
const Q= EmoQuestions[R];


  
console.log(`emotion Selected is ${Emotion}`);


  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "linear-gradient(180deg, #F4F3FF 0%, #D9D6FE 100%)",
        padding: 1,
      }}
    >
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "75%",
          zIndex: 10,
        }}
      >
        <NavBarTwo toggleSidebar={toggleSidebar} />
      </Box>

      <SideBar isVisible={isSidebarVisible} />

      <Box
        sx={{
          width: "85%",
          display: "flex",
          flex: 1,
          marginTop: "80px",
          height: "calc(100vh - 80px)",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            backgroundColor: "#EBE9FE",
            padding: "30px",
            gap: "30px",
            borderRadius: "15px",
            margin: "10px",
            boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Box
            sx={{
              width: "60%",
              padding: "20px",
              borderRadius: "15px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "30px",
              overflowY: "auto", 
              scrollBehavior: "smooth",
              "&::-webkit-scrollbar": {
                display: "none",
              },
              msOverflowStyle: "none", 
              scrollbarWidth: "none",
            
            }}
          >
            {levels.map((level, index) => (
              <Box key={index}>
                <Button
                  onClick={() => {
                    handleToggleLevel(index);
                    handleLevelClick(level)
                  }}
                  sx={{
                    left: expandedLevel === index ? "-170px" : "-150px",
                    width: expandedLevel === index ? "270%" : "230%",
                    height: "90px",
                    color: "#000",
                    padding: "10px 20px",
                    borderRadius: expandedLevel === index ? "20px" : "20px",
                    fontWeight: "bold",
                    boxShadow: expandedLevel === index
                      ? "none"
                      : "3px 3px 20px #462702, inset 30px 0px 16px rgba(255, 248, 248, 0.25), inset -20px -20px 40px #B5AC9E",
                    background: "#F4F3FF",
                    transition: "box-shadow 0.3s ease",
                  }}
                >

                  {/* Sentiment analysis */}
                  <ModalComponent open={EmotionPopUp} onClose={handleEmotionPopUp}>
  <Box
    sx={{
      padding: "20px",
      backgroundColor: "#fff",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      zIndex: 1000,
    }}
  >
    {/* Check if Q exists before accessing its properties */}
    {Q ? (
      <>
        <Typography>{Q.question}</Typography>

        {/* Check if options exist and have values */}
        {Q.options?.length > 0 ? (
          Q.options.map((Emo, index) => {
            const isSelected = Emotion === Emo;

            return (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <OptionButton
                  onClick={() => handleEmotionPopUp(Emo, index)}
                  isSelected={isSelected}
                  sx={{
                    cursor: "pointer",
                    width: "100%",
                  }}
                >
                  {Emo}
                </OptionButton>
              </Box>
            );
          })
        ) : (
          <Typography>No options available</Typography>
        )}
      </>
    ) : (
      <Typography>Loading question...</Typography>
    )}

    <button
      onClick={handleEmotionPopUp}
      style={{
        padding: "10px 20px",
        backgroundColor: "#FF6347",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        marginTop: "20px",
      }}
    >
      Close
    </button>
  </Box>
</ModalComponent>

                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: "1000",
                      color: "#462702",
                      textAlign: "center",
                    }}
                  >
                    Level {level}
                  </Typography>
                </Button>

                {expandedLevel === index && (
                  <Box
                    sx={{
                      marginLeft: "-170px",
                      width: "250%",
                      padding: "20px",
                      background: "#F6F0F0",
                      display: "flex",
                      flexDirection: "column",
                      gap: "20px",
                      boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
                      borderRadius: "10px",
                    }}
                  >
                    {(progressDataByLevel[level] || minimumModules).map(
                      (progress, idx) => (
                        <Box
                          onClick={() => handleModuleClick(index, idx, Emotion)}
                          key={idx}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            width: "100%",
                            gap: "10px",
                            position: "relative",
                          }}
                        >
                          <Box
                            sx={{
                              position: "relative",
                              width: "90%",
                              height: "50px",
                              backgroundColor: "transparent",
                              borderRadius: "120px",
                              overflow: "hidden",
                            }}
                          >
                            <Box
                              sx={{
                                position: "absolute",
                                left: 0,
                                top: 0,
                                height: "90%",
                                minWidth: "30%",
                                width: `${progress.value}%`,
                                backgroundColor: progress.color,
                                borderRadius: "20px",
                                transition: "width 0.5s ease-in-out",
                                boxShadow: progress.shadow,
                              }}
                            />
                            <Typography
                              sx={{
                                position: "absolute",
                                left: "20px",
                                top: "50%",
                                transform: "translateY(-50%)",
                                color: "#FFFFFF",
                                fontWeight: "900",
                                zIndex: 1,
                              }}
                            >
                              Module {idx + 1}
                            </Typography>
                          </Box>

                          <Typography
                            sx={{
                              fontSize: "18px",
                              color: "#462702",
                              fontWeight: "1000",
                              minWidth: "40px",
                              textAlign: "right",
                            }}
                          >
                            {progress.value}%
                          </Typography>
                        </Box>
                      ))}
                  </Box>
                )}
              </Box>
            ))}
          </Box>

          <Box
            sx={{
              background: "#FFFFFF",
              width: "40%",
              padding: "20px",
              borderRadius: "15px",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              '@media (max-width: 700px)': {
                display: 'none',
              },
            }}
          >
            {dailyQuestionAttempted ? (
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  color: "#FF6F00",
                  textAlign: "center",
                }}
              >
                Attempted
              </Typography>
            ) : (
              <>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    color: "#FF6F00",
                    textAlign: "center",
                  }}
                >
                  {questionText}
                </Typography>

                <Box
                  sx={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: "8px",
                    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
                    padding: "15px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  {options.map((option, index) => (
                    <Box
                      key={index}
                      sx={{
                        backgroundColor:
                          selectedOption === option
                            ? option === correctAnswer
                              ? "#A4DE8C" //green
                              : "#FFB5B5" //red
                            : "#FFE9C7", // default color
                        padding: "10px",
                        borderRadius: "5px",
                        cursor: "pointer",
                        "&:hover": {
                          backgroundColor: "#FDC32B",
                          color: "#FFFFFF",
                        },
                      }}
                      onClick={() => handleOptionClick(option)}
                    >
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: "bold",
                          textAlign: "center",
                        }}
                      >
                        {option}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </>
            )}
          </Box>

        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard;
