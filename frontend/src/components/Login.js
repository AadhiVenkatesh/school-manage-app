import React, { useState } from "react";
import axios from "axios";

import { TextField, Button, Typography, Box } from "@mui/material";

function Login({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3001/login", {
        username,
        password,
      });
      setToken(response.data.token);
    } catch (error) {
      alert("Login failed");
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        p: 3,
        border: "1px solid #ccc",
        borderRadius: 2,
        boxShadow: 3,
        mt: 5,
      }}
    >
      <Typography variant="h4" gutterBottom align="center">
        Login
      </Typography>

      <TextField
        fullWidth
        margin="normal"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        label="Username"
        variant="outlined"
      />

      <TextField
        fullWidth
        margin="normal"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        label="Password"
        variant="outlined"
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleLogin}
        sx={{ mt: 2 }}
        fullWidth
      >
        Login
      </Button>
    </Box>
  );
}

export default Login;
