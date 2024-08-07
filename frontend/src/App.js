import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import StudentList from "./components/StudentList";
import TeacherList from "./components/TeacherList";
import AddStudent from "./components/AddStudent";
import AddTeacher from "./components/AddTeacher";
import Navbar from "./components/Navbar";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const handleLogin = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
  };

  const handleLogout = () => {
    setToken("");
    localStorage.removeItem("token");
  };

  return (
    <Router>
      <Navbar onLogout={handleLogout} />
      <Routes>
        <Route path="/login" element={<Login setToken={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/students"
          element={
            token ? (
              <StudentList token={token} />
            ) : (
              <Login setToken={handleLogin} />
            )
          }
        />
        <Route
          path="/teachers"
          element={
            token ? (
              <TeacherList token={token} />
            ) : (
              <Login setToken={handleLogin} />
            )
          }
        />
        <Route
          path="/add-student"
          element={
            token ? (
              <AddStudent token={token} />
            ) : (
              <Login setToken={handleLogin} />
            )
          }
        />
        <Route
          path="/add-teacher"
          element={
            token ? (
              <AddTeacher token={token} />
            ) : (
              <Login setToken={handleLogin} />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
