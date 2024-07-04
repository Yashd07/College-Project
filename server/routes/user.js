// routes/user.js
import express from 'express';
import { register, login } from '../controllers/userController.js';

const router = express.Router();

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post('/register', register);

// @route   POST api/users/login
// @desc    Login user
// @access  Public
router.post('/login', login);

export default router;
