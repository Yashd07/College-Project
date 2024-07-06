import express from 'express';
import { signupAdmin, signinAdmin } from '../controllers/adminController.js';

const router = express.Router();

// Admin signup
router.post('/signup', signupAdmin);

// Admin signin
router.post('/signin', signinAdmin);

export default router;
