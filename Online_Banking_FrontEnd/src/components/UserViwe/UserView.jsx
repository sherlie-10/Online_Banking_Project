import React, { useState, useEffect } from 'react';
import './UserView.css';
import TransactionHistory from '../TransactionHistory/TransactionHistory';
import MyAccount from '../MyAccount/MyAccount';
import BankTransfer from '../BankTransfer/BankTransfer';
import UserPersonalDetails from '../MyAccount/UserPersonalDetails';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHistory, faMoneyBillTransfer, faFileDownload, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'; // Import axios for API calls
import { useSelector } from 'react-redux'; // Import useSelector to access the Redux store

const UserView = () => {
  const [activeSection, setActiveSection] = useState('myAccount'); // Set the initial active section to myAccount
  const [userData, setUserData] = useState(null);
  const token = useSelector((state) => state['Online Banking Appln'].result); // Get the JWT token from Redux

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:9090/api/user/me', {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the headers
          },
        });
        setUserData(response.data); // Set the user data in state
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [token]); // Fetch data whenever the token changes

  return (
    <div className="app-container">
      {/* Top bar with user info */}
      <div className="top-bar">
        <div className="user-info">
          <img
            src="https://via.placeholder.com/40"
            alt="User Profile"
            className="user-avatar"
          />
          <span className="user-name">{userData ? `${userData.firstName} ${userData.lastName}` : 'Loading...'}</span> {/* Display user name */}
        </div>
        <div className="notifications">
          <i className="bi bi-bell-fill"></i>
          <span className="badge bg-danger">3</span>
        </div>
      </div>

      {/* Content container with sidebar and main content */}
      <div className="content-container">
        <Sidebar setActiveSection={setActiveSection} activeSection={activeSection} />
        <MainContent activeSection={activeSection} userData={userData} />
      </div>
    </div>
  );
};

// Sidebar component
function Sidebar({ setActiveSection, activeSection }) {
  return (
    <div className="sidebar">
      <ul className="list-group">
        <li
          className={`list-group-item ${activeSection === 'personalDetails' ? 'active' : ''}`}
          onClick={() => setActiveSection('personalDetails')}
        >
          <FontAwesomeIcon icon={faInfoCircle} className="sidebar-icon" /> Personal Details
        </li>
        <li
          className={`list-group-item ${activeSection === 'myAccount' ? 'active' : ''}`}
          onClick={() => setActiveSection('myAccount')}
        >
          <FontAwesomeIcon icon={faUser} className="sidebar-icon" /> My Account
        </li>
        <li
          className={`list-group-item ${activeSection === 'transactions' ? 'active' : ''}`}
          onClick={() => setActiveSection('transactions')}
        >
          <FontAwesomeIcon icon={faHistory} className="sidebar-icon" /> Transaction History
        </li>
        <li
          className={`list-group-item ${activeSection === 'transfer' ? 'active' : ''}`}
          onClick={() => setActiveSection('transfer')}
        >
          <FontAwesomeIcon icon={faMoneyBillTransfer} className="sidebar-icon" /> Money Transfer
        </li>
        <li
          className={`list-group-item ${activeSection === 'downloadStatements' ? 'active' : ''}`}
          onClick={() => setActiveSection('downloadStatements')}
        >
          <FontAwesomeIcon icon={faFileDownload} className="sidebar-icon" /> Download Statements
        </li>
      </ul>
    </div>
  );
}

// MainContent component to render content dynamically based on selected section
function MainContent({ activeSection, userData }) {
  return (
    <div className="main-content">
      {activeSection === 'personalDetails' && <UserPersonalDetails userData={userData} />}
      {activeSection === 'myAccount' && <MyAccount />}
      {activeSection === 'transactions' && <TransactionHistory />}
      {activeSection === 'transfer' && <BankTransfer />}
      {activeSection === 'downloadStatements' && <DownloadStatements />}
    </div>
  );
}

export default UserView;
