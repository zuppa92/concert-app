import React from 'react';
import '../styles/Home.css'; // Import the CSS file for styling

const Homepage = () => {
  return (
    <div className="home-container">
      <h1>Welcome to the Concert App</h1>
      <img src="/homepage-image.png" alt="Concert" className="homepage-image" />
      <p>Explore your favorite artists, albums, and concerts!</p>
    </div>
  );
};

export default Homepage;