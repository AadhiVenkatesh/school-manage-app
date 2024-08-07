import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  Box,
} from "@mui/material";

function StudentList({ token }) {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/students", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setStudents(response.data))
      .catch((error) => console.error("Error fetching students:", error));
  }, [token]);

  return (
    <div>
      <Box
        sx={{
          maxWidth: 600,
          mx: "auto",
          p: 3,
          mt: 5,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" gutterBottom align="center">
          Student List
        </Typography>

        <Paper elevation={3}>
          <List>
            {students.map((student) => (
              <ListItem key={student.student_id}>
                <ListItemText
                  primary={student.name}
                  secondary={`Grade: ${student.grade}`}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
    </div>
  );
}

export default StudentList;
