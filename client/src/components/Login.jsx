import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './styles.css';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const bookingData = location.state;

  console.log('Received booking data:', bookingData); // Debug log

  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  // Validate booking data
  if (!bookingData || !bookingData.movieId || !bookingData.showtime || !bookingData.selectedCity) {
    return (
      <div className="seat-selection-container text-center">
        <div className="alert alert-danger">
          <h4>Invalid Booking Session</h4>
          <p>Please start your booking by selecting a movie and showtime first.</p>
        </div>
        <button className="btn btn-primary mt-3" onClick={() => navigate('/')}>
          Return to Home
        </button>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      alert('Please fill in all fields');
      return;
    }

    // Navigate to seat selection with all required data
    navigate(`/seat-selection?movie=${bookingData.movieId}`, {
      state: {
        movieId: bookingData.movieId,
        movieTitle: bookingData.movieTitle,
        showtime: {
          time: bookingData.showtime.time,
          theater: bookingData.selectedCity
        },
        customerInfo: formData
      }
    });
  };

  return (
    <div className="login-container">
      <div className="booking-info mb-4">
        <h2>Booking Information</h2>
        <p><strong>Movie:</strong> {bookingData.movieTitle}</p>
        <p><strong>Theater:</strong> {bookingData.selectedCity}</p>
        <p><strong>Time:</strong> {bookingData.showtime.time}</p>
      </div>

      <form onSubmit={handleSubmit} className="login-form">
        <h3>Enter Your Details</h3>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            className="form-control"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Continue to Seat Selection
        </button>
      </form>
    </div>
  );
};

export default Login; 