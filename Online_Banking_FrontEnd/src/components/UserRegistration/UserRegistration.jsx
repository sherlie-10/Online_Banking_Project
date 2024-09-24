import React, { useState } from 'react';
import './userRegistration.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEye, faEyeSlash, faUser, faLock, faEnvelope, faPhone,
  faIdCard, faCalendar, faCity, faMapPin, faHome, faMale, faFemale
} from '@fortawesome/free-solid-svg-icons';

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
  const [errors, setErrors] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!formData.email.includes('@')) newErrors.email = 'Invalid email format';
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!/^\d{10}$/.test(formData.mobileNumber)) newErrors.mobileNumber = 'Mobile number must be 10 digits';
    // if (!/^\d{12}$/.test(formData.aadharNumber)) newErrors.aadharNumber = 'Aadhar must be 12 digits';
    // if (!/^[A-Z]{5}\d{4}[A-Z]{1}$/.test(formData.panNumber)) newErrors.panNumber = 'Invalid PAN format';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      const response = await axios.post('http://localhost:9090/api/register', formData);
      console.log('Response:', response.data);
      setShowSuccessModal(true);
      setTimeout(() => {
        setShowSuccessModal(false);
        navigate('/login');
      }, 3000);
    } catch (error) {
      console.error('There was an error during registration:', error.response || error.message);
      alert('Registration failed. Please check the information and try again.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
    navigate('/login'); // Navigate after closing the modal if desired
  };

  return (
    <div className="registration-container">
      {showSuccessModal && (
        <div className="success-modal">
          <p>Registration successful! Your customer ID has been sent to your email.</p>
          <button onClick={closeSuccessModal}>Close</button>
        </div>
      )}
      <form className="registration-form" onSubmit={handleSubmit}>
        <center><h2 style={{ fontWeight: 'bold' }}>Register</h2></center>

        <div className="input-group side-by-side">
          <div className="input-group half-width">
            <label><FontAwesomeIcon icon={faUser} /> First Name</label>
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
            <label><FontAwesomeIcon icon={faUser} /> Last Name</label>
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
          <label><FontAwesomeIcon icon={faLock} /> Password</label>
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
          {errors.password && <p className="error">{errors.password}</p>}
        </div>

        <div className="input-group">
          <label><FontAwesomeIcon icon={faEnvelope} /> Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email address"
            required
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div className="input-group side-by-side">
          <div className="input-group half-width">
            <label><FontAwesomeIcon icon={faPhone} /> Mobile Number</label>
            <input
              type="text"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              placeholder="Enter your mobile number"
              required
            />
            {errors.mobileNumber && <p className="error">{errors.mobileNumber}</p>}
          </div>

          <div className="input-group half-width">
            <label><FontAwesomeIcon icon={faIdCard} /> Aadhar Number</label>
            <input
              type="text"
              name="aadharNumber"
              value={formData.aadharNumber}
              onChange={handleChange}
              placeholder="Enter your Aadhar number"
              required
            />
            {errors.aadharNumber && <p className="error">{errors.aadharNumber}</p>}
          </div>
        </div>

        <div className="input-group side-by-side">
          <div className="input-group half-width">
            <label><FontAwesomeIcon icon={faIdCard} /> PAN Number</label>
            <input
              type="text"
              name="panNumber"
              value={formData.panNumber}
              onChange={handleChange}
              placeholder="Enter your PAN number"
              required
            />
            {errors.panNumber && <p className="error">{errors.panNumber}</p>}
          </div>

          <div className="input-group half-width">
            <label><FontAwesomeIcon icon={faMale} /> Gender</label>
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
            <label><FontAwesomeIcon icon={faCalendar} /> Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group half-width">
            <label><FontAwesomeIcon icon={faCity} /> City</label>
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
            <label><FontAwesomeIcon icon={faMapPin} /> State</label>
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
            <label><FontAwesomeIcon icon={faMapPin} /> Pincode</label>
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
          <label><FontAwesomeIcon icon={faHome} /> Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter your address"
            required
          />
        </div>

        <button type='submit' className="button-21" role="button">Register</button>
      </form>
    </div>
  );
};

export default UserRegistration;
