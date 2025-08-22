import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
    movieId: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    format: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    imagePath: {
        type: String,
        required: true
    },
    showtimes: [{
        city: {
            type: String,
            required: true
        },
        time: {
            type: String,
            required: true
        },
        availableSeats: {
            type: [[Boolean]],
            default: () => Array(8).fill().map(() => Array(8).fill(true))
        }
    }],
    isActive: {
        type: Boolean,
        default: true
    }
});

const Movie = mongoose.model('Movie', movieSchema);
export default Movie; 