-- database.sql

CREATE TABLE Users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT CHECK(role IN ('student', 'teacher')) NOT NULL
);

CREATE TABLE Students (
    student_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    grade TEXT,
    user_id INTEGER NOT NULL,
    FOREIGN KEY(user_id) REFERENCES Users(user_id)
);

CREATE TABLE Teachers (
    teacher_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    subject TEXT,
    user_id INTEGER NOT NULL,
    FOREIGN KEY(user_id) REFERENCES Users(user_id)
);
