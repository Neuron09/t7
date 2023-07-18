// Import mongoose
const mongoose = require('mongoose');

// Definition of User schema
const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, 
    email: { type: String, required: true }, 
    firstName: { type: String, required: false }, 
}, { versionKey: false }); 

// Export User model
module.exports = mongoose.model('User', userSchema, 'users');

