import NGO from '../models/ngo.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const jwtSecret = process.env.JWT_SECRET;

export const registerNGO = async (req, res) => {
  const { name, email, phone, password } = req.body;

  try {
    // Check if NGO already exists
    let ngo = await NGO.findOne({ email });
    if (ngo) {
      return res.status(400).json({ msg: 'NGO already exists' });
    }

    // Create new NGO
    ngo = new NGO({
      name,
      email,
      phone,
      password: await bcrypt.hash(password, 10)
    });

    await ngo.save();

    // Generate JWT token
    const token = jwt.sign({ id: ngo.id }, jwtSecret, { expiresIn: '1h' });

    res.status(201).json({ msg: 'NGO registered successfully', token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

export const loginNGO = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check for NGO
    let ngo = await NGO.findOne({ email });
    if (!ngo) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, ngo.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: ngo.id }, jwtSecret, ); //{ expiresIn: '1h' }

    res.status(200).json({ msg: 'Login successful', token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
