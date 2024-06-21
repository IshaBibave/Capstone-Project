import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { dbConnection } from './database/dbConnection.js';
import { errorMiddleware } from './error/error.js';
import reservationRouter from './routes/reservationRoute.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config({ path: './config/config.env' });

const app = express();

// Middleware
app.use(cors({
  origin: [process.env.FRONTEND_URL], // Replace with your front-end URL
  methods: ['POST'],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/v1/reservation', reservationRouter);
app.use('/api', authRoutes); // Include the authentication routes

// Error handling middleware
app.use(errorMiddleware);

// MongoDB Connection
const dbURI = process.env.MONGODB_URI; // Replace with your MongoDB URI
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit process with failure
  });

export default app;

