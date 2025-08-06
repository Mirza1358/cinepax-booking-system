import mongoose from 'mongoose';
import Movie from '../models/Movie.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../config.env') });

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected for seeding...'))
    .catch(err => console.error('MongoDB connection error:', err));

const movies = [
    {
        id: '1',
        title: 'AKAL',
        format: '2D',
        language: 'English',
        imagePath: 'akaal-the-unconquered.jpeg',
        showtimes: {
            'Arena Islamabad': { time: '09:00 PM' },
            'Arena Lahore': { time: '03:00 PM' },
            'Arena Karachi': { time: '07:00 PM' }
        }
    },
    {
        id: '2',
        title: 'THE AMATEUR',
        format: '2D',
        language: 'English',
        imagePath: 'the-amateur.jpeg',
        showtimes: {
            'Arena Islamabad': { time: '01:00 PM' },
            'Arena Lahore': { time: '05:00 PM' }
        }
    },
    {
        id: '3',
        title: 'THE SINNERS',
        format: '2D',
        language: 'English',
        imagePath: 'sinners.jpeg',
        showtimes: {
            'Arena Islamabad': { time: '11:00 AM' },
            'Arena Karachi': { time: '08:00 PM' }
        }
    },
    {
        id: '4',
        title: 'CARRY ON JATTA 3',
        format: '2D',
        language: 'Punjabi',
        imagePath: 'carry-on-jatta-3.jpg',
        showtimes: {
            'Arena Lahore': { time: '02:00 PM' },
            'Arena Karachi': { time: '06:00 PM' }
        }
    }
];

const seedMovies = async () => {
    try {
        // Clear existing movies
        await Movie.deleteMany({});
        
        // Insert new movies
        await Movie.insertMany(movies);
        
        console.log('Database seeded successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedMovies(); 