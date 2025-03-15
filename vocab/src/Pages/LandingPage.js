import React from 'react';
import { Box, Link } from '@mui/material';
import { NavBar } from '../components/NavBar';
// import questionImage from "../assets/question.jpg";
import { Button } from '@mui/material';
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Baloo 2, Arial, sans-serif",
  },
});

function LandingPage() {
  const myStyle = {
    width: '100%'
  }
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            // padding: 1,
            minHeight: "100vh",
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
            {/* <h2 style={{ fontWeight: "bold", fontSize: "3rem", marginBottom: "10px" }}>Welcome!!</h2> */}
            <h4 style={{ fontWeight: "500", fontSize: "3rem", marginLeft: '15%' }}>
              <i>Break Language Barriers, Learn with Emotions!</i>
            </h4>
          </b>
        </Box>
        <Box
          sx={{
            // bgcolor: "",
            p: 4,
            // borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: "space-between",
            // width: "90%",
            // margin: "auto",
          }}
        >
          <Box sx={{ padding: "15px", paddingLeft: "30px", flex: 1, paddingRight: 2, bgcolor:'#84CAFF',marginRight:'25px',borderRadius: "0px 20px 0px 20px", boxShadow: "3px 3px 8px rgba(0, 0, 0, 0.2)", width:'40%', height:'auto' }}>
      
              <p style={{padding:"3px", fontSize: "1.8rem", marginBottom: "20px", margin:'10px' }}>
                Which of these words is a synonym for 'ephemeral'?"<br/>
              <Button
              variant="contained"
              // color="primary"
              sx={{
                // marginLeft:"5%",
                background: "#fff",
                margin: 4,
                // padding: 1,
                fontWeight: "bold",
                textTransform: "uppercase",
                fontSize: "1.5rem",
                color:'#000',
                marginRight: 20,
                marginLeft: 10
      
              }}
              >
                🔹 Lasting
              </Button>
            
              <Button
              variant="contained"
              color="primary"
              sx={{
                // marginLeft:"5%",
                background: "#fff",
                margin: 1,
                // padding: 1,
                fontWeight: "bold",
                textTransform: "uppercase",
                fontSize: "1.5rem",
                color:'#000'
              }}
              >
                🔹 Fleeting
              </Button>
              <br/>
              <Button
              variant="contained"
              color="primary"
              sx={{
                // marginLeft:"5%",
                background: "#fff",
                // padding: 1,
                fontWeight: "bold",
                textTransform: "uppercase",
                fontSize: "1.5rem",
                margin: 2,
                color:'#000',
                marginRight: 20,
                marginLeft: 10
              }}
              >
                🔹 Sturdy
              </Button>
              
              <Button
              variant="contained"
              color="primary"
              sx={{
                // marginLeft:"5%",
                background: "#fff",
                // padding: 1,
                fontWeight: "bold",
                textTransform: "uppercase",
                fontSize: "1.5rem",
                margin: 1,
                color:'#000'
              }}
              >
                🔹 Endless
              </Button>
              </p>
      
          </Box>
          <Box sx={{ flex: 1, paddingLeft: 5 }}>
      
              <p style={{ fontSize: "1.8rem", marginBottom: "12px", marginLeft:'4%' }}>
                Ever struggled to find the right words?
              </p>
              <p style={{ fontSize: "1.8rem", marginBottom: "12px", marginLeft:'4%' }}>
                Feel like traditional methods don't work?
              </p>
              <p style={{ fontSize: "1.8rem", marginLeft:'4%' }}>
                Want learning to be fun and personalized?
              </p>
              <Button
              variant="contained"
              color="primary"
              sx={{
                // marginLeft:"5%",
                padding: 2,
                background: "#0086C9",
                // padding: 2,
                fontWeight: "bold",
                textTransform: "uppercase",
                fontSize: "1.5rem",
                display: "flex",
                alignContent: "center",
                justifySelf: "center",
              }}
              >
                Sign Up
              </Button>
      
          </Box>
      
          {/* <Box sx={{ flexShrink: 0 }}>
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
      
            </Box>
          </Box> */}
      
        </Box>
        <Box
          sx={{
            marginLeft:4
          }}
        >
          {/* <h1>Vocabify is one stop solution for you.</h1> */}
          <h1>VOCABIFY IS ONE STEP SOLUTION FOR YOU.</h1>
        </Box>
        <Box
          sx={{
          backgroundImage: `url(bg2.jpeg)`,
          // backgroundSize: "cover",
          // backgroundPosition: "center", 
          // backgroundRepeat: "no-repeat", 
          // padding: 2,
          // marginLeft: 2,
          // marginRight: 2,
          paddingBottom: 4,
          boxShadow: "3px 3px 8px rgba(0, 0, 0, 0.2)",
          fontSize: "1.8rem"
        }}
        ><Box sx={{marginLeft:'10%', bgcolor:'#fff', width:'80%', display:'flex', justifyContent:'center', opacity:'80%'}}>
          <div>
            <p><b>GAMIFIED LEARNING</b>: Quizzes, challenges, and leaderboards </p> <p><b>EMOTION BASED VOCABULARY</b>: Words & expressions tied to emotions </p><p><b>MULTILINGUAL SUPPORT</b>: Learn Marathi, English and many other languages </p><p><b>TRACK YOUR PROGRESS</b>: Streaks & level-wise learning</p>
          </div>
        </Box>
        {/* <hr/> */}
        <Box
          sx={{
            // marginLeft: 4,
            fontSize: "1.2rem",
          }}
        >
         <Box sx={{display:'flex', justifyContent:'center'}}>
           <div style={{ textAlign: 'center', marginLeft: '20px', background:'white', width:'30%' }}>
              <h1>
                What Our Users Say
              </h1>
            </div>
         </Box>

          <Box
            sx={{
            display: 'flex',
            flexDirection: 'row',
            fontFamily: "Nunito, Arial, sans-serif",
            marginTop: '10px'
            }}
          >
            <Box
              sx={{
                bgcolor: "#7CD4FD",
                p: 4,
                borderRadius: "0px 20px 0px 20px",
                display: 'flex',
                flexDirection:'column',
                alignItems: 'center',
                justifyContent: "center",
                width: "15%",
                margin: "auto",
                height: '100px',
                boxShadow: "3px 3px 8px rgba(0, 0, 0, 0.2)",
      
              }}
            >
              
              <div className='review' style={myStyle}>
                <b>
                  <p>“Helpful for beginners”</p><p style={{paddingLeft:'60%'}}> -Piyush</p>
                </b>
              </div>
            </Box>
            <Box
              sx={{
                bgcolor: "#7CD4FD",
                p: 4,
                borderRadius: "0px 20px 0px 20px",
                display: 'flex',
                flexDirection:'column',
                alignItems: 'center',
                justifyContent: "center",
                width: "15%",
                margin: "auto",
                boxShadow: "3px 3px 8px rgba(0, 0, 0, 0.2)",
                height: '100px',
              }}
            >
              <div className='review' style={myStyle}>
                <b>
                  <p>“I finally understand English expressions!”</p><p style={{paddingLeft:'60%'}}> -Aditya</p>
                </b>
              </div>
            </Box>
            <Box
              sx={{
                bgcolor: "#7CD4FD",
                p: 4,
                borderRadius: "0px 20px 0px 20px",
                display: 'flex',
                flexDirection:'column',
                alignItems: 'center',
                justifyContent: "center",
                width: "15%",
                margin: "auto",
                boxShadow: "3px 3px 8px rgba(0, 0, 0, 0.2)",
                height: '100px',
              }}
            >
            <div className='review' style={myStyle}>
              <b>
                <p>“Helped me a lot”</p><p style={{paddingLeft:'50%'}}>-Prachi</p>
              </b>
            </div>
            </Box>
          </Box>
        </Box>
        </Box>
      
        <Box
          sx={{
            backgroundColor: "#0086C9",
            color: "white",
            textAlign: "center",
            display: "flex",
            justifyContent: "space-around",
            flexShrink: 0, // Prevents footer from resizing
            // borderRadius: "20% 20% 0 0",
            boxShadow: "0px 8px 46px #EFF8FF",
            width: "100%", // Full width
            // padding: "20px",
            marginTop: "auto", // Pushes it down when scrolling
            // align: 'bottom'
            bottom:0
          }}
        >
          <Box sx={{ minWidth: "200px" }}>
            <Box sx={{ fontWeight: "bold", mb: 1, padding:1 }}>About Us</Box>
            <Link href="#" color="inherit" underline="none" display="block">
              Features
            </Link>
            <Link href="#" color="inherit" underline="none" display="block">
              FAQs
            </Link>
          </Box>
          <Box sx={{ minWidth: "200px" }}>
            <Box sx={{ fontWeight: "bold", mb: 1, padding:1 }}>Privacy & Terms</Box>
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
            <Box sx={{ fontWeight: "bold", mb: 1, padding:1 }}>Follow Us</Box>
            <Link href="#" color="inherit" underline="none" sx={{ mr: 1 }}>
              🔗 LinkedIn
            </Link>
            <Link href="#" color="inherit" underline="none">
              ✉ Email
            </Link>
          </Box>
      </Box>
      </Box>
    </ThemeProvider>
  );
}

export default LandingPage;


// sx={{
//           // backgroundColor:'#0BA5EC', 
//           color: "white",        
//           // width: '110%',
//           height: '100px',
//           position: 'relative',
//           // zIndex: 10,
//           // py: 3,
//           textAlign: "center",
//           display: "flex",
//           justifyContent: "space-around",
//           // flexWrap: "wrap",
//           flex: 1,
//           flexShrink: 0,
//           backgroundColor: '#0086C9',
//           borderRadius: '20% 20% 0 0', 
//           boxShadow: '0px 8px 46px EFF8FF',
//           // position: "fixed", 
//           left: 0, // Align to left
//           bottom: 0, // Align to bottom
//           width: "100%", // Full width
//           marginTop: "auto",
          
//         }}