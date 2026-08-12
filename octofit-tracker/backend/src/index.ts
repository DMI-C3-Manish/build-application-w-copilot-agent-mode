import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8000;
const mongodbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit-tracker';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(mongodbUri);
    console.log('✓ MongoDB connected successfully');
  } catch (error) {
    console.error('✗ MongoDB connection failed:', error);
    process.exit(1);
  }
};

// Routes
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', message: 'OctoFit Tracker API is running' });
});

// Start Server
const startServer = async () => {
  await connectDB();
  
  app.listen(port, () => {
    console.log(`\n✓ OctoFit Tracker Backend Server running on http://localhost:${port}`);
    console.log(`✓ Environment: ${process.env.NODE_ENV}`);
    console.log(`✓ MongoDB URI: ${mongodbUri}\n`);
  });
};

startServer();
