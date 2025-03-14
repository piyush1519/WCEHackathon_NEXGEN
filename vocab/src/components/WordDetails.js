import React, { useState, useEffect, useRef, useContext } from "react";
import { WordContext } from "../ApiCall/WordContext";
import { UserContext } from "../ApiCall/userContext";
import { Box, Typography } from "@mui/material";
import { loginButton as LoginButton } from '../components/Button';

const WordDetails = ({ word }) => {
    const audioRef = useRef(null);
   
    const [translatedAnswer, setTranslatedAnswer] = useState(null);
    const [translateAnswer, setTranslateAnswer] = useState(false);
    
    const { userId, motherTongue } = useContext(UserContext);
    const { wordData, loading, error, fetchWordDetails } = useContext(WordContext);

    useEffect(() => {
        if (word) {
             fetchWordDetails(word);
        }
    }, [word]);

    const handleTranslate = () =>{
        setTranslateAnswer((prev) => !prev);
    }

    const translateDetails = async (data, targetLanguage) => {
        try {
            const translated = {
                partOfSpeech: await translate(data.partOfSpeech || "", "en", targetLanguage),
                definitions: await Promise.all(
                    (data.definitions || []).map(async(definition) =>
                        translate(definition, "en", targetLanguage)
                    )
                ),
                examples: await Promise.all(
                    (data.examples || []).map(async(example) =>
                        translate(example, "en", targetLanguage)
                    )
                ),
            };
            setTranslatedAnswer(translated);
        } catch (err) {
            console.error("Error translating word details:", err);
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

    return (
        <Box
            
            >
            {error && <Typography sx={{ color: "red", marginBottom: "1rem" }}>{error}</Typography>}

            {wordData ? (
                <Box>
                <Typography
                    sx={{
                    fontWeight: "bold",
                    fontSize: "1.5rem",
                    marginBottom: "1rem",
                    textAlign: "center",
                    }}
                >
                    Word Details for "{word}"
                </Typography>

                {/* Pronunciation */}
                <Box sx={{ marginBottom: "1rem" }}>
                    <Typography sx={{ fontWeight: "bold" }}>Pronunciation:</Typography>
                    <Typography sx={{ marginTop: "0.5rem" }}>{wordData.pronunciation || "N/A"}</Typography>
                </Box>

                {/* Part of Speech */}
                <Box sx={{ marginBottom: "1rem" }}>
                    <Typography sx={{ fontWeight: "bold" }}>Part of Speech:</Typography>
                    <Typography sx={{ marginTop: "0.5rem" }}>English: {wordData.partOfSpeech}</Typography>
                    {translateAnswer && (
                        <Typography sx={{ marginTop: "0.5rem" }}>Translated: {translatedAnswer?.partOfSpeech || "N/A"}</Typography>
                    )}
                </Box>

                {/* Definitions */}
                <Box sx={{ marginBottom: "1rem" }}>
                    <Typography sx={{ fontWeight: "bold" }}>Definitions:</Typography>
                    <ul style={{ marginLeft: "1rem", marginTop: "0.5rem" }}>
                    {(wordData.definitions || []).map((def, index) => (
                        <li key={index}>
                        <Typography>English: {def}</Typography>
                        {translateAnswer && (
                            <Typography sx={{ marginTop: "0.5rem" }}>
                                Translated: {translatedAnswer?.definitions?.[index] || "N/A"}
                            </Typography>
                        )}
                        </li>
                    ))}
                    </ul>
                </Box>

                {/* Examples */}
                <Box sx={{ marginBottom: "1rem" }}>
                    <Typography sx={{ fontWeight: "bold" }}>Examples:</Typography>
                    <ul style={{ marginLeft: "1rem", marginTop: "0.5rem" }}>
                    {(wordData.examples || []).map((example, index) => (
                        <li key={index}>
                        <Typography>English: {example}</Typography>
                        {translateAnswer && (
                            <Typography sx={{ marginTop: "0.5rem" }}>
                                Translated: {translatedAnswer?.examples?.[index] || "N/A"}
                            </Typography>
                        )}
                        </li>
                    ))}
                    </ul>
                </Box>

                {/* Audio */}
                {wordData.audio ? (
                    <Box sx={{ marginBottom: "1rem" }}>
                    <Typography sx={{ fontWeight: "bold" }}>Audio:</Typography>
                    <audio ref={audioRef} src={wordData.audio} preload="auto" />
                    <LoginButton
                        onClick={() => audioRef.current.play()}
                        sx={{
                        marginTop: "0.5rem",
                        padding: "0.5rem 1rem",
                        backgroundColor: "#007BFF",
                        color: "#fff",
                        border: "none",
                        borderRadius: "50px",
                        cursor: "pointer",
                        "&:hover": {
                            backgroundColor: "#0056b3",
                        },
                        }}
                    >
                        {/*icon*/} Play
                    </LoginButton>
                    </Box>
                ) : (
                    <Typography sx={{ color: "red", marginBottom: "1rem" }}>Audio not available.</Typography>
                )}

                {/* Translate Button */}
                <LoginButton
                    onClick={() => {
                        translateDetails(wordData, motherTongue);
                        handleTranslate();
                      }}
                      
                    sx={{
                    padding: "0.5rem 1rem",
                    backgroundColor: "#4CAF50",
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    "&:hover": {
                        backgroundColor: "#3e8e41",
                    },
                    }}
                >
                    Translate to Mother Tongue
                </LoginButton>
                </Box>
            ) : (
                <Typography>Loading word details...</Typography>
            )}
            </Box>

  );
  
};

export default WordDetails;
