// controllers/authController.js
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Adjust the path according to your project structure

exports.signUp = async (req, res) => {
  try {
    const { name, surname, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, surname, email, password: hashedPassword });
    await user.save();
    res.status(201).send('User registered successfully');
  } catch (error) {
    res.status(500).send('Error registering user');
  }
};

exports.logIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send('Invalid email or password');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send('Invalid email or password');
    }
    res.send('User logged in successfully');
  } catch (error) {
    res.status(500).send('Error logging in user');
  }
};
