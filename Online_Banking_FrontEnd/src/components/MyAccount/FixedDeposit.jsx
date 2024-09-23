import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { FaFileAlt, FaInfoCircle, FaPlus, FaRupeeSign, FaCalendarAlt } from 'react-icons/fa';
import './FixedDeposit.css';

const FixedDeposit = () => {
  const [fixedDeposits, setFixedDeposits] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showPolicy, setShowPolicy] = useState(false);
  const [formData, setFormData] = useState({
    depositAmount: '',
    tenure: 'ONE_YEAR',
  });
  const [selectedFD, setSelectedFD] = useState(null);
  const token = useSelector((state) => state['Online Banking Appln'].result);

  useEffect(() => {
    fetchAllFixedDeposits();
  }, []);

  const fetchAllFixedDeposits = async () => {
    try {
      const response = await axios.get('http://localhost:9090/api/user/fixed-deposit/all', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFixedDeposits(response.data);
    } catch (error) {
      console.error('Error fetching fixed deposits:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:9090/api/user/fixed-deposit/create', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchAllFixedDeposits();
      setShowCreateForm(false);
    } catch (error) {
      console.error('Error creating fixed deposit:', error);
    }
  };

  const handleFDClick = (fd) => {
    setSelectedFD(fd);
  };

  return (
    <div className="fixed-deposit-container">
      <h2>Fixed Deposits</h2>

      {/* Buttons for All FDs, Create FD, and FD Policy */}
      <div className="d-flex mb-3">
  <button
    className="btn btn-primary me-2"
    onClick={() => {
      setShowCreateForm(false);
      setShowPolicy(false);
      setSelectedFD(null);
    }}
  >
    All FDs
  </button>
  <button
    className="btn btn-success me-2"
    onClick={() => {
      setShowCreateForm(true);
      setShowPolicy(false);
      setSelectedFD(null);
    }}
  >
    <FaPlus className="me-2" /> Create FD
  </button>
  <button
    className="btn btn-info"
    onClick={() => {
      setShowPolicy(true);
      setShowCreateForm(false);
      setSelectedFD(null);
    }}
  >
    <FaFileAlt className="me-2" /> FD Policy
  </button>
</div>


      {/* Show Create FD Form */}
      {showCreateForm && (
        <form onSubmit={handleFormSubmit} className="fd-form mb-4">
          <h4>Create a Fixed Deposit</h4>
          <div className="form-group">
            <label htmlFor="depositAmount">
              <FaRupeeSign className="me-2" /> Deposit Amount
            </label>
            <input
              type="number"
              name="depositAmount"
              id="depositAmount"
              value={formData.depositAmount}
              onChange={handleInputChange}
              required
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="tenure">
              <FaCalendarAlt className="me-2" /> Tenure
            </label>
            <select
              name="tenure"
              id="tenure"
              value={formData.tenure}
              onChange={handleInputChange}
              className="form-control"
              required
            >
              <option value="ONE_YEAR">1 Year</option>
              <option value="TWO_YEARS">2 Years</option>
              <option value="FIVE_YEARS">5 Years</option>
              <option value="TEN_YEARS">10 Years</option>
            </select>
          </div>
          <button type="submit" className="btn btn-success mt-3">
            <FaPlus className="me-2" /> Submit
          </button>
        </form>
      )}

      {/* Show FD Policy */}
      {showPolicy && (
        <div className="fd-policy">
          <h4>Fixed Deposit Policy</h4>
          {/* <p>Here you can display your FD policy details...</p> */}
          <ul>
            <li>1 Year: 5.0% interest rate</li>
            <li>2 Years: 5.5% interest rate</li>
            <li>5 Years: 6.0% interest rate</li>
            <li>10 Years: 6.5% interest rate</li>
          </ul>
        </div>
      )}

      {/* FD List (default view) */}
      {!showCreateForm && !showPolicy && (
        <div className="fd-list">
          <h4>All Fixed Deposits</h4>
          <ul className="list-group">
            {fixedDeposits.length > 0 ? (
              fixedDeposits.map((fd) => (
                <li
                  key={fd.id}
                  className="list-group-item d-flex justify-content-between align-items-center fd-item"
                  onClick={() => handleFDClick(fd)}
                  style={{ cursor: 'pointer' }}
                >
                  <span>
                    <FaRupeeSign /> ₹{fd.depositAmount.toFixed(2)} - {fd.tenure.replace('_', ' ')}
                  </span>
                  <FaInfoCircle className="text-primary" />
                </li>
              ))
            ) : (
              <li className="list-group-item">No fixed deposits available</li>
            )}
          </ul>
        </div>
      )}

      {/* FD Details */}
      {selectedFD && (
        <div className="fd-details mt-4">
          <h5>Fixed Deposit Details</h5>
          <p><strong>Deposit Amount:</strong> ₹{selectedFD.depositAmount.toFixed(2)}</p>
          <p><strong>Tenure:</strong> {selectedFD.tenure.replace('_', ' ')}</p>
          <p><strong>Start Date:</strong> {new Date(selectedFD.startDate).toLocaleDateString()}</p>
          <p><strong>End Date:</strong> {new Date(selectedFD.endDate).toLocaleDateString()}</p>
          <p><strong>Status:</strong> {selectedFD.status}</p>
          <p><strong>Interest Rate:</strong> {selectedFD.interestRate}%</p>
        </div>
      )}
    </div>
  );
};

export default FixedDeposit;
