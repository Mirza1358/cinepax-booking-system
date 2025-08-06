import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const Footer = ({ page }) => {
  if (page === 'events') {
    return (
      <footer className="container">
        <p>© 2025 The Arena</p>
      </footer>
    );
  }

  if (page === 'membership') {
    return (
      <footer className="container">
        <p>© 2025 The Arena. All Rights Reserved.</p>
      </footer>
    );
  }

  if (page === 'foodanddrinks') {
    return (
      <footer>
        <div className="container d-flex flex-column flex-md-row justify-content-between gap-4">
          <div>
            <h3>SMS Alert for Showtimes</h3>
            <p>Please enter your mobile number for SMS alerts in the text box.</p>
          </div>
          <div>
            <h3>Get in Touch</h3>
            <p>You are always welcome to contact us.</p>
          </div>
          <div>
            <h3>Arena Everywhere</h3>
            <p>Download our mobile app today to get Show-times & tickets on the go!</p>
            <div className="app-links d-flex">
              <img src="" alt="Download on Google Play" />
              <img src="" alt="Download on App Store" />
            </div>
          </div>
        </div>
      </footer>
    );
  }

  if (page === 'aboutus') {
    return (
      <footer>
        <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
          <div>
            <h4>Get in Touch</h4>
            <p>You are always welcome to contact us.</p>
            <div className="socials d-flex">
              <a href="#">Facebook</a>
              <a href="#">Twitter</a>
              <a href="#">Instagram</a>
              <a href="#">Youtube</a>
            </div>
          </div>
          <div>
            <h4>Arena Everywhere</h4>
            <p>Download our mobile app today to get show-times & tickets on the go!</p>
            <div className="app-links d-flex">
              <img src="" alt="Download on Google Play" />
              <img src="" alt="Download on App Store" />
            </div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="footer">
      <div className="container d-flex justify-content-center flex-wrap">
        <Link to="/aboutus">ABOUT US</Link>
        <Link to="/foodanddrinks">FOOD AND DRINKS</Link>
        <Link to="/membership">MEMBERSHIP</Link>
        <Link to="/events">EVENTS</Link>
      </div>
    </footer>
  );
};

export default Footer;