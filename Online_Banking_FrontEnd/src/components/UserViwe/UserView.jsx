import React, { useState } from 'react';
import './UserView.css';
import TransactionHistory from '../TransactionHistory/TransactionHistory';
import MyAccount from '../MyAccount/MyAccount';
import BankTransfer from '../BankTransfer/BankTransfer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHistory, faMoneyBillTransfer, faFileDownload } from '@fortawesome/free-solid-svg-icons';

const UserView = () => {
  const [activeSection, setActiveSection] = useState('myAccount');
  const userName = "John Doe"; // Replace with actual user name from state or props

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
          <span className="user-name">{userName}</span>
        </div>
        <div className="notifications">
          <i className="bi bi-bell-fill"></i>
          <span className="badge bg-danger">3</span>
        </div>
      </div>

      {/* Content container with sidebar and main content */}
      <div className="content-container">
        <Sidebar setActiveSection={setActiveSection} activeSection={activeSection} />
        <MainContent activeSection={activeSection} />
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
function MainContent({ activeSection }) {
  return (
    <div className="main-content">
      {activeSection === 'myAccount' && <MyAccount />}
      {activeSection === 'transactions' && <TransactionHistory />}
      {activeSection === 'transfer' && <BankTransfer />}
      {activeSection === 'downloadStatements' && <DownloadStatements />}
    </div>
  );
}

export default UserView;
