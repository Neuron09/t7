const express = require('express');
const mongoose = require('mongoose'); 
const router = express.Router();
const User = require('../model/users');

// Get all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        if (!users || users.length === 0) {
            return res.status(404).json({
                message: "No users found",
                success: false,
            });
        }

        const formattedUsers = users.map(user => ({
            email: user.email,
            firstName: user.firstName,
            id: user.id
        }));

        res.status(200).json({
            message: "Users retrieved",
            success: true,
            users: formattedUsers
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: error.message,
        });
    }
});

// Get user by ID
router.get('/user/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "No user found with the provided ID",
                success: false,
            });
        }

        const formattedUser = {
            email: user.email,
            firstName: user.firstName,
            id: user.id
        };

        res.status(200).json({
            message: "User retrieved",
            success: true,
            user: formattedUser
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: error.message,
        });
    }
});

// Update user by ID
router.put('/update/:id', async (req, res) => {
    try {
        let user = await User.findById(req.params.id);
  
        // Check if body of the request is correct
        if (!req.body.email) {
            return res.status(400).json({
                message: "Incorrect Request",
                success: false,
            });
        }
  
        if (!user) {
            return res.status(404).json({
                message: "No user found with the provided ID",
                success: false,
            });
        }
  
        // Check if a user with this email already exists
        let existingUser = await User.findOne({ email: req.body.email });
        if (existingUser && existingUser._id != req.params.id) {
            return res.status(400).json({
                message: "A user with this email already exists",
                success: false,
            });
        }

        user.email = req.body.email;
        if (req.body.firstName) {
            user.firstName = req.body.firstName;
        }
  
        await user.save();
  
        res.status(200).json({
            message: "User updated",
            success: true
        });
  
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: error.message,
        });
    }
});

// Add new user  
  router.post('/add', async (req, res) => {
    try {
        // Check if body of the request is correct
        if (!req.body.email) {
            return res.status(400).json({
                message: "Incorrect Request",
                success: false,
            });
        }

        // Check if a user with this email already exists
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({
                message: "A user with this email already exists",
                success: false,
            });
        }

        const newUser = new User({
            _id: new mongoose.Types.ObjectId(),
            email: req.body.email,
            firstName: req.body.firstName 
        }, { versionKey: false }); 

        
        await newUser.save();

        res.status(200).json({
            message: "User added",
            success: true
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: error.message,
        });
    }
});

// Delete user by ID
router.delete('/delete/:id', async (req, res) => {
    const id = new mongoose.Types.ObjectId(req.params.id); 
    try {
      const result = await User.deleteOne({ _id: id });
      if (result.deletedCount > 0) {
        res.status(200).json({
          success: true,
          message: "User deleted"
        });
      } else {
        res.status(404).json({
          success: false,
          message: "No user found to delete"
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message
      });
    }
  });
  
// Export router
module.exports = router;
