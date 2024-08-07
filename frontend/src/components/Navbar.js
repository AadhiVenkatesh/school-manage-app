import React from "react";
import { Link } from "react-router-dom";

import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";

function Navbar({ onLogout }) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{ color: "white", textDecoration: "none" }}
          >
            School Mangement
          </Typography>
        </Box>
        <Button color="inherit" component={Link} to="/students">
          Students
        </Button>
        <Button color="inherit" component={Link} to="/teachers">
          Teachers
        </Button>
        <Button color="inherit" component={Link} to="/add-student">
          Add Student
        </Button>
        <Button color="inherit" component={Link} to="/add-teacher">
          Add Teacher
        </Button>
        <Button color="inherit" component={Link} to="/register">
          Register
        </Button>
        <Button color="inherit" component={Link} to="/login">
          Login
        </Button>
        <Button color="inherit" onClick={onLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
