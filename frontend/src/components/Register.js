import React, { useState } from "react";
import axios from "axios";

import { TextField, MenuItem, Button, Typography, Box } from "@mui/material";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("");
  const [subject, setSubject] = useState("");

  const handleRegister = async () => {
    try {
      await axios.post("http://localhost:3001/register", {
        username,
        password,
        role,
        name,
        grade,
        subject,
      });
      alert("Registered successfully");
    } catch (error) {
      alert("Registration failed");
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        p: 2,
        border: "1px solid #ccc",
        borderRadius: 2,
      }}
    >
      <Typography variant="h4" gutterBottom align="center">
        Register
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

      <TextField
        fullWidth
        margin="normal"
        select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        label="Role"
        variant="outlined"
      >
        <MenuItem value="student">Student</MenuItem>
        <MenuItem value="teacher">Teacher</MenuItem>
      </TextField>

      <TextField
        fullWidth
        margin="normal"
        value={name}
        onChange={(e) => setName(e.target.value)}
        label="Name"
        variant="outlined"
      />

      {role === "student" && (
        <TextField
          fullWidth
          margin="normal"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          label="Grade"
          variant="outlined"
        />
      )}

      {role === "teacher" && (
        <TextField
          fullWidth
          margin="normal"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          label="Subject"
          variant="outlined"
        />
      )}

      <Button
        variant="contained"
        color="primary"
        onClick={handleRegister}
        sx={{ mt: 2 }}
        fullWidth
      >
        Register
      </Button>
    </Box>
  );
};

export default Register;
