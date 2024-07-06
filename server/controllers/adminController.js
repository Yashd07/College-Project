import Admin from '../models/admin.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

// Admin signup
export const signupAdmin = async (req, res) => {
  const { adminName, email, password } = req.body;

  try {
    // Check if admin already exists
    let admin = await Admin.findOne({ email });
    if (admin) {
      return res.status(400).json({ msg: 'Admin already exists' });
    }

    // Create new admin
    admin = new Admin({
      adminName,
      email,
      password: await bcrypt.hash(password, 10)
    });

    await admin.save();

    // Generate JWT token
    const token = jwt.sign({ id: admin.id }, jwtSecret, { expiresIn: '1h' });

    res.status(201).json({ msg: 'Admin registered successfully', token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Admin signin
export const signinAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check for admin
    let admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: admin.id }, jwtSecret, { expiresIn: '1h' });

    res.status(200).json({ msg: 'Login successful', token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
