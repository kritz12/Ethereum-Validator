import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Welcome from './Welcome';
import Home from './Home';
import Validator from './Validator';
import ValidatorDetails from './ValidatorDetails';
import TopValidators from './TopValidators';

function App() {
  return (
    <Router>
      <div id="root">
        <Sidebar />
        <div className="main-content">
          <div className="background-image"></div>
          <div className="blur-overlay"></div>
          <div className="content-container">
            <Navbar />
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/home" element={<Home />} />
              <Route path="/validator" element={<Validator />} />
              <Route path="/validators/:id" element={<ValidatorDetails />} />
              <Route path="/top-validators" element={<TopValidators />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
