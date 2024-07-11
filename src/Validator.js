import React, { useEffect, useState, useCallback } from 'react';
import './TopValidators.css';

function TopValidators() {
  const [validators, setValidators] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [validatorInfo, setValidatorInfo] = useState(null);
  const [validatorAttestations, setValidatorAttestations] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [searchedValidator, setSearchedValidator] = useState(null);

  const fetchValidators = useCallback(() => {
    setLoading(true);
    setError(null);
    fetch(`https://beaconcha.in/api/v1/validator/leaderboard`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 'OK') {
          setValidators(data.data.slice(0, 100)); // To fetch top 100 validators
        } else {
          setError('Failed to fetch validators');
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching validators:', error);
        setError('Error fetching validators');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchValidators();
  }, [fetchValidators]);

  const handleNextPage = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(prevPage => prevPage - 1);
    }
  };

  const handleValidatorClick = (validator) => {
    fetch(`https://beaconcha.in/api/v1/validator/${validator.validatorindex}`)
      .then(response => response.json())
      .then(data => {
        setValidatorInfo(data.data);
        return fetch(`https://beaconcha.in/api/v1/validator/${validator.validatorindex}/attestations`);
      })
      .then(response => response.json())
      .then(data => {
        setValidatorAttestations(data.data);
        setShowPopup(true);
      })
      .catch(error => {
        console.error('Error fetching validator details:', error);
      });
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setValidatorInfo(null);
    setValidatorAttestations([]);
  };

  const handleOutsideClick = (e) => {
    if (e.target.classList.contains('popup')) {
      handleClosePopup();
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) { // Only allow numeric input
      setSearchInput(value);
      if (value === '') {
        setSearchedValidator(null); // Reset searched validator if input is empty
        setError(null);
      }
    }
  };

  const handleSearch = () => {
    const indexOrRank = parseInt(searchInput, 10);
    if (isNaN(indexOrRank) || indexOrRank > 100 || indexOrRank < 1) {
      setError('Please enter a valid index or rank number (1-100)');
      return;
    }
    const validator = validators.find(
      (v, idx) => v.validatorindex === indexOrRank || idx + 1 === indexOrRank
    );
    if (validator) {
      setSearchedValidator(validator);
      setError(null);
    } else {
      setSearchedValidator(null);
      setError('Validator not found');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleClearClick = () => {
    setSearchInput('');
    setSearchedValidator(null);
    setError(null);
    fetchValidators();
  };

  return (
    <div>
      <h2>Top Validators</h2>
      <div className="search-bar">
        <input
          type="text"
          value={searchInput}
          onChange={handleSearchChange}
          onKeyPress={handleKeyPress}
          placeholder="Enter index or rank number"
        />
        <button onClick={handleSearch}>Search</button>
        <button onClick={handleClearClick}>Clear</button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Validator Index</th>
                <th>Balance</th>
                <th>Performance 1d</th>
                <th>Performance 7d</th>
                <th>Performance 31d</th>
                <th>Performance 365d</th>
                <th>Performance Total</th>
              </tr>
            </thead>
            <tbody>
              {searchedValidator ? (
                <tr key={searchedValidator.validatorindex}>
                  <td>{validators.findIndex(v => v === searchedValidator) + 1}</td>
                  <td>
                    <button onClick={() => handleValidatorClick(searchedValidator)}>
                      {searchedValidator.validatorindex}
                    </button>
                  </td>
                  <td>{searchedValidator.balance}</td>
                  <td>{searchedValidator.performance1d}</td>
                  <td>{searchedValidator.performance7d}</td>
                  <td>{searchedValidator.performance31d}</td>
                  <td>{searchedValidator.performance365d}</td>
                  <td>{searchedValidator.performancetotal}</td>
                </tr>
              ) : (
                validators.slice((page - 1) * 10, page * 10).map((validator, index) => (
                  <tr key={validator.validatorindex}>
                    <td>{(page - 1) * 10 + index + 1}</td>
                    <td>
                      <button onClick={() => handleValidatorClick(validator)}>
                        {validator.validatorindex}
                      </button>
                    </td>
                    <td>{validator.balance}</td>
                    <td>{validator.performance1d}</td>
                    <td>{validator.performance7d}</td>
                    <td>{validator.performance31d}</td>
                    <td>{validator.performance365d}</td>
                    <td>{validator.performancetotal}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <div>
            <div className="btn-container">
              <button className="btn-content" onClick={handlePreviousPage} disabled={page === 1}>
                <span className="icon-arrow">←</span> Previous
              </button>
              <button className="btn-content" onClick={handleNextPage} disabled={page * 10 >= validators.length}>
                Next <span className="icon-arrow">→</span>
              </button>
            </div>
          </div>
        </>
      )}
      {showPopup && (
        <div className="popup" onClick={handleOutsideClick}>
          <div className="popup-content">
            <button className="close-button" onClick={handleClosePopup}>×</button>
            <div className="validator-details">
              {validatorInfo && (
                <div className="validator-info">
                  <h2>Validator Info</h2>
                  <p><strong>Activation Eligibility Epoch:</strong> {validatorInfo.activationeligibilityepoch}</p>
                  <p><strong>Activation Epoch:</strong> {validatorInfo.activationepoch}</p>
                  <p><strong>Balance:</strong> {validatorInfo.balance}</p>
                  <p><strong>Effective Balance:</strong> {validatorInfo.effectivebalance}</p>
                  <p><strong>Exit Epoch:</strong> {validatorInfo.exitepoch}</p>
                  <p><strong>Last Attestation Slot:</strong> {validatorInfo.lastattestationslot}</p>
                  <p><strong>Name:</strong> {validatorInfo.name}</p>
                  <p><strong>Public Key:</strong> {validatorInfo.pubkey}</p>
                  <p><strong>Slashed:</strong> {validatorInfo.slashed ? 'Yes' : 'No'}</p>
                  <p><strong>Status:</strong> {validatorInfo.status}</p>
                  <p><strong>Validator Index:</strong> {validatorInfo.validatorindex}</p>
                  <p><strong>Withdrawable Epoch:</strong> {validatorInfo.withdrawableepoch}</p>
                  <p><strong>Withdrawal Credentials:</strong> {validatorInfo.withdrawalcredentials}</p>
                  <p><strong>Total Withdrawals:</strong> {validatorInfo.total_withdrawals}</p>
                </div>
              )}
              {validatorAttestations.length > 0 && (
                <div className="validator-attestations">
                  <h2>Attestations</h2>
                  <table>
                    <thead>
                      <tr>
                        <th>No.</th>
                        <th>Attester Slot</th>
                        <th>Committee Index</th>
                        <th>Epoch</th>
                        <th>Inclusion Slot</th>
                        <th>Status</th>
                        <th>Week</th>
                        <th>Week Start</th>
                        <th>Week End</th>
                      </tr>
                    </thead>
                    <tbody>
                      {validatorAttestations.map((attestation, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{attestation.attesterslot}</td>
                          <td>{attestation.committeeindex}</td>
                          <td>{attestation.epoch}</td>
                          <td>{attestation.inclusionslot}</td>
                          <td>{attestation.status}</td>
                          <td>{attestation.week}</td>
                          <td>{attestation.week_start}</td>
                          <td>{attestation.week_end}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TopValidators;
