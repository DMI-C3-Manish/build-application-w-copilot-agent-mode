import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './index';

dotenv.config();

const port = process.env.PORT || 8000;
const mongodbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Get API base URL for Codespaces or localhost
 * - In Codespaces: https://$CODESPACE_NAME-8000.app.github.dev
 * - Locally: http://localhost:8000
 */
const getApiUrl = (): string => {
  if (process.env.CODESPACE_NAME) {
    return `https://${process.env.CODESPACE_NAME}-${port}.app.github.dev`;
  }
  return `http://localhost:${port}`;
};

/**
 * Connect to MongoDB database
 */
const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(mongodbUri);
    console.log('✓ MongoDB connected successfully');
  } catch (error) {
    console.error('✗ MongoDB connection failed:', error);
    process.exit(1);
  }
};

/**
 * Start the Express server
 */
const startServer = async (): Promise<void> => {
  await connectDB();

  app.listen(port, () => {
    const apiUrl = getApiUrl();
    console.log(`\n✓ OctoFit Tracker Backend Server running on ${apiUrl}`);
    console.log(`✓ Port: ${port}`);
    console.log(`✓ Environment: ${process.env.NODE_ENV}`);
    console.log(`✓ MongoDB URI: ${mongodbUri}`);
    console.log(`✓ Codespaces Name: ${process.env.CODESPACE_NAME || 'Not in Codespaces'}\n`);
  });
};

// Export for testing
export { getApiUrl, connectDB, startServer };

// Start the server
startServer();
