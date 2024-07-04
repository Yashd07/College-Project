// models/Event.js
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const ApplicantSchema = new Schema({
  name: {
    type: String,
    // required: true
  },
  email: {
    type: String,
    // required: true
  }
});


const EventSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  ngo: {
    type: Schema.Types.ObjectId,
    ref: 'NGO',
    // required: true
  },
  ngoName: {
    type: String,
    // required: true
  },
  ngoEmail: {
    type: String,
    // required: true
  },
  applicants: [ApplicantSchema] 
});

const Event = model('Event', EventSchema);

export default Event;
