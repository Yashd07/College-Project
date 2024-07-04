// controllers/userController.js
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const jwtSecret = process.env.JWT_SECRET;
console.log(process.env.JWT_SECRET);


export const register = async (req, res) => {
  const { name, mobileNo, email, password } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create new user
    user = new User({
      name,
      mobileNo,
      email,
      password: await bcrypt.hash(password, 10)
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign({ id: user.id }, jwtSecret, { expiresIn: '1h' });

    res.status(201).json({ msg: 'User registered successfully', accesToken: token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check for user
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id }, jwtSecret, ); //{ expiresIn: '1h' }

    res.status(200).json({msg: 'Login successful', user, accesToken: token});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
