import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from "../ApiCall/userContext";
import { NavBarTwo } from '../components/NavBar';
import { SideBar } from '../components/SideBar';
import { Box, Card, CardContent, Grid2, Typography, IconButton } from '@mui/material';
import { VolumeUp } from '@mui/icons-material'; 
import { WordContext } from "../ApiCall/WordContext";
import Background from '../components/Background';

function AlphabetPage() {
  const { userId, motherTongue } = useContext(UserContext);
  
  
  const englishAlphabets = [
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", 
    "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
  ];

  const [motherTongueAlphabets, setMotherTongueAlphabets] = useState([]);
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  useEffect(() => {
    if (motherTongue) {
      handleTranslateToggle();
    }
  }, [motherTongue]);

  const handleTranslateToggle = async () => {
    try {
      const translations = await Promise.all(
        [...englishAlphabets].map(async (letter) => {
          const translated = await translate(letter, "en", motherTongue);
          return {
            uppercase: letter,
            lowercase: letter.toLowerCase(),
            translated
          };
        })
      );
      setMotherTongueAlphabets(translations);
    } catch (error) {
      console.error("Error translating alphabets:", error);
    }
  };

  const translate = async (text, from, to) => {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${from}&tl=${to}&dt=t&q=${encodeURIComponent(text)}`;
    try {
      const response = await fetch(url);
      const json = await response.json();
      return json[0].map((item) => item[0]).join("");
    } catch (error) {
      console.error("Translation error:", error);
      return text;
    }
  };

  const toggleSidebar = () => {
    setSidebarVisible((prev) => !prev);
  };

  const playAudio = (letter) => {
    const utterance = new SpeechSynthesisUtterance(letter);
    window.speechSynthesis.speak(utterance);
  };

  return (
 <Background>
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
      marginTop: 10, 
      width: '80%',
      flexGrow: 1, 
    }}
  >
    <Grid2 container spacing={5} justifyContent="center">
      {motherTongueAlphabets.map(({ uppercase, lowercase, translated }) => (
        <Grid2 item xs={6} sm={4} md={2} key={uppercase}>
          <Card 
            sx={{ 
              marginTop: '20px',
              height: '100%',
              background: "#F7F7F7",
              border: "5px solid #0086C9",
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              borderRadius: "10px",
            }}
          >
            <CardContent sx={{ minWidth: "70px", display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="h4" sx={{ fontFamily: '"Share", sans-serif' }}>{uppercase}{lowercase}</Typography>
              <br />
              <Typography variant="body1" sx={{ fontFamily: '"Share", sans-serif' }}>{translated}</Typography>
              <IconButton 
                onClick={() => playAudio(uppercase)} 
                sx={{ marginTop: 1, color: "#84CAFF" }}
              >
                <VolumeUp />
              </IconButton>
            </CardContent>
          </Card>
        </Grid2>
      ))}
    </Grid2>
  </Box>
</Background>

  );
}

export default AlphabetPage;
