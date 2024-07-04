// controllers/eventController.js
import Event from '../models/event.js';
import NGO from '../models/ngo.js';

export const createEvent = async (req, res) => {
  const { name, image, startDate, endDate, description, location } = req.body;

  try {
    // Validate required fields
    if (!name || !image || !startDate || !endDate || !description || !location) {
      return res.status(400).json({ msg: 'Please fill in all required fields' });
    }

    // Fetch NGO details
    const ngo = await NGO.findById(req.user);
    if (!ngo) {
      return res.status(404).json({ msg: 'NGO not found' });
    }

    // Create new event
    const event = new Event({
      name,
      image,
      startDate,
      endDate,
      description,
      location,
      ngo: req.user,
      ngoName: ngo.name,
      ngoEmail: ngo.email
    });

    await event.save();

    res.status(201).json({ msg: 'Event created successfully', event });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

export const getEvents = async (req, res) => {
  try {
    // Fetch all events with NGO details
    const events = await Event.find().populate('ngo', 'name email');
    res.status(200).json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }

};


// export const getEventsByNGOId = async (req, res) => {
//   const ngoId = req.user._id; // ngoId is passed as a URL parameter

//   try {
//     const events = await Event.find({ ngo: ngoId }).populate('name', 'description');
//     res.json(events);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// };


export const applyToEvent = async (req, res) => {
  const { eventId } = req.params;
  const { name, email } = req.body;

  try {
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }

    const newApplicant = { name, email };

    event.applicants.push(newApplicant);

    await event.save();

    res.status(200).json({ msg: 'Applied to event successfully', event });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get applicants for an event (for NGO)
export const getEventApplicants = async (req, res) => {
  const { eventId } = req.params;

  try {
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }

    // Check if the logged-in NGO is the owner of the event
    if (event.ngo.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    res.status(200).json(event.applicants);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// export const getNGOEvents = async (req, res) => {
//   try {
//     const ngoId = req.user.id;

//     // Fetch all events for the specific NGO
//     const events = await Event.find({ ngo: ngoId }).populate('ngo', 'name email');

//     res.status(200).json(events);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// };