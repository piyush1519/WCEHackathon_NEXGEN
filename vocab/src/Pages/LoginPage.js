import { Box, TextField, Button, Typography, Container } from "@mui/material";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { handleFailure, handleSuccess } from '../components/util';
import { NavBar } from "../components/NavBar";
import ml from "../assets/minilogo.png";

import { UserContext } from "../ApiCall/userContext";
import Background from "../components/Background";

function Login() {

  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });  

  const navigate = useNavigate();
  const { loginUser } = useContext(UserContext);

  const handleChange = (e) =>{
    const { name, value } = e.target;
    const copyLoginInfo = { ...loginInfo };
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);
  }

  const handleLogin = async (e) =>{
    e.preventDefault();
    const { email, password } = loginInfo;
    if(!email || !password){
        return handleFailure('Email and Password required..')
    }
    try{

        console.log(loginInfo);
        
        const url = "http://localhost:5000/auth/login";
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginInfo)
        });

        if (!response.ok) {
          const result = await response.json();
          console.log(result);
          const { error } = result;
          const details = error?.details?.[0]?.message || 'An unknown error occurred';
          handleFailure(details);
      }

        const result = await response.json();
        const { success, message, error, jwtToken, name } = result;
        console.log(result);

        if(success){
          handleSuccess(message);
          localStorage.setItem('token', jwtToken);
          localStorage.setItem('loggedInUser', name);
          setTimeout(()=>{
              navigate('/dashboard');
          }, 1000);
      }
      else if(error){
          const details = error?.details[0].message;
          handleFailure(details);
      }
      else if(!success){
          handleFailure(message);
      }

  }catch(error){
      handleFailure(error);
  }
  }

  return (
  
    
    <Background>

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
      
      <Box
        component="form"
        onSubmit={handleLogin}
        sx={{
          width: { xs: "90%", sm: "400px" },
          backgroundColor: "#fff",
          marginTop: 5,
          padding: 4,
          borderRadius: 3,
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          display: "flex",
          flexDirection: "column",
          gap: 3, // Increased spacing between form elements
        }}
      >


        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <img src={ml} alt="Logo" style={{ width: "40px", height: "40px" }} />
          <Typography variant="h5" component="h1" align="left" sx={{ fontWeight: "bold", marginBottom: 2 }}>
            Hi Buddy
          </Typography>
        </Box>

        <Typography variant="h6" component="h2" align="left" sx={{ fontWeight: "bold", marginBottom: 3 }}>
          Login to your account
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography variant="body1" sx={{ fontWeight: "bold", marginBottom: "4px" }}>
            Email
          </Typography>
          <TextField
            name="email"
            onChange={handleChange}
            label="Enter your email"
            variant="outlined"
            type="email"
            value={loginInfo.email}
            fullWidth
            required
            sx={{ marginBottom: 2 }}
          />
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography variant="body1" sx={{ fontWeight: "bold", marginBottom: "4px" }}>
            Password
          </Typography>
          <TextField
            name="password"
            onChange={handleChange}
            label="Enter your password"
            variant="outlined"
            type="password"
            value={loginInfo.password}
            fullWidth
            required
            sx={{ marginBottom: 2 }}
          />
        </Box>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            background: "#0086C9",
            padding: 2,
            fontWeight: "bold",
            textTransform: "uppercase",
            fontSize: "1.1rem", // Increase font size
          }}
        >
          Login
        </Button>

        <Typography variant="body1" sx={{ marginTop: 2 }}>
          Don't have an account? <Link to='/signUp'>Sign Up</Link>
        </Typography>

        <ToastContainer />
      </Box>
      </Background>
   
  );
}

export default Login;
