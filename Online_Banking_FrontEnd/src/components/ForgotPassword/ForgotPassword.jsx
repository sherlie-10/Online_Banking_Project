import React, { useState } from 'react';
import './forgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate success
    if (email) {
      setSuccessMessage('A password reset link has been sent to your email.');
      setErrorMessage('');
    } else {
      setErrorMessage('Please enter your email address.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="forgot-password-container">
      <form className="forgot-password-form" onSubmit={handleSubmit}>
        <h2>Forgot Password</h2>

        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <div className="input-group">
          <label>Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
          />
        </div>

        <button type="submit" className="btn-primary">
          Send Reset Link
        </button>

        <p className="back-to-login">
          <a href="/login">Back to Login</a>
        </p>
      </form>
    </div>
  );
};

export default ForgotPassword;
