import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userRoutes from './routes/user.js';
import ngoRoutes from './routes/ngo.js'; 
import ngoEventRoutes from './routes/event.js';
import cors from 'cors';
import 'dotenv/config';
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB URI
const dbURI = 'mongodb+srv://empower:empower123@cluster0.41cwyor.mongodb.net/'; // Replace with your MongoDB URI

// Connect to MongoDB
mongoose.connect(dbURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(`MongoDB connection error: ${err}`));

// Handle Mongoose connection events
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to DB');
});

mongoose.connection.on('error', (err) => {
  console.log(`Mongoose connection error: ${err}`);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected from DB');
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/ngos', ngoRoutes); 
app.use('/api/events', ngoEventRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
