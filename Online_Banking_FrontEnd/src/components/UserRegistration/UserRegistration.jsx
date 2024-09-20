import React, { useState } from 'react';
import './userRegistration.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';



const UserRegistration = () => {
  const [formData, setFormData] = useState({
    password: '',
    email: '',
    firstName: '',
    lastName: '',
    mobileNumber: '',
    aadharNumber: '',
    panNumber: '',
    gender: '',
    dateOfBirth: '',
    city: '',
    state: '',
    pincode: '',
    address: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:9090/api/register', formData);

      // Assuming backend returns a success message or user ID
      console.log('Response:', response.data);
      alert('Registration successful! Your customer ID has been sent to your email.');

      // Redirect to login after successful registration
      navigate('/login');
    } catch (error) {
      console.error('There was an error during registration:', error.response || error.message);
      alert('Registration failed. Please check the information and try again.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle password visibility
  };

  return (
    <div className="registration-container">
      <form className="registration-form" onSubmit={handleSubmit}>
        <center><h2 style={{ fontWeight: 'bold' }}>Register</h2></center>

        <div className="input-group side-by-side">
          <div className="input-group half-width">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter your first name"
              required
            />
          </div>

          <div className="input-group half-width">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter your last name"
              required
            />
          </div>
        </div>

        <div className="input-group">
          <label>Password</label>
          <div className="password-container">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              className="password-toggle"
              onClick={togglePasswordVisibility}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </div>
        </div>

        <div className="input-group">
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email address"
            required
          />
        </div>

        <div className="input-group side-by-side">
          <div className="input-group half-width">
            <label>Mobile Number</label>
            <input
              type="text"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              placeholder="Enter your mobile number"
              required
            />
          </div>

          <div className="input-group half-width">
            <label>Aadhar Number</label>
            <input
              type="text"
              name="aadharNumber"
              value={formData.aadharNumber}
              onChange={handleChange}
              placeholder="Enter your Aadhar number"
              required
            />
          </div>
        </div>

        <div className="input-group side-by-side">
          <div className="input-group half-width">
            <label>PAN Number</label>
            <input
              type="text"
              name="panNumber"
              value={formData.panNumber}
              onChange={handleChange}
              placeholder="Enter your PAN number"
              required
            />
          </div>

          <div className="input-group half-width">
            <label>Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="input-group side-by-side">
          <div className="input-group half-width">
            <label>Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group half-width">
            <label>City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Enter your city"
              required
            />
          </div>
        </div>

        <div className="input-group side-by-side">
          <div className="input-group half-width">
            <label>State</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="Enter your state"
              required
            />
          </div>

          <div className="input-group half-width">
            <label>Pincode</label>
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              placeholder="Enter your pincode"
              required
            />
          </div>
        </div>

        <div className="input-group">
          <label>Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter your address"
            required
          />
        </div>

        <button type="submit" className="btn-primary">
          Register
        </button>
      </form>
    </div>
  );
};

export default UserRegistration;
