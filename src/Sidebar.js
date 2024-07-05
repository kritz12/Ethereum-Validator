import React from 'react';
import logo from './logo.svg';
import './Sidebar.css';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="Sidebar">
      <div className="Sidebar-logo">
        <img src={logo} alt="logo" />
      </div>
      <button className="Sidebar-button">
        <Link to="/top-validators">Top Validators</Link>
      </button>
      <div className="Sidebar-logos">
        <a href="https://github.com/kritz12" target="_blank" rel="noopener noreferrer">
          <img src="/github.png" alt="GitHub" />
        </a>
        <a href="https://www.linkedin.com/in/krithik-guhan-535a1b249/" target="_blank" rel="noopener noreferrer">
          <img src="/Linkedin.png" alt="LinkedIn" />
        </a>
      </div>
    </div>
  );
}

export default Sidebar;
