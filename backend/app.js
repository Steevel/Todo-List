require("dotenv").config();
const connectToDB = require("./config/db");
const express = require("express");
const todoRoutes = require("./routes/todoRoutes");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: true, credentials: true }));

// Connect to the database
connectToDB();

// Load routes
app.use("/api/todo", todoRoutes);
app.use("/api/auth", authRoutes);

module.exports = app;
