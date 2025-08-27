import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import jobRoutes from './routes/jobRoutes.js';

dotenv.config();
const connectDB = require('./config/db');


const app = express();

// middleware
app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// routes
app.get('/', (req, res) => {
  res.json({ message: 'Job Application Tracker API is running' });
});

app.use('/api/jobs', jobRoutes);

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

// error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Server Error' });
});

const PORT = 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://job:Kkenu549@kenushan.vqj2mlc.mongodb.net/?retryWrites=true&w=majority&appName=kenushan';

connectDB(MONGO_URI).then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
  });
}).catch((err) => {
  console.error('Mongo connection failed:', err);
  process.exit(1);
});