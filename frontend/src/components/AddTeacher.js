import React, { useState } from "react";
import axios from "axios";

import { TextField, Button, Typography, Box } from "@mui/material";

function AddTeacher({ token }) {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");

  const handleAddTeacher = async () => {
    try {
      await axios.post(
        "http://localhost:3001/teachers",
        { name, subject },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Teacher added successfully");
    } catch (error) {
      alert("Error adding teacher");
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        p: 3,
        mt: 5,
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography variant="h4" gutterBottom align="center">
        Add Teacher
      </Typography>

      <TextField
        fullWidth
        margin="normal"
        value={name}
        onChange={(e) => setName(e.target.value)}
        label="Name"
        variant="outlined"
      />

      <TextField
        fullWidth
        margin="normal"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        label="Subject"
        variant="outlined"
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleAddTeacher}
        sx={{ mt: 2 }}
        fullWidth
      >
        Add Teacher
      </Button>
    </Box>
  );
}

export default AddTeacher;
