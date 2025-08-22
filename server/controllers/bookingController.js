import Booking from '../models/Booking.js';

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Public
export const createBooking = async (req, res) => {
    try {
        console.log('Received booking request with body:', JSON.stringify(req.body, null, 2));
        
        const { movieId, movieTitle, customerInfo, showtime, selectedSeats } = req.body;

        // Log validation check
        console.log('Validating fields:', {
            hasMovieId: !!movieId,
            hasMovieTitle: !!movieTitle,
            hasCustomerInfo: !!customerInfo,
            hasShowtime: !!showtime,
            hasSelectedSeats: !!selectedSeats
        });

        // Validate required fields
        if (!movieId || !movieTitle || !customerInfo || !showtime || !selectedSeats) {
            console.log('Validation failed. Missing fields.');
            return res.status(400).json({
                success: false,
                message: 'Missing required booking information'
            });
        }

        // Calculate total amount
        const totalAmount = selectedSeats.length * 1000; // Rs. 1000 per seat

        console.log('Creating booking with data:', {
            customerName: customerInfo.name,
            customerEmail: customerInfo.email,
            movieId,
            movieTitle,
            showtime,
            selectedSeats,
            totalAmount
        });

        // Create the booking
        const booking = await Booking.create({
            customerName: customerInfo.name,
            customerEmail: customerInfo.email,
            movieId,
            movieTitle,
            showtime,
            selectedSeats,
            totalAmount,
            bookingStatus: 'confirmed',
            paymentStatus: 'completed'
        });

        console.log('Booking created successfully:', booking);

        // Send success response with booking details
        res.status(201).json({
            success: true,
            data: {
                bookingId: booking.bookingNumber || booking._id,
                movieTitle: booking.movieTitle,
                customerName: booking.customerName,
                showtime: booking.showtime,
                seats: booking.selectedSeats,
                totalAmount: booking.totalAmount,
                bookingStatus: booking.bookingStatus
            },
            message: 'Booking confirmed successfully!'
        });
    } catch (error) {
        console.error('Booking error details:', {
            name: error.name,
            message: error.message,
            stack: error.stack
        });
        
        // Send a more specific error message
        res.status(400).json({
            success: false,
            message: error.name === 'ValidationError' 
                ? 'Invalid booking data provided' 
                : 'Failed to complete booking. Please try again.'
        });
    }
};

// @desc    Get user bookings
// @route   GET /api/bookings
// @access  Public
export const getUserBookings = async (req, res) => {
    try {
        const { email } = req.query;
        
        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'Email is required'
            });
        }

        const bookings = await Booking.find({ customerEmail: email })
            .sort('-createdAt');

        res.json({
            success: true,
            data: bookings
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}; 