import { Router } from 'express';
const router = Router();
import { addJob, getAllJobs } from '../controllers/jobController.js';

// Add Job
router.post('/add', addJob);

// Get all Jobs
router.get('/all', getAllJobs);

export default router;
