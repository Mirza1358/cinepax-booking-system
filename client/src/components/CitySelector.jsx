import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/styles.css';

const CitySelector = ({ isOpen, onClose, movie }) => {
  const navigate = useNavigate();

  const handleCitySelect = (city) => {
    // Validate movie and showtime data
    if (!movie || !movie.showtimes || !movie.showtimes[city]) {
      console.error('Invalid movie or showtime data:', { movie, city });
      alert('No show available in this city');
      return;
    }

    // Log the data being passed
    console.log('Navigating to login with data:', {
      selectedCity: city,
      movieId: movie.id,
      movieTitle: movie.title,
      showtime: {
        time: movie.showtimes[city].time,
        theater: city
      }
    });

    onClose();
    navigate('/login', { 
      state: { 
        selectedCity: city,
        movieId: movie.id,
        movieTitle: movie.title,
        showtime: {
          time: movie.showtimes[city].time,
          theater: city
        }
      } 
    });
  };

  if (!isOpen) return null;

  // Validate movie prop
  if (!movie || !movie.id || !movie.title || !movie.showtimes) {
    console.error('Invalid movie data:', movie);
    return (
      <div className="modal-overlay">
        <div className="modal-content city-selector">
          <button className="close-button" onClick={onClose}>×</button>
          <h2>Error</h2>
          <p>Unable to load movie information. Please try again.</p>
          <button className="btn btn-primary" onClick={onClose}>Close</button>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content city-selector">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>Select Your City</h2>
        <h3 className="movie-title mb-3">{movie.title}</h3>
        <div className="city-buttons">
          {['Arena Islamabad', 'Arena Lahore', 'Arena Karachi'].map((city) => (
            <button 
              key={city}
              className="city-button" 
              onClick={() => handleCitySelect(city)}
              disabled={!movie?.showtimes?.[city]}
            >
              {city}
              {movie?.showtimes?.[city] && (
                <span className="showtime-info">{movie.showtimes[city].time}</span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CitySelector; 