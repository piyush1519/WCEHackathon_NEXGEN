import React from 'react';
import { Box, Link } from '@mui/material';
import { NavBar } from '../components/NavBar';
// import questionImage from "../assets/question.jpg";
import { Button } from '@mui/material';


function LandingPage() {
  return (
    <Box
      sx={{
          display: "flex",
          flexDirection: "column",
          padding: 1,
        }}
      >
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "75%",
          zIndex: 99999,
        }}
      >
        <NavBar />
      </Box>

      <Box sx={{ mb: 2, textAlign: "left", marginTop: "80px", marginLeft: 4 }}>
        <b>
          <h2 style={{ fontWeight: "bold", fontSize: "3rem", marginBottom: "10px" }}>Welcome!!</h2>
          <h4 style={{ fontWeight: "500", fontSize: "2rem" }}>
            <i><u>Break Language Barriers, Learn with Emotions!</u></i>
          </h4>
        </b>
      </Box>


      <Box
        sx={{
          bgcolor: "#0BA5EC",
          p: 4,
          borderRadius: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: "space-between", 
          width: "90%", 
          margin: "auto", 
        }}
      >
        <Box sx={{ flex: 1, paddingRight: 2 }}>
        
            <p style={{ fontSize: "1.8rem", marginBottom: "12px" }}>
              Ever struggled to find the right words?
            </p>
            <p style={{ fontSize: "1.8rem", marginBottom: "12px", marginLeft: "10%" }}>
              Feel like traditional methods don't work?
            </p>
            <p style={{ fontSize: "1.8rem", marginLeft: "20%" }}>Want learning to be fun and personalized?</p>
         
        </Box>

        

        <Box sx={{ flexShrink: 0 }}> 
          {/* <img 
            src={questionImage} 
            alt="Question" 
            style={{ width: "300px", height: "auto", borderRadius: "6px" }} 
          /> */}
        </Box>
        
      </Box>
      <Box
        sx={{
          marginLeft:4
        }}
      >
        <h1>Vocabify is one stop solution for you.</h1>
      </Box>

      <Box
        sx={{
        backgroundColor: "#fff",
        padding: 2,
        marginLeft: 4,
        marginRight: 4,
        borderRadius: "0px 12px 0px 12px",
        boxShadow: "3px 3px 8px rgba(0, 0, 0, 0.2)",
        fontSize: "1.8rem"
      }}
      ><p>🎮 Gamified Learning – Quizzes, challenges, and leaderboards </p> <p>🗣️ Emotion-Based Vocabulary – Words & expressions tied to emotions </p><p>🌍 Multilingual Support – Learn Marathi, English and many other languages </p><p>📈 Track Your Progress – Streaks & level-wise learning</p>
      </Box>
      <Box
        sx={{
          marginLeft: 4,
        }}
      >
        <h1>
          <p>What Our Users Say</p>
        </h1>
        <Box
          sx={{
          display: 'flex',
          flexDirection: 'row'
          }}
        >
          <Box
            sx={{
              bgcolor: "#fff",
              p: 4,
              borderRadius: "0px 12px 0px 12px",
              display: 'flex',
              alignItems: 'center',
              justifyContent: "space-between", 
              width: "15%", 
              margin: "auto", 
              height: '100px',
              boxShadow: "3px 3px 8px rgba(0, 0, 0, 0.2)",
              
            }}
          >
            <p>“I finally understand English expressions!”<br/> -Aditya</p>
          </Box>
          <Box
            sx={{
              bgcolor: "#fff",
              p: 4,
              borderRadius: "0px 12px 0px 12px",
              display: 'flex',
              alignItems: 'center',
              justifyContent: "space-between", 
              width: "15%", 
              margin: "auto", 
              boxShadow: "3px 3px 8px rgba(0, 0, 0, 0.2)",
              height: '100px',
            }}
          >
            <p>“Helpful for beginners”<br/> -Aditya</p>
          </Box>
          <Box
            sx={{
              bgcolor: "#fff",
              p: 4,
              borderRadius: "0px 12px 0px 12px",
              display: 'flex',
              alignItems: 'center',
              justifyContent: "space-between", 
              width: "15%", 
              margin: "auto",
              boxShadow: "3px 3px 8px rgba(0, 0, 0, 0.2)", 
              height: '100px',
            }}
          >
          <p>“Helpful for beginners”<br/> -Aditya</p>
          </Box>
        </Box>
      </Box>
      <Box>
        <Box
          sx={{
          p: 4,
          borderRadius: 2,
          display: 'flex',
          alignItems: 'center',
          width: "90%", 
          fontSize:"1.8rem",
          marginTop:"10px"
        }}
        >
          <p>Star your journey by clicking here</p>
          <Button
          variant="contained"
          color="primary"
          sx={{
            marginLeft:"5%",
            background: "#0086C9",
            padding: 2,
            fontWeight: "bold",
            textTransform: "uppercase",
            fontSize: "1.1rem",
            display: "flex",
            alignContent: "center",
            justifySelf: "center",
          }}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
    <Box
      sx={{
        backgroundColor:'#0BA5EC', 
        color: "white",
        py: 3,
        textAlign: "center",
        display: "flex",
        justifyContent: "space-around",
        flexWrap: "wrap",
      }}
    >
      <Box sx={{ minWidth: "200px" }}>
        <Box sx={{ fontWeight: "bold", mb: 1 }}>About Us</Box>
        <Link href="#" color="inherit" underline="none" display="block">
          Features
        </Link>
        <Link href="#" color="inherit" underline="none" display="block">
          FAQs
        </Link>
      </Box>

      <Box sx={{ minWidth: "200px" }}>
        <Box sx={{ fontWeight: "bold", mb: 1 }}>Privacy & Terms</Box>
        <Link href="#" color="inherit" underline="none" display="block">
          Privacy Policy
        </Link>
        <Link href="#" color="inherit" underline="none" display="block">
          Terms & Conditions
        </Link>
        <Link href="#" color="inherit" underline="none" display="block">
          Contact Us
        </Link>
      </Box>

      <Box sx={{ minWidth: "200px" }}>
        <Box sx={{ fontWeight: "bold", mb: 1 }}>Follow Us</Box>
        <Link href="#" color="inherit" underline="none" sx={{ mr: 1 }}>
          🔗 LinkedIn
        </Link>
        <Link href="#" color="inherit" underline="none">
          ✉ Email
        </Link>
      </Box>
    </Box>
    </Box>
  );
}

export default LandingPage;
