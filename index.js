const express = require('express');
const mongoose = require('mongoose'); 
const userRouter = require('./routes/user');
const bodyParser = require('body-parser');
const cors = require('cors');

// Create express app
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb+srv://sreyag1994:tiFHm7ln8lg9NNqa@cluster0.1lpjznv.mongodb.net/my_database', { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
}).then(() => {
  console.log("Connected to MongoDB"); 
}).catch(err => {
  console.error('An error occurred while trying to connect to MongoDB', err); 
});

// Use cors middleware to allow cross origin requests
app.use(cors());

// Use body-parser middleware to parse request body
app.use(bodyParser.json());

// Handle requests starting with '/t7'
app.use('/t7', userRouter);

// Defining server port
const port = process.env.PORT || 3000;

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`); 
});
