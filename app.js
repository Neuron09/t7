// Load required modules
const express = require('express');
const userRoutes = require('./api/routes/routes');
const connectDB = require('./api/database/connection'); 

// Create an Express.js application
const app = express();

// Use Express.js middleware to parse JSON bodies
app.use(express.json());

// Connect to the database
connectDB(); 

// Handle requests starting with '/t7'
app.use('/t7', userRoutes);

// Start the server and listen on port 3000
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
