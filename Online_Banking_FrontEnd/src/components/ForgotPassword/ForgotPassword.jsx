import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './forgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleForgotPassword = async (e) => {
    e.preventDefault();  // Prevent form submission
    try {
      const response = await axios.post('http://localhost:9090/api/forgot-password', { email });
      setMessage('Password reset link has been sent to your email. You can now go to the reset page.');
    } catch (error) {
      setMessage('Error: Unable to send reset email. Please check the email and try again.');
    }
  };

  return (
    <div className="forgot-password-container">
      <form className="forgot-password-form" onSubmit={handleForgotPassword}>
        <h2>Forgot Password</h2>
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

        {message && (
          <p>
            {message} 
           
          </p>
        )}

        <p className="back-to-login">
          <a href="/login">Back to Login</a>
        </p>
      </form>
    </div>
  );
};

export default ForgotPassword;
