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
      <div className="App">
        <Navbar />
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/home" element={<Home />} />
            <Route path="/validator" element={<Validator />} />
            <Route path="/validators/:id" element={<ValidatorDetails />} />
            <Route path="/top-validators" element={<TopValidators />} />
           
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
