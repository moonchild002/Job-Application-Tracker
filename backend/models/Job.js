import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  company: { type: String, required: true, trim: true },
  title: { type: String, required: true, trim: true },
  status: { 
    type: String, 
    enum: ['Applied', 'Interview', 'Rejected', 'Offer', 'Hired'], 
    default: 'Applied' 
  },
  dateApplied: { type: Date, default: Date.now },
  notes: { type: String, trim: true }
}, { timestamps: true });

export default mongoose.model('Job', jobSchema);