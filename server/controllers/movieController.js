import Movie from '../models/Movie.js';

// @desc    Get all movies
// @route   GET /api/movies
// @access  Public
export const getMovies = async (req, res) => {
    try {
        const { city, date } = req.query;
        let query = { isActive: true };

        // Filter by city if provided
        if (city) {
            query['showtimes.city'] = city;
        }

        // Filter by date if provided
        if (date) {
            const searchDate = new Date(date);
            query['showtimes.date'] = {
                $gte: new Date(searchDate.setHours(0, 0, 0)),
                $lt: new Date(searchDate.setHours(23, 59, 59))
            };
        }

        const movies = await Movie.find(query);
        res.json({
            success: true,
            data: movies
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get single movie
// @route   GET /api/movies/:id
// @access  Public
export const getMovieById = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (movie) {
            res.json({
                success: true,
                data: movie
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Movie not found'
            });
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get movie showtimes by city
// @route   GET /api/movies/showtimes/:city
// @access  Public
export const getShowtimesByCity = async (req, res) => {
    try {
        const { city } = req.params;
        const { date } = req.query;

        let query = {
            isActive: true,
            'showtimes.city': city
        };

        if (date) {
            const searchDate = new Date(date);
            query['showtimes.date'] = {
                $gte: new Date(searchDate.setHours(0, 0, 0)),
                $lt: new Date(searchDate.setHours(23, 59, 59))
            };
        }

        const movies = await Movie.find(query);
        
        res.json({
            success: true,
            data: movies
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Update movie seats
// @route   PUT /api/movies/:id/seats
// @access  Private
export const updateMovieSeats = async (req, res) => {
    try {
        const { showtimeId, seats } = req.body;
        
        const movie = await Movie.findById(req.params.id);
        if (!movie) {
            return res.status(404).json({
                success: false,
                message: 'Movie not found'
            });
        }

        const showtime = movie.showtimes.id(showtimeId);
        if (!showtime) {
            return res.status(404).json({
                success: false,
                message: 'Showtime not found'
            });
        }

        // Update seats
        seats.forEach(seat => {
            const { row, number } = seat;
            const rowIndex = row.charCodeAt(0) - 65; // Convert A-H to 0-7
            const colIndex = number - 1; // Convert 1-8 to 0-7
            showtime.availableSeats[rowIndex][colIndex] = false;
        });

        await movie.save();

        res.json({
            success: true,
            message: 'Seats updated successfully'
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Create new movie
// @route   POST /api/movies
// @access  Private/Admin
export const createMovie = async (req, res) => {
    try {
        const {
            title,
            description,
            genre,
            duration,
            releaseDate,
            posterUrl,
            trailerUrl,
            rating,
            showtimes,
            isActive
        } = req.body;

        const movie = await Movie.create({
            title,
            description,
            genre,
            duration,
            releaseDate,
            posterUrl,
            trailerUrl,
            rating,
            showtimes: showtimes.map(st => ({
                ...st,
                availableSeats: Array(8).fill().map(() => Array(8).fill(true))
            })),
            isActive: isActive !== undefined ? isActive : true
        });

        res.status(201).json({
            success: true,
            data: movie
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Update movie details
// @route   PUT /api/movies/:id
// @access  Private/Admin
export const updateMovie = async (req, res) => {
    try {
        const {
            title,
            description,
            genre,
            duration,
            releaseDate,
            posterUrl,
            trailerUrl,
            rating,
            showtimes,
            isActive
        } = req.body;

        const movie = await Movie.findById(req.params.id);

        if (!movie) {
            return res.status(404).json({
                success: false,
                message: 'Movie not found'
            });
        }

        // Update fields if provided
        if (title) movie.title = title;
        if (description) movie.description = description;
        if (genre) movie.genre = genre;
        if (duration) movie.duration = duration;
        if (releaseDate) movie.releaseDate = releaseDate;
        if (posterUrl) movie.posterUrl = posterUrl;
        if (trailerUrl) movie.trailerUrl = trailerUrl;
        if (rating) movie.rating = rating;
        if (showtimes) {
            // Preserve existing seat arrangements for existing showtimes
            const updatedShowtimes = showtimes.map(newSt => {
                const existingShowtime = movie.showtimes.find(
                    oldSt => oldSt.city === newSt.city && 
                            oldSt.theater === newSt.theater && 
                            oldSt.time === newSt.time
                );
                return {
                    ...newSt,
                    availableSeats: existingShowtime ? 
                        existingShowtime.availableSeats : 
                        Array(8).fill().map(() => Array(8).fill(true))
                };
            });
            movie.showtimes = updatedShowtimes;
        }
        if (isActive !== undefined) movie.isActive = isActive;

        const updatedMovie = await movie.save();

        res.json({
            success: true,
            data: updatedMovie
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Delete movie
// @route   DELETE /api/movies/:id
// @access  Private/Admin
export const deleteMovie = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);

        if (!movie) {
            return res.status(404).json({
                success: false,
                message: 'Movie not found'
            });
        }

        // Soft delete by setting isActive to false
        movie.isActive = false;
        await movie.save();

        // Alternatively, for hard delete:
        // await movie.remove();

        res.json({
            success: true,
            message: 'Movie deleted successfully'
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}; 