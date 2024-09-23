import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Modal from './Modal'; // Import the modal component
import './BankTransfer.css'; // Ensure you have relevant styles

const BankTransfer = () => {
    const [formData, setFormData] = useState({
        sourceAccountNumber: '',
        destinationAccountNumber: '',
        ifscCode: '',
        amount: '',
        description: '',
        transactionType: 'TRANSFER'
    });

    const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
    const [confirmMessage, setConfirmMessage] = useState(''); // State for the confirmation message

    const token = useSelector((state) => state['Online Banking Appln'].result);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Prepare confirmation message
        const message = `Are you sure you want to ${formData.transactionType.toLowerCase()} ₹${formData.amount} from account ${formData.sourceAccountNumber} to ${formData.transactionType === 'INTER_BANK' ? 'external account ' + formData.destinationAccountNumber : 'account ' + formData.destinationAccountNumber}?`;
        setConfirmMessage(message);
        setIsModalOpen(true); // Open the confirmation modal
    };

    const handleConfirm = async () => {
        // Construct the transaction request based on the selected transaction type
        const transactionRequest = {
            sourceAccountNumber: formData.sourceAccountNumber,
            amount: parseFloat(formData.amount),
            message: formData.description,
            isInterBank: formData.transactionType === 'INTER_BANK',
            transactionType: formData.transactionType,
        };

        if (['TRANSFER', 'INTER_BANK'].includes(formData.transactionType)) {
            transactionRequest.destinationAccountNumber = formData.destinationAccountNumber;
        }

        try {
            const response = await axios.post('http://localhost:9090/api/user/transactions/process', transactionRequest, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            alert(`Transaction of ₹${response.data.amount} successful!`);
            setFormData({
                sourceAccountNumber: '',
                destinationAccountNumber: '',
                ifscCode: '',
                amount: '',
                description: '',
                transactionType: 'TRANSFER'
            });
        } catch (error) {
            console.error('Error processing transaction:', error);
            alert('Transaction failed. Please check your details and try again.');
        }

        setIsModalOpen(false); // Close the modal after confirming
    };

    const handleCloseModal = () => {
        setIsModalOpen(false); // Close the modal without confirming
    };

    return (
        <div className="bank-transfer">
            <h2>Bank Transfer</h2>
            <form onSubmit={handleSubmit} className="transfer-form">
                <div className="form-group">
                    <label htmlFor="sourceAccountNumber">Source Account Number</label>
                    <input
                        type="text"
                        id="sourceAccountNumber"
                        name="sourceAccountNumber"
                        value={formData.sourceAccountNumber}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="transactionType">Transaction Type</label>
                    <select
                        id="transactionType"
                        name="transactionType"
                        value={formData.transactionType}
                        onChange={handleChange}
                        required
                    >
                        <option value="TRANSFER">Transfer</option>
                        <option value="DEPOSIT">Deposit</option>
                        <option value="WITHDRAWAL">Withdrawal</option>
                        <option value="INTER_BANK">Inter-Bank Transfer</option>
                    </select>
                </div>

                {formData.transactionType !== 'DEPOSIT' && formData.transactionType !== 'WITHDRAWAL' && (
                    <div className="form-group">
                        <label htmlFor="destinationAccountNumber">Destination Account Number</label>
                        <input
                            type="text"
                            id="destinationAccountNumber"
                            name="destinationAccountNumber"
                            value={formData.destinationAccountNumber}
                            onChange={handleChange}
                            required
                        />
                    </div>
                )}

                {formData.transactionType === 'INTER_BANK' && (
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
                )}

                <div className="form-group">
                    <label htmlFor="amount">Amount (INR)</label>
                    <input
                        type="number"
                        id="amount"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        required
                        min="1"
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
                <button type="submit" className="transfer-button">Submit Transaction</button>
            </form>

            {/* Modal for confirmation */}
            <Modal 
                isOpen={isModalOpen} 
                onClose={handleCloseModal} 
                onConfirm={handleConfirm} 
                message={confirmMessage} 
            />

            <div className="transfer-info">
                <h3>Transaction Guidelines</h3>
                <ul>
                    <li>Ensure the account numbers and IFSC code are correct.</li>
                    <li>Minimum transfer amount is ₹1.</li>
                    <li>All transactions are processed instantly.</li>
                    <li>If you encounter issues, please contact customer support.</li>
                </ul>
            </div>
        </div>
    );
};

export default BankTransfer;
