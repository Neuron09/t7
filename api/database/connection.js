// Load the mongoose library
const mongoose = require('mongoose');

// Asynchronous function to connect to the MongoDB
const connectDB = async () => {
  try {
    // Attempt to connect to the MongoDB instance
    await mongoose.connect('mongodb+srv://sreyag1994:tiFHm7ln8lg9NNqa@cluster0.1lpjznv.mongodb.net/?retryWrites=true&w=majority', 
      { useNewUrlParser: true, useUnifiedTopology: true });

    // Log success message
    console.log('MongoDB Connected...');
  } catch(err) {
    // Log error message
    console.error(err.message);

    // Exit process with failure status
    process.exit(1);
  }
};

// Export the connectDB function
module.exports = connectDB;
