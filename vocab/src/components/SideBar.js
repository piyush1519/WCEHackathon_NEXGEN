import { Box, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import levelIcon from '../assets/levelwhite.png';
import alphabetsIcon from '../assets/alphabetwhite.png';
import progressIcon from '../assets/progress-white.png';
import summarizerIcon from '../assets/summarywhite.png';
import quizIcon from '../assets/quizwhite.png';
import communityIcon from '../assets/community-white.png';
import settingsIcon from '../assets/settingswhire.png';
import helpIcon from '../assets/helpwhite.png';
import aboutIcon from '../assets/about.png';
import levelBlackIcon from '../assets/levelblack.png';
import alphabetsBlackIcon from '../assets/alphabetblack.png';
import progressBlackIcon from '../assets/progress-black.png';
import summarizerBlackIcon from '../assets/summaryblack.png';
import quizBlackIcon from '../assets/quizblack.png';
import communityBlackIcon from '../assets/community -black.png';
import settingsBlackIcon from '../assets/settings-blacl.png';
import helpBlackIcon from '../assets/helpblack.png';
import aboutBlackIcon from '../assets/aboutblack.png';

export function SideBar({ isVisible }) {
  const navigate = useNavigate();

  const [hoveredItem, setHoveredItem] = useState(null);

  const menuItems = [
    { text: 'Level', Whiteicon: levelIcon, route: '/dashboard', blackIcon: levelBlackIcon },
    { text: 'Alphabets', Whiteicon: alphabetsIcon, route: '/alphabets', blackIcon: alphabetsBlackIcon },
    { text: 'Progress', Whiteicon: progressIcon, route: '/progress', blackIcon: progressBlackIcon },
    { text: 'Summarize', Whiteicon: summarizerIcon, route: '/summarize', blackIcon: summarizerBlackIcon },
    { text: 'Explore Words', Whiteicon: quizIcon, route: '/Synonyms_&_Antonyms', blackIcon: quizBlackIcon },
    { text: 'Community', Whiteicon: communityIcon, route: '/community', blackIcon: communityBlackIcon },
    { text: 'Setting', Whiteicon: settingsIcon, route: '/settings', blackIcon: settingsBlackIcon },
    { text: 'Help & Feedback', Whiteicon: helpIcon, route: '/help', blackIcon: helpBlackIcon },
    { text: 'About', Whiteicon: aboutIcon, route: '/about', blackIcon: aboutBlackIcon },
  ];

  const handlePageChange = (route) => {
    navigate(route);
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: "60px", // Same as your Navbar's height
        left: isVisible ? '0' : '-300px',
        width: "300px",
        height: "calc(100vh - 60px)", // Full height minus the Navbar
        background: "#0086C9",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px 0",
        boxShadow: "2px 0px 6px rgba(0, 0, 0, 0.2)",
        zIndex: "9"
      }}
    >
      {menuItems.map((item, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            alignItems: "center",
            width: "90%",
            padding: "20px 15px 10px 25px",
            margin: "10px 0",
            borderRadius: "8px",
            gap: "10px",
            cursor: "pointer",
            "&:hover": {
              background: "#FFF7D8",
              borderRadius: "0px 50px 50px 0px",
              width: "80%"
              
            },
          }}
          onClick={() => handlePageChange(item.route)} // Attach click handler to the entire box
          onMouseEnter={() => setHoveredItem(index)} // Set hovered item index on mouse enter
          onMouseLeave={() => setHoveredItem(null)} // Reset hovered item index on mouse leave
        >
          {/* Icon */}
          <img
            src={hoveredItem === index ? item.blackIcon : item.Whiteicon}
            alt={item.text}
            style={{ height: '30px', width: '30px', marginRight: '15px' }}
          />

          {/* Text */}
          <Typography
            variant='h4'
            sx={{
              fontFamily: 'Share',
              fontStyle: "bold",
              fontWeight: "500",
              fontSize: "25px",
              color: hoveredItem === index ? "#664419" : "#FFF7D8",
            }}
          >
            {item.text}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
