import mongoose from 'mongoose';
import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

const mongoURI = process.env.MONGO_URI as string;
const redisURI = process.env.REDIS_URI as string;

mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

const redisClient = createClient({ url: redisURI });
redisClient.on('error', (err) => console.error('Redis connection error:', err));
redisClient.connect().then(() => console.log('Connected to Redis'));

export { mongoose, redisClient };
