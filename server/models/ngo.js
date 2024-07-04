
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const NGOSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

const NGO = model('NGO', NGOSchema);

export default NGO;
