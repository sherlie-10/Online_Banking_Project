import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faPhone, faAddressCard, faBirthdayCake, faGenderless } from '@fortawesome/free-solid-svg-icons';
import './UserPersonalDetails.css';

const UserPersonalDetails = () => {
  const [userData, setUserData] = useState(null);
  const token = useSelector((state) => state['Online Banking Appln'].result);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:9090/api/user/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data);
        console.log(response)
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [token]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="personal-details-container">
      <h2>Personal Details</h2>
      <div className="details-card">
        <div className="detail-item">
          <FontAwesomeIcon icon={faUser} className="detail-icon" />
          <strong>First Name:</strong> {userData.firstName}
        </div>
        <div className="detail-item">
          <FontAwesomeIcon icon={faUser} className="detail-icon" />
          <strong>Last Name:</strong> {userData.lastName}
        </div>
        <div className="detail-item">
          <FontAwesomeIcon icon={faEnvelope} className="detail-icon" />
          <strong>Email:</strong> {userData.email}
        </div>
        <div className="detail-item">
          <FontAwesomeIcon icon={faPhone} className="detail-icon" />
          <strong>Mobile Number:</strong> {userData.mobileNumber}
        </div>
        <div className="detail-item">
          <FontAwesomeIcon icon={faAddressCard} className="detail-icon" />
          <strong>Aadhar Number:</strong> {userData.aadharNumber}
        </div>
        <div className="detail-item">
          <FontAwesomeIcon icon={faAddressCard} className="detail-icon" />
          <strong>Address:</strong> {userData.address}, {userData.city}, {userData.state} - {userData.pincode}
        </div>
        <div className="detail-item">
          <FontAwesomeIcon icon={faBirthdayCake} className="detail-icon" />
          <strong>Date of Birth:</strong> {userData.dateOfBirth}
        </div>
        <div className="detail-item">
          <FontAwesomeIcon icon={faGenderless} className="detail-icon" />
          <strong>Gender:</strong> {userData.gender}
        </div>
      </div>
    </div>
  );
};

export default UserPersonalDetails;
