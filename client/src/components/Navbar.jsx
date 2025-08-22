import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const Navbar = () => {
  return (
    <header>
      <div className="container d-flex align-items-center">
        <div className="logo-container">
          <img src="images/image1.jpg" alt="The Arena Logo" />
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