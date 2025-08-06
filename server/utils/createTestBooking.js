import mongoose from 'mongoose';
import Booking from '../models/Booking.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env vars with correct path
dotenv.config({ path: path.join(__dirname, '../config.env') });

const createTestBooking = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB Connected');

        // Create a simple test booking
        const booking = await Booking.create({
            user: new mongoose.Types.ObjectId(), // Dummy user ID
            movie: new mongoose.Types.ObjectId(), // Dummy movie ID
            showtime: {
                city: "Islamabad",
                theater: "Arena",
                time: "14:30",
                date: new Date()
            },
            seats: [
                { row: 'A', number: 1 }
            ],
            totalAmount: 1500,
            bookingStatus: 'confirmed',
            paymentStatus: 'completed',
            pointsEarned: 150
        });

        console.log('Test booking created:', booking);
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

createTestBooking(); 