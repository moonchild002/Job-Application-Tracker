import Contact from '../models/Contact.js';

// Get all contacts for admin dashboard
export const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find().sort({ submittedAt: -1 });
    res.json(contacts);
  } catch (err) {
    next(err);
  }
};

// Get single contact by ID
export const getContactById = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ error: 'Contact not found' });
    res.json(contact);
  } catch (err) {
    next(err);
  }
};

// Create new contact (when form is submitted)
export const createContact = async (req, res, next) => {
  try {
    const { name, phone, email, address, nic, dob, message } = req.body;
    
    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, Email and Message are required' });
    }

    const contact = await Contact.create({
      name,
      phone,
      email,
      address,
      nic,
      dob: dob ? new Date(dob) : undefined,
      message
    });

    res.status(201).json(contact);
  } catch (err) {
    next(err);
  }
};

// Delete contact
export const deleteContact = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) return res.status(404).json({ error: 'Contact not found' });
    res.json({ message: 'Contact deleted successfully' });
  } catch (err) {
    next(err);
  }
}; 