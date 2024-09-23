import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const CreateAccountForm = () => {
  const [accountType, setAccountType] = useState('');
  const [balance, setBalance] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Get the JWT token from Redux (from login state)
  const token = useSelector((state) => state['Online Banking Appln'].result);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!accountType || !balance) {
      setErrorMessage('Please fill out all fields.');
      return;
    }

    const accountData = {
      accountType: accountType.toUpperCase(), // Ensure the type matches your API's expected format
      balance: parseFloat(balance), // Ensure balance is a number
    };

    try {
      const response = await axios.post(
        'http://localhost:9090/api/user/createAcc',
        accountData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include JWT token in the Authorization header
            'Content-Type': 'application/json',
          },
        }
      );
      
      setSuccessMessage(`Account created successfully: ${response.data}`);
      setErrorMessage('');

        // Clear form fields after successful account creation
        setAccountType('');
        setBalance('');
    } catch (error) {
      console.error('Error creating account:', error);
      setErrorMessage('Failed to create account. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="create-account-form">
      <h3>Create a New Account</h3>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="accountType" className="form-label">Account Type</label>
          <select
            id="accountType"
            className="form-select"
            value={accountType}
            onChange={(e) => setAccountType(e.target.value)}
          >
            <option value="">Choose account type</option>
            <option value="SAVING_ACCOUNT">Savings</option>
            <option value="CURRENT_ACCOUNT">Current</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="balance" className="form-label">Deposit Amount</label>
          <input
            type="number"
            id="balance"
            className="form-control"
            value={balance}
            onChange={(e) => setBalance(e.target.value)}
            placeholder="Enter initial deposit"
          />
        </div>

        <button type="submit" className="btn btn-success">Create Account</button>
      </form>
    </div>
  );
};

export default CreateAccountForm;
