import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom'; // Import useNavigate for navigation
import apiCall from '../../apiCall/apiCall';
import './login.css';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate hook
  const { isLoading, error, token } = useSelector((state) => state['Online Banking Appln']);

  const [customerId, setCustomerId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false); // State to toggle password visibility

  const handleLogin = (e) => {
    e.preventDefault();

    if (!customerId || !password) {
      setErrorMessage('Please fill out all fields.');
      return;
    }

    dispatch(apiCall({ username: customerId, password }))
      .unwrap() // Waits for the promise to resolve
      .then((token) => {
        console.log('Login successful');
        setErrorMessage('');
        // Store the token in localStorage or cookies
        localStorage.setItem('token', token);
        navigate('/UserView');
      })
      .catch((err) => {
        console.error('Login failed', err);
        setErrorMessage('Login failed. Please try again.');
      });
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <div className="input-group">
          <label>CustomerID</label>
          <input
            type="number"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            placeholder="Enter your customer ID"
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <div className="password-input">
            <input
              type={passwordVisible ? 'text' : 'password'} // Toggle input type based on state
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
            <span 
              className="toggle-password" 
              onClick={() => setPasswordVisible(!passwordVisible)} // Toggle password visibility
              role="button" 
              tabIndex={0} 
              onKeyDown={(e) => e.key === 'Enter' && setPasswordVisible(!passwordVisible)} // Accessibility
              aria-label={passwordVisible ? 'Hide password' : 'Show password'}
            >
              {passwordVisible ? '🙈' : '👁️'} {/* Eye icon to toggle visibility */}
            </span>
          </div>
        </div>

        <button type="submit" className="btn-primary" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>

        <p className="forgot-password">
          <Link to="/forgot-password">Forgot Password?</Link>
        </p>

        <p className="signup-link">
          Don't have an account? <Link to="/UserRegistration">Signup here</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
