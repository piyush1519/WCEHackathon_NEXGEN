import React, { useContext, useEffect } from 'react';
import { Box, Button, Container, Modal, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { loginButton as LoginButton } from './Button';
import { circleButton as CircleButton } from './Button';
import { useState } from 'react';
import Logo from '../assets/Logo.jpeg';
import menubar from '../assets/menubar.png'
import streakIcon from '../assets/Streaktrack.png';
import notifyIcon from '../assets/notifications.png';
import profileIcon from '../assets/person.png';
import { UserContext } from "../ApiCall/userContext";
import { fetchStreak, updateStreak } from '../ApiCall/api';
import axios from "axios";

export  function NavBar() {
  const navigate = useNavigate();

  const handleLogin = () =>{
    navigate('/login');
}  

  return (
    <Box
      sx={{
        padding: "0px 20px 10px 10px",
        position: 'relative',
        width: '131%',
        height: '70px',
        backgroundColor: '#27115F',
        borderRadius: '0 0 20% 20%', 
        boxShadow: '0px 8px 46px rgb(39, 17, 95)',
        zIndex: 10,
      }}
    >
      <Container
        maxWidth={false} // Full width for content
        sx={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          color: '#fff',
          padding: '0 20px',
        }}
      >
        {/* Left: Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <img
            src={Logo}
            alt="Logo"
            style={{ height: '50px', width: "auto", marginRight: '10px' }}
          />
        </Box>

        <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '30px',
              '@media (max-width: 900px)': {
                gap: '20px',
              },
              '@media (max-width: 600px)': {
                flexWrap: 'wrap',
                gap: '15px',
                justifyContent: 'center',
              },
            }}
          >
            <Typography
              variant="h6"
              component="span"
              sx={{
                cursor: 'pointer',
                '&:hover': { color: '#F6F7FC' },
                fontSize: '1rem',
                '@media (max-width: 600px)': {
                  fontSize: '0.9rem',
                },
              }}
            >
              Home
            </Typography>
            <Typography
              variant="h6"
              component="span"
              sx={{
                cursor: 'pointer',
                '&:hover': { color: '#F6F7FC' },
                fontSize: '1rem',
                '@media (max-width: 600px)': {
                  fontSize: '0.9rem',
                },
              }}
            >
              About
            </Typography>
            <Typography
              variant="h6"
              component="span"
              sx={{
                cursor: 'pointer',
                '&:hover': { color: '#F6F7FC' },
                fontSize: '1rem',
                '@media (max-width: 600px)': {
                  fontSize: '0.9rem',
                },
              }}
            >
              Dashboard
            </Typography>
            <Typography
              variant="h6"
              component="span"
              sx={{
                cursor: 'pointer',
                '&:hover': { color: '#F6F7FC' },
                fontSize: '1rem',
                '@media (max-width: 600px)': {
                  fontSize: '0.9rem',
                },
              }}
            >
              Community
            </Typography>
          </Box>

        {/* Right: Icons */}
        <Box sx={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <Button

            onClick={handleLogin}
            sx={{
              backgroundColor: '#F6F7FC',
              boxShadow: '6px 6px 12px rgba(0, 0, 0, 0.25), inset -6px -6px 10px #DBD8D8',
              borderRadius: '12px',
              color: '#664419',
              fontWeight: 'bold',
              padding: '10px 20px',
              '&:hover': {
                backgroundColor: '#e0e0e0',
              },
            }}
          >
            Login
          </Button>
        </Box>
      </Container>
    </Box>
  );
}



export function NavBarTwo({ toggleSidebar }) {
  const navigate = useNavigate();
  const [isNotificationPopUp, setIsNotificationPopUp] = useState(false);
  const [isProfilePopUp, setIsProfilePopUp] = useState(false);
  const [streak, setStreak] = useState(0); // Streak state to display streak count
  const { userId } = useContext(UserContext);

  // console.log(`userID: ${userId}`);
  

  // console.log("streak", streak);
  

  // const fetchStreak = async (userId) => {
  //   try {
  //     const response = await axios.get(`http://localhost:5000/daily/getStreak/${userId}`);
  //     //console.log(response);
      
  //     if (response.data.streak !== undefined) {
  //       setStreak(response.data.streak);  // Set the streak value in state
  //     } else {
  //       console.error(response.data.message);  // Handle no streak or error message from backend
  //     }
  //   } catch (error) {
  //     console.error('Error fetching streak:', error);
  //   }
  // };

  useEffect(() => {
    const fetchStreak = async (userId) => {
      try {
        if (!userId) {
          console.log("userId required");
          return;
        }
    
        const response = await axios.get(`http://localhost:5000/daily/getStreak/${userId}`);
        console.log("Streak response:", response); // Log the response for debugging
        setStreak(response.data.streak || 0); // Set streak from response data
      } catch (error) {
        console.error('Error fetching streak:', error);
      }
    };
  
    if (userId) {
      fetchStreak(userId); // Only call fetchStreak if userId is defined
    }
  }, [userId]);
  


  

  const handleStreakToggle = () => {
    setIsNotificationPopUp((prev) => !prev);
  };

  const handleNotification = () => {
    console.log('Notification clicked');
  };

  const handleProfile = () => {
    setIsProfilePopUp((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken'); 
    navigate('/login');
  };

  return (
    <Box
      sx={{
        padding: '0px 20px 10px 10px',
        position: 'relative',
        width: '131%',
        height: '70px',
        backgroundColor: '#27115F',
        borderRadius: '0 0 20% 20%',
        boxShadow: '0px 8px 46px rgba(83, 52, 2, 0.6)',
        zIndex: 10,
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          color: '#fff',
          padding: '0 20px',
        }}
      >
        {/* Left: Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <img
            onClick={toggleSidebar}
            src={menubar}
            alt="menubar"
            style={{ height: '30px', width: 'auto', marginRight: '10px' }}
          />
          <img
            src={Logo}
            alt="Logo"
            style={{ height: '50px', width: 'auto', marginRight: '10px' }}
          />
        </Box>

        {/* Right: Icons */}
        <Box sx={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          {/* Streak Button */}
          <LoginButton
            onClick={handleStreakToggle}
            sx={{ gap: '5px' }}
          >
            Streak {`(${streak})`} 
            <img
              src={streakIcon}
              alt="streakIcon"
              style={{ height: '30px', width: '30px' }}
            />
          </LoginButton>

          {/* Streak Modal */}
          {isNotificationPopUp && (
            <Modal
              open={isNotificationPopUp} // Modal will open when isNotificationPopUp is true
              onClose={handleStreakToggle}
              aria-labelledby="streak-popup-title"
              aria-describedby="streak-popup-description"
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '90%',
                  maxWidth: '400px',
                  bgcolor: '#F6F7FC',
                  boxShadow: 24,
                  borderRadius: '10px',
                  p: 4,
                }}
              >
                <Typography
                  id="streak-popup-title"
                  variant="h6"
                  component="h2"
                  sx={{ color: '#664419', fontWeight: 'bold', mb: 2 }}
                >
                  Streak
                </Typography>
                <Typography
                  id="streak-popup-description"
                  sx={{ mb: 2, color: '#664419' }}
                >
                  Your streak shows strength, keep rocking it! You've earned 500 Lingo points so far.
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 3,
                  }}
                >
                  <Typography sx={{ fontWeight: 'bold', color: '#664419' }}>Day 10</Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      gap: '5px',
                    }}
                  >
                    {[...Array(7)].map((_, index) => (
                      <Box
                        key={index}
                        sx={{
                          width: '10px',
                          height: '10px',
                          borderRadius: '50%',
                          backgroundColor: index < 5 ? '#664419' : '#DBD8D8',
                        }}
                      />
                    ))}
                  </Box>
                </Box>

                <Typography sx={{ mb: 2, fontWeight: 'bold', color: '#664419' }}>
                  Time for the Question of the Day!
                </Typography>
                <Typography sx={{ mb: 2, color: '#664419' }}>
                  Q. Which word means "to make better"?
                </Typography>

                <Box sx={{ display: 'flex', gap: '10px' }}>
                  {['IMPROVE', 'BREAK', 'IGNORE', 'DELAY'].map((option) => (
                    <Button
                      key={option}
                      variant="contained"
                      sx={{
                        bgcolor: '#F6F7FC',
                        color: '#664419',
                        boxShadow:
                          '6px 6px 12px rgba(0, 0, 0, 0.25), inset -6px -6px 10px #DBD8D8',
                        '&:hover': {
                          bgcolor: '#e0e0e0',
                        },
                      }}
                    >
                      {option}
                    </Button>
                  ))}
                </Box>
              </Box>
            </Modal>
          )}

          {/* Circle Buttons */}
          <CircleButton onClick={handleNotification}>
            <img
              src={notifyIcon}
              alt="notifyIcon"
              style={{ height: '30px', width: '30px' }}
            />
          </CircleButton>

          <CircleButton onClick={handleProfile}>
            <img
              src={profileIcon}
              alt="profileIcon"
              style={{ height: '30px', width: '30px' }}
            />
          </CircleButton>
          {isProfilePopUp && (
            <Modal
              open={isProfilePopUp} // Modal will open when isProfilePopUp is true
              onClose={handleProfile}
              aria-labelledby="profile-popup-title"
              aria-describedby="profile-popup-description"
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '90%',
                  maxWidth: '400px',
                  bgcolor: '#F6F7FC',
                  boxShadow: 24,
                  borderRadius: '10px',
                  p: 4,
                }}
              >
                <Button onClick={handleLogout}>LogOut</Button>
              </Box>
            </Modal>
          )}
        </Box>
      </Container>
    </Box>
  );
}


