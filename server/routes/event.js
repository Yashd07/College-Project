// routes/ngoEvent.js
import express from 'express';
import { createEvent, getEvents , applyToEvent, getEventApplicants} from '../controllers/eventController.js';
import auth from '../middleware/auth.js'; 

const router = express.Router();


router.post('/', auth, createEvent);
router.get('/', getEvents);

//router.get('/:ngoId', auth, getEventsByNGOId);

// Apply to an event
router.post('/:eventId/apply', applyToEvent);

// Get applicants for an event
router.get('/:eventId/applicants', auth, getEventApplicants);
// router.get('/ngo', auth, getNGOEvents);

export default router;
