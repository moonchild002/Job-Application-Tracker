import Job from '../models/Job.js';

export const getJobs = async (req, res, next) => {
  try {
    const { q, status, searchDate } = req.query;
    const filter = {};
    
    if (q) filter.company = { $regex: q, $options: 'i' };
    if (status && status !== 'All') filter.status = status;
    
    // Date search filtering
    if (searchDate) {
      const startOfDay = new Date(searchDate);
      startOfDay.setHours(0, 0, 0, 0);
      
      const endOfDay = new Date(searchDate);
      endOfDay.setHours(23, 59, 59, 999);
      
      filter.dateApplied = {
        $gte: startOfDay,
        $lte: endOfDay
      };
    }
    
    const jobs = await Job.find(filter).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    next(err);
  }
};

export const getJobById = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ error: 'Job not found' });
    res.json(job);
  } catch (err) {
    next(err);
  }
};

export const createJob = async (req, res, next) => {
  try {
    const { company, title, status, dateApplied, notes } = req.body;
    if (!company || !title) {
      return res.status(400).json({ error: 'company and title are required' });
    }
    const job = await Job.create({ company, title, status, dateApplied, notes });
    res.status(201).json(job);
  } catch (err) {
    next(err);
  }
};

export const updateJob = async (req, res, next) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!job) return res.status(404).json({ error: 'Job not found' });
    res.json(job);
  } catch (err) {
    next(err);
  }
};

export const deleteJob = async (req, res, next) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ error: 'Job not found' });
    res.json({ message: 'Job deleted' });
  } catch (err) {
    next(err);
  }
};