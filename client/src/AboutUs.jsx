import React from 'react';
import './components/styles.css';
import './components/aboutUsStyles.css';

// Utility function to get correct image path for GitHub Pages
const getImagePath = (imageName) => {
  return `/cinepax-booking-system/images/${imageName}`;
};

const AboutUs = () => {
  return (
    <div>

      <div className="banner">
      </div>

      <div className="content container">
        <div className="theater-images">
          <div>
            <img src={getImagePath('image15.jpg')} alt="The Arena Islamabad" />
            <h2>The Arena Islamabad</h2>
            <p>The Arena cinemas are equipped with Barco DP4K projector...</p>
          </div>
          <div>
            <img src={getImagePath('image16.jpg')} alt="The Arena Lahore" />
            <h2>The Arena Lahore</h2>
            <p>Our concession area contains a variety of delicious items to choose from...</p>
          </div>
          <div>
            <img src={getImagePath('image17.jpg')} alt="The Arena Karachi" />
            <h2>The Arena Karachi</h2>
            <p>Now enjoy the greatest food, drink and movie, all in one place.</p>
          </div>
        </div>

        <div className="sms-alert">
          <h2>SMS Alert for Showtimes</h2>
          <p>Please enter your mobile number for SMS alert in the text box.</p>
          <div className="d-flex flex-wrap gap-2">
            <input type="text" placeholder="03XX XXXXXXX" />
            <button className="btn">Subscribe</button>
            <button className="btn">Unsubscribe</button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AboutUs;