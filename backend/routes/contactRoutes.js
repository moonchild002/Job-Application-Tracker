import { Router } from 'express';
import { getAllContacts, getContactById, createContact, deleteContact } from '../controllers/contactController.js';

const router = Router();

// Admin routes
router.get('/', getAllContacts); // Get all contacts for admin dashboard
router.get('/:id', getContactById); // Get single contact
router.post('/', createContact); // Create new contact
router.delete('/:id', deleteContact); // Delete contact

export default router; 