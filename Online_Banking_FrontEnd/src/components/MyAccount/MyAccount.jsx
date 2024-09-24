import React, { useState } from 'react';
import AccountDetails from './AccountDetails';
import CreateAccountForm from './CreateAccountForm';
import FixedDeposit from './FixedDeposit'; // Import FixedDeposit component
import './MyAccount.css'; // Custom styles

const MyAccount = () => {
  const [accountType, setAccountType] = useState(null); // Account type (savings, current, etc.)
  const [showCreateForm, setShowCreateForm] = useState(false); // Toggle between showing create form or account details

  const handleAccountClick = (type) => {
    setAccountType(type);
    setShowCreateForm(false); // Hide create form when selecting an account
  };

  const handleCreateAccountClick = () => {
    setShowCreateForm(true); // Show create account form
  };

  return (
    <div className="my-account-container">
      {/* Navbar-like row for selecting accounts */}
      <div className="account-nav d-flex justify-content-between align-items-center">
        <div className="account-options">
          {/* Use the correct account types based on what your backend is returning */}
          <button className="btn btn-light mx-2" onClick={() => handleAccountClick('SAVING_ACCOUNT')}>
            Savings Account
          </button>
          <button className="btn btn-light mx-2" onClick={() => handleAccountClick('CURRENT_ACCOUNT')}>
            Current Account
          </button>
          <button className="btn btn-light mx-2" onClick={() => handleAccountClick('FD')}>
            Fixed Deposit
          </button>
        </div>
        
        <button className="btn btn-primary" onClick={handleCreateAccountClick}>
          Create Account
        </button>
      </div>

      {/* Quote section */}
      <div className="quote-container">
        <h5 className="quote">"Your finances, your future – manage them with ease."</h5>
      </div>

      {/* Main content based on state */}
      <div className="main-content mt-4">
        {showCreateForm ? (
          <CreateAccountForm />
        ) : (
          accountType === 'FD' ? <FixedDeposit /> : <AccountDetails accountType={accountType} />
        )}
      </div>
    </div>
  );
};

export default MyAccount;
