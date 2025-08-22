import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/footer.jsx';
import AboutUs from './AboutUs.jsx';
import FoodAndDrinks from './FoodAndDrinks.jsx';
import Membership from './Membership.jsx';
import Events from './Events.jsx';
import CitySelector from './components/CitySelector.jsx';
import Login from './components/Login.jsx';
import SeatSelection from './components/SeatSelection.jsx';
import './components/styles.css';

// Utility function to get correct image path for GitHub Pages
const getImagePath = (imageName) => {
  return `/cinepax-booking-system/images/${imageName}`;
};

const Home = () => {
  const [isCitySelectorOpen, setIsCitySelectorOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleBookTicket = (movie) => (event) => {
    event.preventDefault();
    
    // Validate movie data before opening city selector
    if (!movie || !movie.id || !movie.title || !movie.showtimes) {
      console.error('Invalid movie data:', movie);
      alert('Unable to process booking. Please try again.');
      return;
    }

    // Log the movie data being set
    console.log('Setting selected movie:', movie);
    
    setSelectedMovie(movie);
    setIsCitySelectorOpen(true);
  };

  // Movie data with proper structure
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
        'Arena Islamabad': { time: '04:00 PM' },
        'Arena Lahore': { time: '08:00 PM' },
        'Arena Karachi': { time: '02:00 PM' }
      }
    },
    {
      id: '4',
      title: 'Carry On Jatta 3',
      format: '2D',
      language: 'Punjabi',
      imagePath: 'carry-on-jatta-3.jpg',
      showtimes: {
        'Arena Islamabad': { time: '03:45 PM' }
      }
    },
    {
      id: '5',
      title: 'A Minecraft Movie',
      format: '2D',
      language: 'English',
      imagePath: 'a-minecraft-movie.jpeg',
      showtimes: {
        'Arena Islamabad': { time: '12:00 PM' },
        'Arena Lahore': { time: '02:15 PM' }
      }
    },
    {
      id: '6',
      title: 'A Minecraft Movie',
      format: '3D',
      language: 'English',
      imagePath: 'a-minecraft-movie (1).jpeg',
      showtimes: {
        'Arena Islamabad': { time: '06:15 PM' },
        'Arena Karachi': { time: '11:15 AM' }
      }
    }
  ];

  return (
    <div>
      <CitySelector 
        isOpen={isCitySelectorOpen} 
        onClose={() => setIsCitySelectorOpen(false)}
        movie={selectedMovie}
      />
      
      <header className="container text-center">
        <h1>Now Showing</h1>
        <div className="theater-buttons d-flex justify-content-center flex-wrap">
          <button className="red">All Theaters</button>
          <button className="black">Wed Apr 02</button>
          <button className="black">All Movies</button>
        </div>
      </header>

      <section className="now-showing container">
        <div className="movie-slider">
          <div className="movie-slides">
            {/* First Set of Movies */}
            <div className="movie-slide-group">
              {movies.slice(0, 3).map((movie) => (
                <div key={movie.id} className="movie-card">
                  <div className="movie-poster">
                    <img src={getImagePath(movie.imagePath)} alt={movie.title} />
                  </div>
                  <div className="movie-details">
                    <h2 className="movie-title">{movie.title} - {movie.format} {movie.language}</h2>
                    <div>
                      <span className="movie-format">DIGITAL {movie.format}</span>
                      <a href="#" className="book-ticket-btn" onClick={handleBookTicket(movie)}>
                        BOOK TICKET
                      </a>
                    </div>
                    <div className="movie-rating">
                      <span>8.8</span>
                      <img src={getImagePath('star_icon.png')} alt="Star Icon" />
                      <small>/10</small>
                    </div>
                    <div className="movie-date">🗓️ 19 Apr 2025</div>
                    <div className="movie-genre">Action/Drama</div>
                    <div className="showtimes">
                      {Object.entries(movie.showtimes).map(([city, { time }]) => (
                        <div key={city} className="showtime">
                          {city} <span>{time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Second Set of Movies */}
            <div className="movie-slide-group">
              {movies.slice(3).map((movie) => (
                <div key={movie.id} className="movie-card">
                  <div className="movie-poster">
                    <img src={getImagePath(movie.imagePath)} alt={movie.title} />
                  </div>
                  <div className="movie-details">
                    <h2 className="movie-title">{movie.title} - {movie.format} {movie.language}</h2>
                    <div>
                      <span className="movie-format">DIGITAL {movie.format}</span>
                      <a href="#" className="book-ticket-btn" onClick={handleBookTicket(movie)}>
                        BOOK TICKET
                      </a>
                    </div>
                    <div className="movie-rating">
                      <span>7.0</span>
                      <img src={getImagePath('star_icon.png')} alt="Star Icon" />
                      <small>/10</small>
                    </div>
                    <div className="movie-date">🗓️ 19 Apr 2025</div>
                    <div className="movie-genre">Adventure/Comedy</div>
                    <div className="showtimes">
                      {Object.entries(movie.showtimes).map(([city, { time }]) => (
                        <div key={city} className="showtime">
                          {city} <span>{time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="movie-container container">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-5">
          <div className="col movie">
            <img src={getImagePath('image3.jpg')} alt="Inception" />
            <a href="https://www.youtube.com/watch?v=XZlJfFF58Mo" target="_blank">
              <button className="trailer-btn">MATCH TRAILER</button>
            </a>
          </div>
          <div className="col movie">
            <img src={getImagePath('image2.jpg')} />
            <a href="https://www.youtube.com/watch?v=oz7wymKGzOU" target="_blank">
              <button className="trailer-btn">MATCH TRAILER</button>
            </a>
          </div>
          <div className="col movie">
            <img src={getImagePath('image4.jpg')} alt="Shawshank Redemption" />
            <a href="https://www.youtube.com/watch?v=NmzuHjWmXOc" target="_blank">
              <button className="trailer-btn">MATCH TRAILER</button>
            </a>
          </div>
          <div className="col movie">
            <img src={getImagePath('image5.jpg')} alt="Ford vs Ferrari" />
            <a href="https://www.youtube.com/watch?v=zyYgDtY2AMY" target="_blank">
              <button className="trailer-btn">MATCH TRAILER</button>
            </a>
          </div>
        </div>
      </div>

      <section className="upcoming-movies container">
        <h2>Upcoming Movies</h2>
        <div className="upcoming-movies-images row row-cols-0 row-cols-sm-2 row-cols-md-1">
          <div className="col">
            <img src={getImagePath('image6.png')} alt="Mission Impossible" />
          </div>
          <div className="col">
            <img src={getImagePath('image7.jpg')} alt="Snow White" />
          </div>
          <div className="col">
            <img src={getImagePath('image8.jpg')} alt="Superman" />
          </div>
          <div className="col">
            <img src={getImagePath('image9.jpg')} alt="Final Destination" />
          </div>
        </div>
      </section>

      <section className="highlights-events container">
        <h2>Highlights & Events</h2>
        <p>Smart App For Mobile: Pakistan's First exclusive Mobile App (Android) for Cinema has been launched.</p>
        <div className="highlights-events-images row row-cols-1 row-cols-sm-2 row-cols-md-1">
          <div className="col">
            <img src={getImagePath('image10.jpg')} alt="Chand Raat Bazaar" />
          </div>
          <div className="col">
            <img src={getImagePath('image11.jpg')} alt="Event 2" />
          </div>
          <div className="col">
            <img src={getImagePath('image12.jpeg')} alt="Event 3" />
          </div>
          <div className="col">
            <img src={getImagePath('image13.jpg')} alt="The Lion King" />
          </div>
        </div>
      </section>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/food-and-drinks" element={<FoodAndDrinks />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/events" element={<Events />} />
          <Route path="/login" element={<Login />} />
          <Route path="/seat-selection" element={<SeatSelection />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;