import React, { useEffect, useState, useContext } from "react";
import { Box, Typography } from '@mui/material'
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { WordContext } from "../ApiCall/WordContext";
import { UserContext } from "../ApiCall/userContext";
import { fetchQuestions, updateModulePercentage } from "../ApiCall/api";
import WordDetails from "../components/WordDetails";
import { optionButton as OptionButton } from '../components/Button';
import { loginButton as LoginButton } from '../components/Button';
import ModalComponent from "../components/ModalComp";
import { NavBarTwo } from "../components/NavBar";
import { SideBar } from "../components/SideBar";

const Quiz = () => {
    const { module, level, Emotion } = useParams();
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [mistakes, setMistakes] = useState([]);
    const [score, setScore] = useState(0);
    const [result, setResult] = useState("");
    const [showHint, setShowHint] = useState(false);
    const [showAnswerPopup, setShowAnswerPopup] = useState(false);
    
    const [testFinished, setTestFinished] = useState(false);
    const [percentage, setPercentage] = useState(0);
    const [translateSelectQ, setTranslateSelectQ] = useState(false);
    const [translateSelectA, setTranslateSelectA] = useState(false);
    const [translatedQuestions, setTranslatedQuestions] = useState([]);
    const [translatedAnswer, setTranslatedAnswer] = useState([]);
    const [isSidebarVisible, setSidebarVisible] = useState(false);
    

    const { userId, motherTongue } = useContext(UserContext);
    const { wordData, loading, error, fetchWordDetails } = useContext(WordContext);

    const navigate = useNavigate();
    const [fetchError, setFetchError] = useState("");

    const toggleSidebar = () => {
        setSidebarVisible((prev) => !prev);
    };

    useEffect(() => {
      const EmotionArray = ["Angry", "Sad", "Happy", "Anxeity"];
      console.log(`Emotion :${Emotion}`);
      
      const Emo = EmotionArray[Emotion %4] ;
      console.log(`Emo ${Emo}`);
      
      
        const getQuestions = async () => {
            try {
                const fetchedQuestions = await fetchQuestions(level, module, Emo );
                setQuestions(fetchedQuestions);
            } catch (error) {
                setFetchError("Sorry, there was an issue fetching the questions. Please try again.");
            }
        };

        getQuestions();
    }, [module, level]);

    const currentQuestion = questions[currentQuestionIndex];

    const handleAnswerSelect = (option) => {
        console.log("Selected Answer:", option);
        setSelectedAnswer(option);
    };

    useEffect(() => {
        if (score >= 0 && questions.length > 0) {
            setPercentage((score / questions.length) * 100);
        }
    }, [score, questions.length]);
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const mistake = {
            question: currentQuestion.question,
            selectedAnswer,
            correctAnswer: currentQuestion.answer,
        };

        if (selectedAnswer === currentQuestion.answer) {
            setResult("Correct! 🎉");
            setScore((prevScore) => prevScore + 1);
        } else {
            setResult(`Incorrect. The correct answer is: ${currentQuestion.answer} ❌`);
            // setMistakes((prevMistakes) => {
            //     const updatedMistakes = [...prevMistakes, mistake];
            //     console.log(`updateMistake: ${updatedMistakes}`);
                
            //     return updatedMistakes;
            // });

            saveMistakes([mistake])
        }

        if (currentQuestion.answer) {
            await fetchWordDetails(currentQuestion.answer);
        }

        setShowAnswerPopup(true);

        // setTimeout(() => {
        //     if (currentQuestionIndex < questions.length - 1) {
        //         setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        //     } else {
        //         // if (mistakes.length > 0) {
        //         //     saveMistakes(mistakes); 
        //         // }
        //         setTestFinished(true);
        //     }

        //     setSelectedAnswer("");
        //     setResult("");
        //     setShowAnswerPopup(false);
        //     setShowHint(false);
        // }, 5000);
    };

    const handleClosePopup = () => {
        
        setShowAnswerPopup(false);
        setTranslateSelectA((prev) => !prev)
    
        // Proceed to next question
        setTimeout(() => {
            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
            } else {
                setTestFinished(true);
            }
    
            // Resets the selected answer, result and hint
            setSelectedAnswer("");
            setResult("");
            setShowHint(false); 
        }, 500); 
    };


  

    const saveMistakes = async (mistakesToSave) => {
        try {
            console.log(`mistakeToSave: ${mistakesToSave}`);
            
            const response = await axios.post('http://localhost:5000/mistake/save-mistakes', {
                mistakes: mistakesToSave,
                userId,
            });
            console.log('Mistakes saved:', response.data);
        } catch (error) {
            console.error('Error saving mistakes:', error);
        }
    };

    // useEffect(() => {
    //     if (showAnswerPopup) {
    //         setTimeout(() => setShowAnswerPopup(false), 3000);
    //     }
    // }, [showAnswerPopup]);

    useEffect(() => {
        if (testFinished) {
            updateModulePercentage(percentage);
        }
    }, [testFinished, percentage]);

    const updateModulePercentage = async (newPercentage) => {
        try {
            const response = await axios.post(`http://localhost:5000/p/progress/`, {
                level,
                module,
                percentage: newPercentage,
                userId,
            });
            console.log("Module percentage updated:", response.data);
        } catch (error) {
            console.error("Error updating module percentage:", error.response ? error.response.data : error.message);
        }
    };

    //handles translation
    const handleTranslateToggle = async () => {
        setTranslateSelectQ((prev) => !prev);
        if (!translateSelectQ) {
            try {
                const translations = await Promise.all(
                    questions.map(async (question) => {
                        const translatedQuestion = await translate(question.question, "en", motherTongue);
                        const translatedOptions = await Promise.all(
                            question.options.map(async (option) =>
                                translate(option.option, "en", motherTongue)
                            )
                        );
                        return {
                            ...question,
                            translatedQuestion,
                            translatedOptions,
                        };
                    })
                );
                setTranslatedQuestions(translations);

                
                
            } catch (error) {
                console.error("Error translating questions:", error);
            }
        }
    };



    const translate = async (text, from, to) => {
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${from}&tl=${to}&dt=t&q=${encodeURIComponent(
            text
        )}`;
        try {
            const response = await fetch(url);
            const json = await response.json();
            return json[0].map((item) => item[0]).join("");
        } catch (error) {
            console.error("Translation error:", error);
            return text;
        }
    };    

    const handleNextModule = () => {
        setQuestions([]);
        setScore(0);
        setPercentage(0); 
        setResult(""); 
        setTestFinished(false);
        setCurrentQuestionIndex(0);

        let nextModule = Number(module) + 1;
        let nextLevel = Number(level);

        if (nextModule > 3) {
            nextModule = 1;
            nextLevel += 1;
        }

        navigate(`/hello/${nextLevel}/${nextModule}`);
    };

    const toggleHint = () => {
        setShowHint((prevState) => !prevState);
    };

    

    return (
        <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          background: "linear-gradient(180deg, #FFF7D8 0%, #FDC32B 100%)",
          
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
            padding: "10px 20px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          
          <Box
            sx={{
              background: "#BA8A30",
              width: "40%",
              padding: "5px 20px",
              borderRadius: "8px 30px 30px 8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              textAlign: "center",
            }}
          >
            <Typography
              variant="h4"
              sx={{ marginBottom: "10px", fontWeight: 500, color: "#ffffff" }}
            >
              Module {module}
            </Typography>
          </Box>
      
          <Box
            sx={{
              background: "#BA8A30",
              width: "20%",
              padding: "15px 20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Typography
              variant="h5"
              sx={{ fontWeight: 500, color: "#ffffff", textAlign: "center" }}
            >
              Score: {score}/{questions.length}
            </Typography>
          </Box>
        </Box>
      
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "80%",
            maxWidth: "1200px",
            background: "#FFF1C5",
            borderRadius: "12px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            padding: 3,
            marginBottom: 2,
          }}
        >
          {questions.length === 0 ? (
            <Typography
              variant="h6"
              sx={{ color: "#FF6347", fontStyle: "italic" }}
            >
              No questions available. Please try again later.
            </Typography>
           ) : currentQuestion ? (
            <Box>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 500,
                  marginBottom: "15px",
                  textAlign: "center",
                  color: "#4C2D05",
                }}
              >
                {currentQuestion.question}
              </Typography>
      
              {translateSelectQ && translatedQuestions[currentQuestionIndex] && (
                <Typography
                  variant="h6"
                  sx={{
                    marginBottom: "15px",
                    textAlign: "center",
                    color: "#4C2D05",
                  }}
                >
                  {translatedQuestions[currentQuestionIndex].translatedQuestion}
                </Typography>
              )}
      
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 3,
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    margin: "20px 0px",
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-around",
                    gap: 2,
                  }}
                >
                  {currentQuestion.options.map((option, index) => {
                    const translatedOption =
                      translateSelectQ &&
                      translatedQuestions[currentQuestionIndex]?.translatedOptions[
                        index
                      ];

                      const isSelected  = selectedAnswer === option;
      
                    return (
                      <Box
                        key={index}
                        sx={{
                          flex: "1 1 calc(50% - 10px)", 
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: 2,
                          maxWidth: "calc(50% - 10px)",
                        }}
                      >
                        <OptionButton
                          onClick={() => handleAnswerSelect(option)}
                          isSelected={isSelected}
                          sx={{
                           
                            cursor: "pointer",
                            width: "100%",
                          }}
                        >
                          {option}
                          {translatedOption && (
                            <Typography
                              variant="body2"
                              sx={{ textAlign: "center", color: "#4C2D05" }}
                            >
                              ({translatedOption})
                            </Typography>
                          )}
                        </OptionButton>
                      </Box>
                    );
                  })}
                </Box>
      
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-evenly",
                  }}
                >
                  <LoginButton
                    onClick={handleSubmit}
                    disabled={!selectedAnswer}
                    sx={{
                      height: "70px",
                      backgroundColor: !selectedAnswer ? "#D3D3D3" : "#4CAF50",
                    }}
                  >
                    Submit
                  </LoginButton>
      
                  <LoginButton
                    onClick={handleTranslateToggle}
                    sx={{
                      padding: "10px 20px",
                      backgroundColor: "#007BFF",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      fontSize: "1rem",
                      cursor: "pointer",
                      marginTop: "15px",
                      transition: "background-color 0.3s",
                      "&:hover": {
                        backgroundColor: "#0056b3",
                      },
                    }}
                  >
                    {translateSelectQ ? "Back to English" : "Translate to Mother Tongue"}
                  </LoginButton>
      
                  {currentQuestion.hint && (
                    <LoginButton
                      onClick={toggleHint}
                      sx={{
                        marginTop: "20px",
                        padding: "10px 20px",
                        backgroundColor: "#FF6347",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        fontSize: "1rem",
                        transition: "background-color 0.3s",
                        "&:hover": {
                          backgroundColor: "#e55347",
                        },
                      }}
                    >
                      {showHint ? "Hide Hint" : "Show Hint"}
                    </LoginButton>
                  )}
                </Box>
      
                {showHint && (
                  <Box
                    sx={{
                      width: "60%",
                      padding: "10px",
                      textAlign: "center",
                      background: "#664419",
                      borderRadius: "20px",
                    }}
                  >
                    <Typography
                      variant="h5"
                      sx={{ marginTop: "10px", fontStyle: "italic", color: "#FCF4D5" }}
                    >
                      {currentQuestion.hint}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
          ) : null}
      
          {result && (
            <Typography
              sx={{
                marginTop: "20px",
                fontSize: "1rem",
                color: "#333",
                fontStyle: "italic",
              }}
            >
              {result}
            </Typography>
          )}
      
          {loading && <Typography>Loading word details...</Typography>}
          {error && <Typography sx={{ color: "red" }}>{error}</Typography>}
      
          {showAnswerPopup && (
            <ModalComponent open={showAnswerPopup} onClose={handleClosePopup}>
              <Box
                sx={{
                  padding: "20px",
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Typography variant="h4" sx={{ marginBottom: "20px" }}>
                  Answer Details
                </Typography>
                <Typography sx={{ marginBottom: "10px", fontSize: "1rem" }}>
                  {result}
                </Typography>
      
                <WordDetails word={currentQuestion.answer} />
      
                <button
                  onClick={handleClosePopup}
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
          )}
      
          {testFinished && (
            <Box sx={{ textAlign: "center", marginTop: "30px" }}>
              <Typography variant="h3">Quiz Complete!</Typography>
              <Typography>
                Your final score: {score}/{questions.length}
              </Typography>
              <Typography>Percentage: {percentage.toFixed(2)}%</Typography>
              <LoginButton
                onClick={handleNextModule}
              >
                Next Module
              </LoginButton>
            </Box>
          )}
        </Box>
      </Box>
      


    );
};

export default Quiz;
