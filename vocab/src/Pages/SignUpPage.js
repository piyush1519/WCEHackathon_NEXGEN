import { Box, TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel, Grid2 } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { handleFailure, handleSuccess } from "../components/util";
import { NavBar } from "../components/NavBar";

function SignUp() {
  const [signUpInfo, setSignUpInfo] = useState({
    name: '',
    email: '',
    password: '',
    motherTongue: '',
    confirmPassword: '',
    fluency: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const copysignUpInfo = { ...signUpInfo };
    copysignUpInfo[name] = value;
    setSignUpInfo(copysignUpInfo);
  }

  const handleSignUp = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = signUpInfo;
    if (!name || !email || !password) {
      return handleFailure('Name, Email, and Password are required.');
    }
    if (password !== confirmPassword) {
      return handleFailure('Passwords do not match.');
    }
    try {
      const url = "http://localhost:5000/auth/signUp";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(signUpInfo)
      });

      if (!response.ok) {
        const result = await response.json();
        console.log(result);
        const { error } = result;
        const details = error?.details?.[0]?.message || 'An unknown error occurred';
        return handleFailure(details);
    }

      const result = await response.json();
      const { success, message, error } = result;

      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate('/login');
        }, 1000);
      } else if (error) {
        const details = error?.details[0].message;
        handleFailure(details);
      } else if (!success) {
        handleFailure(message);
      }
    } catch (error) {
      handleFailure(error);
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        background: "linear-gradient(180deg, #FFF7D8 0%, #FDC32B 100%)",
      }}
    >
      {/* NavBar */}
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

      {/* Main content */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "110vh", // Full screen height
          padding: 1,
          marginTop: "80px", // Adjusted for fixed NavBar
        }}
      >
        <Box
          component="form"
          onSubmit={handleSignUp}
          sx={{
            width: { xs: "100%", sm: "800px" },
            backgroundColor: "#fff",

            padding: 4,
            borderRadius: 3,
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          {/* Logo and Heading */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <img src="logo-url.png" alt="Logo" style={{ width: "40px", height: "40px" }} />
            <Typography variant="h5" component="h1" sx={{ fontWeight: "bold" }}>
              Hi Buddies
            </Typography>
          </Box>
          <Typography variant="h6" component="h2" sx={{ fontWeight: "bold", marginBottom: 3 }}>
            Create an account
          </Typography>

          {/* Form Fields */}
          <Grid2 container spacing={3}>
            {/* Left Column */}
            <Grid2 item xs={12} sm={6}>
              <TextField
                name="name"
                onChange={handleChange}
                label="Enter Your Username"
                variant="outlined"
                value={signUpInfo.name}
                fullWidth
                required
                sx={{ marginBottom: 2 }}
              />
              {/* <TextField
                name="motherTongue"
                onChange={handleChange}
                label="Enter Your Mother Tongue"
                variant="outlined"
                value={signUpInfo.motherTongue}
                fullWidth
                required
                sx={{ marginBottom: 2 }}
              /> */}

              <FormControl fullWidth required sx={{ marginBottom: 2 }}>
                <InputLabel>motherTongue</InputLabel>
                <Select
                  name="motherTongue"
                  value={signUpInfo.motherTongue}
                  onChange={handleChange}
                  label="Select your Mother Tongue"
                >
                  <MenuItem value="en">English</MenuItem>
                  <MenuItem value="hi">Hindi</MenuItem>
                  <MenuItem value="mr">Marathi</MenuItem>
                  <MenuItem value="gu">Gujarati</MenuItem>
                  <MenuItem value="ta">Tamil</MenuItem>
                  <MenuItem value="te">Telugu</MenuItem>
                  <MenuItem value="bn">Bengali</MenuItem>
                  <MenuItem value="ml">Malayalam</MenuItem>
                  <MenuItem value="kn">Kannada</MenuItem>
                  <MenuItem value="or">Odia</MenuItem>
                  <MenuItem value="pa">Punjabi</MenuItem>
                  <MenuItem value="ur">Urdu</MenuItem>
                  <MenuItem value="as">Assamese</MenuItem>
                  <MenuItem value="si">Sinhalese</MenuItem>
                  <MenuItem value="ne">Nepali</MenuItem>

                </Select>
              </FormControl>

              <FormControl fullWidth required sx={{ marginBottom: 2 }}>
                <InputLabel>How good are you at English?</InputLabel>
                <Select
                  name="fluency"
                  value={signUpInfo.fluency}
                  onChange={handleChange}
                  label="How good are you at English?"
                >
                  <MenuItem value="Beginner">Beginner</MenuItem>
                  <MenuItem value="Intermediate">Intermediate</MenuItem>
                  <MenuItem value="Fluent">Fluent</MenuItem>
                </Select>
              </FormControl>
            </Grid2>

            {/* Right Column */}
            <Grid2 item xs={12} sm={6}>
              <TextField
                name="email"
                onChange={handleChange}
                label="Email Id"
                variant="outlined"
                type="email"
                value={signUpInfo.email}
                fullWidth
                required
                sx={{ marginBottom: 2 }}
              />
              <TextField
                name="password"
                onChange={handleChange}
                label="Password"
                variant="outlined"
                type="password"
                value={signUpInfo.password}
                fullWidth
                required
                sx={{ marginBottom: 2 }}
              />
              <TextField
                name="confirmPassword"
                onChange={handleChange}
                label="Confirm Password"
                variant="outlined"
                type="password"
                value={signUpInfo.confirmPassword}
                fullWidth
                required
                sx={{ marginBottom: 2 }}
              />
            </Grid2>
          </Grid2>

          {/* Privacy Policy Checkbox */}
          <FormControlLabel
            control={<Checkbox />}
            label="All your information is collected, stored, and processed as per our data processing guidelines. By signing up, you agree to our Privacy Policy and Terms of Use."
            sx={{ marginBottom: 3 }}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              background: "#664419",
              padding: 2,
              fontWeight: "bold",
              textTransform: "uppercase",
              fontSize: "1.1rem",
            }}
          >
            Sign Up
          </Button>

          {/* Login Redirect */}
          <Typography variant="body1" sx={{ marginTop: 2 }}>
            Already have an account? <Link to='/login'>Login</Link>
          </Typography>

          <ToastContainer />
        </Box>
      </Box>
    </Box>
  );
}

export default SignUp;
