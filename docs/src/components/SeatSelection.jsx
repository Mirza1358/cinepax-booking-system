import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './styles.css';

const SeatSelection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { customerInfo, movieTitle, movieId, showtime } = location.state || {};
  
  // Debug logging
  console.log('Location state:', location.state);
  
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [error, setError] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);
  
  useEffect(() => {
    // Validate required data
    if (!movieId || !location.state || !showtime || !customerInfo) {
      setError('Missing required booking information. Please start from the movie selection page.');
      return;
    }
  }, [movieId, location.state, showtime, customerInfo]);

  const handleSeatClick = (row, col) => {
    const seatId = `${row}-${col}`;
    setSelectedSeats(prev => {
      if (prev.includes(seatId)) {
        return prev.filter(id => id !== seatId);
      }
      return [...prev, seatId];
    });
  };

  const handleConfirmBooking = async () => {
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat');
      return;
    }

    try {
      const bookingData = {
        movieId,
        movieTitle,
        customerInfo,
        showtime,
        selectedSeats,
      };

      console.log('Sending booking request with data:', bookingData);

      const response = await fetch('http://localhost:5050/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      console.log('Received response:', {
        status: response.status,
        statusText: response.statusText
      });

      const result = await response.json();
      console.log('Response data:', result);

      if (!response.ok) {
        throw new Error(result.message || 'Failed to create booking');
      }

      if (result.success && result.data) {
        console.log('Booking successful, setting details:', result.data);
        setBookingDetails(result.data);
        setShowConfirmation(true);
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Booking error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
      setError(error.message || 'Failed to complete booking. Please try again.');
      // Clear error after 5 seconds
      setTimeout(() => setError(''), 5000);
    }
  };

  if (showConfirmation && bookingDetails) {
    return (
      <div className="confirmation-modal">
        <div className="confirmation-content">
          <div className="success-banner">
            <h2>🎉 CONGRATULATIONS! 🎉</h2>
            <h3>YOUR BOOKING IS CONFIRMED!</h3>
          </div>
          
          <div className="booking-details">
            <h4>Booking Details</h4>
            <p><strong>Movie:</strong> {bookingDetails.movieTitle}</p>
            <p><strong>Theater:</strong> {bookingDetails.showtime.theater}</p>
            <p><strong>Time:</strong> {bookingDetails.showtime.time}</p>
            <p><strong>Seats:</strong> {bookingDetails.seats.join(', ')}</p>
            <p><strong>Total Amount:</strong> Rs. {bookingDetails.totalAmount}</p>
            <p><strong>Booking ID:</strong> {bookingDetails.bookingId}</p>
          </div>

          <button className="btn btn-primary" onClick={() => navigate('/')}>
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="seat-selection-container">
        <div className="alert alert-danger">
          <h4>Booking Error</h4>
          <p>{error}</p>
        </div>
        <div className="booking-info">
          <p><strong>Movie:</strong> {movieTitle}</p>
          <p><strong>Theater:</strong> {showtime?.theater}</p>
          <p><strong>Time:</strong> {showtime?.time}</p>
        </div>
        
        <div className="screen">SCREEN</div>
        
        <div className="seats-container">
          {Array(8).fill().map((_, row) => (
            <div key={row} className="seat-row">
              {Array(8).fill().map((_, col) => {
                const seatId = `${row}-${col}`;
                return (
                  <div
                    key={col}
                    className={`seat ${selectedSeats.includes(seatId) ? 'selected' : ''}`}
                    onClick={() => handleSeatClick(row, col)}
                  >
                    {row * 8 + col + 1}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <div className="booking-summary">
          <p>Selected Seats: {selectedSeats.length}</p>
          <p>Total Price: Rs. {selectedSeats.length * 1000}</p>
          <button 
            className="btn btn-primary"
            onClick={handleConfirmBooking}
            disabled={selectedSeats.length === 0}
          >
            Try Booking Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="seat-selection-container">
      <h2>Select Your Seats</h2>
      <div className="booking-info">
        <p><strong>Movie:</strong> {movieTitle}</p>
        <p><strong>Theater:</strong> {showtime?.theater}</p>
        <p><strong>Time:</strong> {showtime?.time}</p>
      </div>
      
      <div className="screen">SCREEN</div>
      
      <div className="seats-container">
        {Array(8).fill().map((_, row) => (
          <div key={row} className="seat-row">
            {Array(8).fill().map((_, col) => {
              const seatId = `${row}-${col}`;
              return (
                <div
                  key={col}
                  className={`seat ${selectedSeats.includes(seatId) ? 'selected' : ''}`}
                  onClick={() => handleSeatClick(row, col)}
                >
                  {row * 8 + col + 1}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div className="booking-summary">
        <p>Selected Seats: {selectedSeats.length}</p>
        <p>Total Price: Rs. {selectedSeats.length * 1000}</p>
        <button 
          className="btn btn-primary"
          onClick={handleConfirmBooking}
          disabled={selectedSeats.length === 0}
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
};

export default SeatSelection; 