import React, { useState } from 'react';
import './BankTransfer.css'; // Ensure this file exists

const BankTransfer = () => {
    const [formData, setFormData] = useState({
        accountNumber: '',
        ifscCode: '',
        amount: '',
        description: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add logic for handling the transfer (e.g., API call)
        alert(`Transfer of ₹${formData.amount} to account ${formData.accountNumber} initiated!`);
        setFormData({ accountNumber: '', ifscCode: '', amount: '', description: '' }); // Reset form
    };

    return (
        <div className="bank-transfer">
            <h2>Bank Transfer</h2>
            <form onSubmit={handleSubmit} className="transfer-form">
                <div className="form-group">
                    <label htmlFor="accountNumber">Account Number</label>
                    <input
                        type="text"
                        id="accountNumber"
                        name="accountNumber"
                        value={formData.accountNumber}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="ifscCode">IFSC Code</label>
                    <input
                        type="text"
                        id="ifscCode"
                        name="ifscCode"
                        value={formData.ifscCode}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="amount">Amount (INR)</label>
                    <input
                        type="number"
                        id="amount"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="3"
                        placeholder="Optional"
                    />
                </div>
                <button type="submit" className="transfer-button">Transfer Funds</button>
            </form>
            <div className="transfer-info">
                <h3>Transfer Guidelines</h3>
                <ul>
                    <li>Ensure the account number and IFSC code are correct.</li>
                    <li>Minimum transfer amount is ₹100.</li>
                    <li>All transfers are processed instantly.</li>
                    <li>In case of issues, contact customer support.</li>
                </ul>
            </div>
        </div>
    );
};

export default BankTransfer;
