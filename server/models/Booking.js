import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    bookingNumber: {
        type: String,
        unique: true
    },
    customerName: {
        type: String,
        required: true
    },
    customerEmail: {
        type: String,
        required: true
    },
    movieId: {
        type: String,
        required: true
    },
    movieTitle: {
        type: String,
        required: true
    },
    showtime: {
        time: {
            type: String,
            required: true
        },
        theater: {
            type: String,
            required: true
        }
    },
    selectedSeats: [{
        type: String,
        required: true
    }],
    totalAmount: {
        type: Number,
        required: true
    },
    bookingStatus: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'confirmed'
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'completed', 'refunded'],
        default: 'completed'
    }
}, {
    timestamps: true
});

// Generate unique booking number before saving
bookingSchema.pre('save', function(next) {
    if (!this.bookingNumber) {
        const date = new Date().toISOString().slice(0,10).replace(/-/g,'');
        const random = Math.random().toString(36).substring(2, 6).toUpperCase();
        this.bookingNumber = `BK-${date}-${random}`;
    }
    next();
});

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking; 