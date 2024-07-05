import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ValidatorDetails() {
  const { id } = useParams();
  const [validatorInfo, setValidatorInfo] = useState(null);

  useEffect(() => {
    const fetchValidatorDetails = async () => {
      try {           
        const response = await fetch(`https://beaconcha.in/api/v1/validator/${id}`);
        const data = await response.json();
        setValidatorInfo(data.data);
      } catch (error) {
        console.error('Error fetching validator details:', error);
      }
    };

    fetchValidatorDetails();
  }, [id]);

  return (
    <div>
      <h1>Validator Details</h1>
      {validatorInfo ? (
        <div>
          <p><strong>Activation Eligibility Epoch:</strong> {validatorInfo.activation_eligibility_epoch}</p>
            <p><strong>Activation Epoch:</strong> {validatorInfo.activation_epoch}</p>
            <p><strong>Balance:</strong> {validatorInfo.balance}</p>
            <p><strong>Effective Balance:</strong> {validatorInfo.effective_balance}</p>
            <p><strong>Exit Epoch:</strong> {validatorInfo.exit_epoch}</p>
            <p><strong>Last Attestation Slot:</strong> {validatorInfo.last_attestation_slot}</p>
            <p><strong>Name:</strong> {validatorInfo.name}</p>
            <p><strong>Public Key:</strong> {validatorInfo.pubkey}</p>
            <p><strong>Slashed:</strong> {validatorInfo.slashed ? 'Yes' : 'No'}</p>
            <p><strong>Status:</strong> {validatorInfo.status}</p>
            <p><strong>Validator Index:</strong> {validatorInfo.validator_index}</p>
            <p><strong>Withdrawable Epoch:</strong> {validatorInfo.withdrawable_epoch}</p>
            <p><strong>Withdrawal Credentials:</strong> {validatorInfo.withdrawal_credentials}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ValidatorDetails;
