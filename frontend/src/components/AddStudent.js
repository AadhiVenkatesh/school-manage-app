import React, { useState } from "react";
import axios from "axios";

import { TextField, Button, Typography, Box } from "@mui/material";

function AddStudent({ token }) {
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("");

  const handleAddStudent = async () => {
    try {
      await axios.post(
        "http://localhost:3001/students",
        { name, grade },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Student added successfully");
    } catch (error) {
      alert("Error adding student");
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
        Add Student
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
        value={grade}
        onChange={(e) => setGrade(e.target.value)}
        label="Grade"
        variant="outlined"
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleAddStudent}
        sx={{ mt: 2 }}
        fullWidth
      >
        Add Student
      </Button>
    </Box>
  );
}

export default AddStudent;
