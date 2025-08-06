import express from 'express';
import { createBooking, getUserBookings } from '../controllers/bookingController.js';

const router = express.Router();

// Public routes - no authentication required
router.post('/', createBooking);
router.get('/', getUserBookings);

// Log when routes are initialized
console.log('Booking routes initialized');

export default router; 