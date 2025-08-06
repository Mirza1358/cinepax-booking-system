import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Movie from './models/Movie.js';

// Load env vars
dotenv.config({ path: './config.env' });

// Movies data from App.jsx
const movies = [
    {
        movieId: '1',
        title: 'AKAL',
        format: '2D',
        language: 'English',
        imagePath: 'akaal-the-unconquered.jpeg',
        showtimes: [
            { city: 'Arena Islamabad', time: '09:00 PM', availableSeats: Array(8).fill().map(() => Array(8).fill(true)) },
            { city: 'Arena Lahore', time: '03:00 PM', availableSeats: Array(8).fill().map(() => Array(8).fill(true)) },
            { city: 'Arena Karachi', time: '07:00 PM', availableSeats: Array(8).fill().map(() => Array(8).fill(true)) }
        ],
        isActive: true
    },
    {
        movieId: '2',
        title: 'THE AMATEUR',
        format: '2D',
        language: 'English',
        imagePath: 'the-amateur.jpeg',
        showtimes: [
            { city: 'Arena Islamabad', time: '01:00 PM', availableSeats: Array(8).fill().map(() => Array(8).fill(true)) },
            { city: 'Arena Lahore', time: '05:00 PM', availableSeats: Array(8).fill().map(() => Array(8).fill(true)) }
        ],
        isActive: true
    },
    {
        movieId: '3',
        title: 'THE SINNERS',
        format: '2D',
        language: 'English',
        imagePath: 'sinners.jpeg',
        showtimes: [
            { city: 'Arena Islamabad', time: '04:00 PM', availableSeats: Array(8).fill().map(() => Array(8).fill(true)) },
            { city: 'Arena Lahore', time: '08:00 PM', availableSeats: Array(8).fill().map(() => Array(8).fill(true)) },
            { city: 'Arena Karachi', time: '02:00 PM', availableSeats: Array(8).fill().map(() => Array(8).fill(true)) }
        ],
        isActive: true
    },
    {
        movieId: '4',
        title: 'Carry On Jatta 3',
        format: '2D',
        language: 'Punjabi',
        imagePath: 'carry-on-jatta-3.jpg',
        showtimes: [
            { city: 'Arena Islamabad', time: '03:45 PM', availableSeats: Array(8).fill().map(() => Array(8).fill(true)) }
        ],
        isActive: true
    },
    {
        movieId: '5',
        title: 'A Minecraft Movie',
        format: '2D',
        language: 'English',
        imagePath: 'a-minecraft-movie.jpeg',
        showtimes: [
            { city: 'Arena Islamabad', time: '12:00 PM', availableSeats: Array(8).fill().map(() => Array(8).fill(true)) },
            { city: 'Arena Lahore', time: '02:15 PM', availableSeats: Array(8).fill().map(() => Array(8).fill(true)) }
        ],
        isActive: true
    },
    {
        movieId: '6',
        title: 'A Minecraft Movie',
        format: '3D',
        language: 'English',
        imagePath: 'a-minecraft-movie (1).jpeg',
        showtimes: [
            { city: 'Arena Islamabad', time: '06:15 PM', availableSeats: Array(8).fill().map(() => Array(8).fill(true)) },
            { city: 'Arena Karachi', time: '11:15 AM', availableSeats: Array(8).fill().map(() => Array(8).fill(true)) }
        ],
        isActive: true
    }
];

async function updateMovies() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB Atlas');

        // Clear existing movies
        await Movie.deleteMany({});
        console.log('Cleared existing movies');

        // Insert new movies
        await Movie.insertMany(movies);
        console.log('Inserted new movies');

        // Verify the movies were inserted correctly
        const insertedMovies = await Movie.find({});
        console.log('Inserted movies count:', insertedMovies.length);
        console.log('First movie sample:', JSON.stringify(insertedMovies[0], null, 2));

        console.log('Database update completed successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error updating database:', error);
        process.exit(1);
    }
}

updateMovies(); 