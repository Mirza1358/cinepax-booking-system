import express from 'express';
import { getMovies, getMovieById, getShowtimesByCity, updateMovieSeats } from '../controllers/movieController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getMovies);
router.get('/:id', getMovieById);
router.get('/showtimes/:city', getShowtimesByCity);

// Protected routes
router.put('/:id/seats', protect, updateMovieSeats);

export default router; 