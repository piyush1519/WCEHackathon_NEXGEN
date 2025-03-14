import React from 'react'
import { Box, Container } from '@mui/material';
import { NavBar } from '../components/NavBar';

function LandingPage() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "linear-gradient(180deg, #FFF7D8 0%, #FDC32B 100%)",
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
        <NavBar/>
      </Box>

      <Box>
        Landing Page   
      </Box>  

    </Box>  
    
  )
}

export default LandingPage