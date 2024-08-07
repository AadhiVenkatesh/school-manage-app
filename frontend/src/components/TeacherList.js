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

function TeacherList({ token }) {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/teachers", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setTeachers(response.data))
      .catch((error) => console.error("Error fetching teachers:", error));
  }, [token]);

  return (
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
        Teacher List
      </Typography>

      <Paper elevation={3}>
        <List>
          {teachers.map((teacher) => (
            <ListItem key={teacher.teacher_id}>
              <ListItemText
                primary={teacher.name}
                secondary={`Subject: ${teacher.subject}`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
}

export default TeacherList;
