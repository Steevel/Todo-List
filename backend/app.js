require('dotenv').config();
const connectToDB = require('./config/db');
const express = require('express');
const todoRoutes = require('./routes/todoRoutes');
const cors = require('cors');

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// Connect to the database
connectToDB();

// Load routes
app.use('/', todoRoutes)

module.exports = app;