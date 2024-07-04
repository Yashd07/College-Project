// routes/ngo.js
import express from 'express';
import { registerNGO, loginNGO } from '../controllers/ngoController.js';

const router = express.Router();

// @route   POST api/ngos/register
// @desc    Register NGO
// @access  Public
router.post('/register', registerNGO);

// @route   POST api/ngos/login
// @desc    Login NGO
// @access  Public
router.post('/login', loginNGO);

export default router;
