import React, { useEffect, useState, useContext } from 'react';
import { NavBarTwo } from '../components/NavBar';
import { Box, Modal } from '@mui/material';
import axios from 'axios';
import { UserContext } from '../ApiCall/userContext';
import { loginButton as LoginButton } from '../components/Button';
import ProgressGraph from '../components/ProgressGraph';
import { fetchMistakes } from '../ApiCall/api';
import ModalComponent from '../components/ModalComp';


function Progress() {
  const { userId } = useContext(UserContext);
  const [mistakes, setMistakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMistakeModel, setMistakeModel] = useState(false);
  const [isProgressModel, setIsProgressModel] = useState(false);
  
  const handleMistake = () => {
    setMistakeModel((prev) => !prev);
  };

  const handleProgressPopUp = () =>{
    setIsProgressModel((prev) => !prev);
  }

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) {
        console.log('User ID required');
        return;
      }

      try {
        const fetchedMistakes = await fetchMistakes(userId);
        setMistakes(fetchedMistakes);
      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);


  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: 'linear-gradient(180deg, #FFF7D8 0%, #FDC32B 100%)',
        padding: 1,
      }}
    >
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '75%',
          zIndex: 99999,
        }}
      >
        <NavBarTwo />
      </Box>

      <Box
        sx={{ width: '100%', paddingTop: '80px',display:"flex", justifyContent: "space-evenly" }}
      >
        <LoginButton
          onClick={handleMistake}
        >
          Mistakes
        </LoginButton>

        <ModalComponent open={isMistakeModel} onClose={handleMistake}>
        <Box
              
            >
              {loading && <p>Loading mistakes...</p>}
              
              {mistakes.length > 0 ? (
                <div>
                  <h3>Mistakes</h3>
                  <ul>
                    {mistakes.map((mistake, index) => (
                      <li key={index}>
                        <strong>Question:</strong> {mistake.question} <br />
                        <strong>Your Answer:</strong> {mistake.selectedAnswer} <br />
                        <strong>Correct Answer:</strong> {mistake.correctAnswer} <br />
                        
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p>No mistakes found.</p>
              )}
            </Box>
        </ModalComponent>
            
        <LoginButton
          onClick={handleProgressPopUp}
        >
          Progress
        </LoginButton>
          <ModalComponent open={isProgressModel} onClose={handleProgressPopUp}>
            <ProgressGraph/>
          </ModalComponent>
            
            
        

        <LoginButton>Achivements</LoginButton>
      </Box>

     

      
    </Box>
  );
}

export default Progress;
