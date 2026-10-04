const User = require('../models/userModel');

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
}

// Add a new user
exports.addUser = async (req, res) => {
    const { name, age } = req.body;
    const user = new User({ name, age });   // creating a new user instance using the User model
    try {
        const savedUser = await user.save();        // saved to db
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ message: 'Error adding user', error });
    }
}


// TODO: update and delete user