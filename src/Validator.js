import React, { useState, useEffect, useCallback } from 'react';
import './Validator.css';

function Validator() {
  const [validatorId, setValidatorId] = useState('');
  const [validatorInfo, setValidatorInfo] = useState(null);
  const [validatorAttestations, setValidatorAttestations] = useState([]);
  const [error, setError] = useState('');

  const isNumeric = (str) => /^\d+$/.test(str);
  const isValidPubKey = (str) => /^(0x)?[0-9a-fA-F]{96}$/.test(str);

  const handleSearch = useCallback(async () => {
    if (validatorId.trim() === '') {
      setError(' *Please input values to search.*');
      return;
    }

    if (!isNumeric(validatorId) && !isValidPubKey(validatorId)) {
      setError('*Input must be a valid Validator Index (numeric) or Public Key.*');
      return;
    }

    setError('');
    setValidatorInfo(null);
    setValidatorAttestations([]);

    try {
      const validatorInfoResponse = await fetch(`https://beaconcha.in/api/v1/validator/${validatorId}`);
      if (!validatorInfoResponse.ok) {
        throw new Error('Error fetching validator information');
      }
      const validatorInfoData = await validatorInfoResponse.json();
      setValidatorInfo(validatorInfoData.data);

      const validatorAttestationsResponse = await fetch(`https://beaconcha.in/api/v1/validator/${validatorId}/attestations`);
      if (!validatorAttestationsResponse.ok) {
        throw new Error('Error fetching validator attestations');
      }
      const validatorAttestationsData = await validatorAttestationsResponse.json();
      setValidatorAttestations(validatorAttestationsData.data.filter(attestation => attestation.status === 1));
    } catch (err) {
      setError(err.message);
    }
  }, [validatorId]);

  const handleInputChange = (e) => {
    setValidatorId(e.target.value);
    setValidatorInfo(null);
    setValidatorAttestations([]);
    setError('');
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.keyCode === 13) { // 13 is the Enter key code
        handleSearch();
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleSearch]);

  return (
    <div className="validator-container">
      <h1>Validator Search</h1>
      <p className="help-paragraph">
        This input field is used to fetch information about Ethereum Validator details.
       It only accepts numerical inputs for Validator Index or a valid Public Key
        The validator information is retrieved from the Beaconcha.in API.
      </p>
      <div className="search-bar">
        <input
          type="text"
          value={validatorId}
          onChange={handleInputChange}
          placeholder="Enter Validator ID or PubKey"
        />
        <button className="button" onClick={handleSearch}>Search</button>
      </div>
      
      {error && <p className="error-message">{error}</p>}
      <div className="validator-details">
        {validatorInfo && !error && (
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
        {validatorAttestations.length > 0 && !error && (
          <div className="validator-attestations">
            <h2>Attestations</h2>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>SL No</th>
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
          </div>
        )}
      </div>
    </div>
  );
}

export default Validator;
