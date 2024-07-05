import React, { useState, useEffect } from 'react';
import './Validator.css'; 

function Validator() {
  const [validatorId, setValidatorId] = useState('');
  const [validatorInfo, setValidatorInfo] = useState(null);
  const [validatorAttestations, setValidatorAttestations] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async () => {
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
  });
  
  return (
    <div className="validator-container">
      <h1>Validator Search/Input Form</h1>
      <div className="search-bar">
        <input
          type="text"
          value={validatorId}
          onChange={(e) => setValidatorId(e.target.value)}
          placeholder="Enter Validator ID"
        />
        <button className="button" onClick={handleSearch}>Search</button>
      </div>
      {error && <p className="error-message">{error}</p>}
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
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>SL No</th> {/* Serial number column */}
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
                      <td>{index + 1}</td> {/* Serial number starts from 1 */}
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
