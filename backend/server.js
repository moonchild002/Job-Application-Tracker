import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import jobRoutes from './routes/jobRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import nodemailer from 'nodemailer';
import Contact from './models/Contact.js';


dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// MongoDB connection
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://job:Kkenu549@kenushan.vqj2mlc.mongodb.net/?retryWrites=true&w=majority&appName=kenushan';

connectDB(MONGO_URI).then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
  });
}).catch((err) => {
  console.error('Mongo connection failed:', err);
  process.exit(1);
});

// Routes
// Simple request logger for debugging
app.use('/api', (req, res, next) => {
  console.log(`[API] ${req.method} ${req.originalUrl}`)
  next()
})

app.get('/', (req, res) => {
  res.json({ message: 'Job Application Tracker API is running' });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ ok: true })
})

// Test contacts route
app.get('/api/contacts/test', (req, res) => {
  res.json({ message: 'Contacts route is working' })
})

app.use('/api/jobs', jobRoutes);

// =======================
// Contact Form Route (Legacy - now saves to DB + sends email)
// =======================
app.post('/api/contact', async (req, res) => {
  const { name, nic, dob, address, phone, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, Email and Message are required' });
  }

  try {
    // First save to database
    const contact = await Contact.create({
      name,
      phone,
      email,
      address,
      nic,
      dob: dob ? new Date(dob) : undefined,
      message
    });

    // Then send email
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER,
      subject: `Contact Form Message from ${name}`,
      html: `
        <h3>Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>NIC:</strong> ${nic}</p>
        <p><strong>Date of Birth:</strong> ${dob}</p>
        <p><strong>Address:</strong> ${address}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: 'Email sent successfully', contactId: contact._id });
  } catch (err) {
    console.error('Contact save/email failed:', err);
    res.status(500).json({ success: false, error: 'Failed to save contact or send email' });
  }
});

// Place contacts routes after the legacy contact route to avoid conflicts
app.use('/api/contacts', contactRoutes);

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

// error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Server Error' });
});
