import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

// Utility function to get correct image path for GitHub Pages
const getImagePath = (imageName) => {
  return `/cinepax-booking-system/images/${imageName}`;
};

const Navbar = () => {
  return (
    <header>
      <div className="container d-flex align-items-center">
        <div className="logo-container">
          <img src={getImagePath('image1.jpg')} alt="The Arena Logo" />
        </div>
        <nav className="ms-auto">
          <ul className="d-flex flex-wrap justify-content-center">
            <li><Link to="/">HOME</Link></li>
            <li><Link to="/about">ABOUT US</Link></li>
            <li><Link to="/food-and-drinks">FOOD AND DRINKS</Link></li>
            <li><Link to="/membership">MEMBERSHIP</Link></li>
            <li><Link to="/events">EVENTS</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;