import React from 'react';
import { Button } from '@mui/material';

export const loginButton = ({ children, onClick }) => {
  return (
    <Button
    onClick={onClick}
      sx={{
              backgroundColor: '#F6F7FC',
              boxShadow: '6px 6px 12px rgba(0, 0, 0, 0.25), inset -6px -6px 10px #DBD8D8',
              borderRadius: '50px',
              color: '#664419',
              fontWeight: 'bold',
              padding: '10px 20px',
              '&:hover': {
                backgroundColor: '#e0e0e0',
              },
      }}
    >
      {children}
    </Button>
  );
};


export const circleButton = ({ children, onClick }) => {
  return (
    <Button
      onClick={onClick}
      sx={{
        backgroundColor: '#F6F7FC',
        boxShadow: '6px 6px 12px rgba(0, 0, 0, 0.25), inset -6px -6px 10px #DBD8D8',
        borderRadius: '50%', // Makes it a circle
        color: '#664419',
        fontWeight: 'bold',
        padding: 0, // Remove extra padding for proper image fit
        width: '50px', // Ensure width and height are equal
        height: '50px', // Ensure width and height are equal
        minWidth: 'unset', // Prevent Button's default minWidth
        overflow: 'hidden', // Ensure image fits within the circle
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '&:hover': {
          backgroundColor: '#e0e0e0',
        },
      }}
    >
      {children}
    </Button>
  );
};

export const optionButton = ({ children, onClick ,isSelected}) => {
  return (
    <Button
      onClick={onClick}
      sx={{
        width: "350px",
        background: isSelected ? "#ffffff" : "#F3CA7F",
        boxShadow: "inset -6.50529px 6.50529px 19.5159px #AB5223, inset 6.50529px -6.50529px 19.5159px #A35830",
        borderRadius: "25px",
        color: '#664419',
        fontWeight: 'bold',
        padding: 0, // Remove extra padding for proper image fit
        
        height: '80px', // Ensure width and height are equal
        minWidth: 'unset', // Prevent Button's default minWidth
        overflow: 'hidden', // Ensure image fits within the circle
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        
      }}
    >
      {children}
    </Button>
  );
};

