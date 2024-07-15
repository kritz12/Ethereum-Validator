import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selected, setSelected] = useState(location.pathname);

  useEffect(() => {
    setSelected(location.pathname);
  }, [location.pathname]);

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
