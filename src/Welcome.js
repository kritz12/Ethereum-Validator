import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Welcome.css'; 


function Welcome() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/Home');
  };

  return (
    <div className="Welcome">
      <h1>Ethereum Validator Tracker</h1>
      <p>This application tracks Ethereum validators using beaconcha.in API.</p>
      <button className="cssbuttons-io-button" onClick={handleStart}>
        Get Started
        <div className="icon">
          <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5m14 0-4 4m4-4-4-4"/>
          </svg>
        </div>
      </button>
    </div>
  );
}

export default Welcome;
