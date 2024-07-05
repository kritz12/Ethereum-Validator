import React from 'react';
import './Home.css'; 

function Home() {
  return (
    <div className="home-container">
      <div className="image-container">
        <img src="ethereum.png" alt="Your Name" className="profile-image" />
      </div>
      <div className="details-container">
        <h1>Welcome to My Project</h1>
        <p>This React-based web app tracks Ethereum validators using
           data from the beaconcha.in API. It includes a Navbar for easy 
          navigation to the welcome message and validator search.
          The Sidebar lists the top 10 validators with links to their detailed stats.
          Users can input a validator ID or pubkey to view specific validator details,
         such as statistics and attestations. The app aims for user-friendly
         navigation and clear presentation of Ethereum validator information.</p>
      </div>
    </div>
  );
}

export default Home;
