const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
}

// Sign in a user
const signInUser = async (req, res) => {
    const {email, password} = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // finding the user in db agains the email
        const user = await User.findOne({ email });
        // handle user not found
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // compare the hashed password with the provided password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // generate a JWT token for the authenticated user
        const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // sending the token back to the client
        res.status(200).json({ message: 'User signed in successfully', token });
    } catch (error) {
        res.status(500).json({ message: 'Error signing in user', error });
    }
}

// Add a new user
const signUpUser = async (req, res) => {
    const { name, email, password } = req.body;
    // validation: check if all required fields are provided
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    // validation: check if password meets minimum length requirement
    if (password.length < 8) {
        return res.status(400).json({ message: 'Password must be at least 8 characters long' });
    }
    
    try {
        // check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // create a new user
        const user = new User({ name, email, password });   // creating a new user instance using the User model
        const savedUser = await user.save();        // saved to db
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ message: 'Error adding user', error: error.message });
    }
}

module.exports = {
    getAllUsers,
    signInUser,
    signUpUser
};

// TODO: update and delete user