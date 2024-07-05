import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [selected, setSelected] = useState('/');
  const navigate = useNavigate();

  const handleChange = (event) => {
    const value = event.target.value;
    setSelected(value);
    navigate(value); 
  };

  return (
    <div className="navbar">
      <div className="radio-inputs">
        <div className="radio">
          <input
            type="radio"
            id="welcome"
            value="/"
            checked={selected === '/'}
            onChange={handleChange}
          />
          <label className="name" htmlFor="welcome">Welcome</label>
        </div>
        <div className="radio">
          <input
            type="radio"
            id="validator"
            value="/validator"
            checked={selected === '/validator'}
            onChange={handleChange}
          />
          <label className="name" htmlFor="validator">Validator Search</label>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
