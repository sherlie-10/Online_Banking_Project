import React, { useState } from 'react';
import './TransactionHistory.css'; // Ensure this file exists

const TransactionHistory = () => {
    const [accountType] = useState('Salaried Savings Account'); // Example account type
    const [transactions] = useState([
        {
            id: 'TXN001',
            date: '2023-09-01',
            type: 'Debit',
            amount: 25075.75, // Amount in INR
            merchant: 'Amazon',
            paymentMethod: 'Credit Card',
            status: 'Completed',
            description: 'Purchase of electronics',
        },
        {
            id: 'TXN002',
            date: '2023-08-28',
            type: 'Credit',
            amount: 50000.00, // Amount in INR
            merchant: 'PayPal Transfer',
            paymentMethod: 'Bank Transfer',
            status: 'Completed',
            description: 'Salary deposit for August',
        },
        {
            id: 'TXN003',
            date: '2023-08-25',
            type: 'Debit',
            amount: 1200.00, // Amount in INR
            merchant: 'Netflix',
            paymentMethod: 'Debit Card',
            status: 'Completed',
            description: 'Monthly subscription',
        },
        {
            id: 'TXN004',
            date: '2023-08-20',
            type: 'Debit',
            amount: 755.50, // Amount in INR
            merchant: 'Uber',
            paymentMethod: 'PayPal',
            status: 'Completed',
            description: 'Ride to work',
        },
        {
            id: 'TXN005',
            date: '2023-07-15',
            type: 'Debit',
            amount: 1500.00, // Amount in INR
            merchant: 'Zomato',
            paymentMethod: 'Debit Card',
            status: 'Completed',
            description: 'Food delivery',
        },
        {
            id: 'TXN006',
            date: '2023-07-10',
            type: 'Credit',
            amount: 25000.00, // Amount in INR
            merchant: 'XYZ Corp',
            paymentMethod: 'Direct Deposit',
            status: 'Completed',
            description: 'Monthly salary',
        },
        {
            id: 'TXN007',
            date: '2023-06-30',
            type: 'Debit',
            amount: 500.00, // Amount in INR
            merchant: 'Recharge',
            paymentMethod: 'Mobile Wallet',
            status: 'Completed',
            description: 'Mobile recharge',
        },
        {
            id: 'TXN008',
            date: '2023-06-25',
            type: 'Debit',
            amount: 2000.00, // Amount in INR
            merchant: 'Electricity Department',
            paymentMethod: 'Bank Transfer',
            status: 'Completed',
            description: 'Electricity bill payment',
        },
        {
            id: 'TXN009',
            date: '2023-06-20',
            type: 'Debit',
            amount: 1500.00, // Amount in INR
            merchant: 'Flipkart',
            paymentMethod: 'Credit Card',
            status: 'Completed',
            description: 'Purchase of clothes',
        },
        {
            id: 'TXN010',
            date: '2023-06-15',
            type: 'Credit',
            amount: 3000.00, // Amount in INR
            merchant: 'Interest Earned',
            paymentMethod: 'Bank Account',
            status: 'Completed',
            description: 'Interest credited to savings account',
        },
    ]);

    return (
        <div className="transaction-history">
            <h2>Transaction History</h2>
            <h3>Account Type: {accountType}</h3> {/* Display Account Type */}
            <table className="transaction-table">
                <thead>
                    <tr>
                        <th>Transaction ID</th>
                        <th>Date</th>
                        <th>Type</th>
                        <th>Amount (INR)</th> {/* Updated Column Title */}
                        <th>Merchant</th>
                        <th>Payment Method</th>
                        <th>Status</th>
                        <th>Description</th> {/* New Column for Description */}
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction) => (
                        <tr key={transaction.id}>
                            <td>{transaction.id}</td>
                            <td>{transaction.date}</td>
                            <td>{transaction.type}</td>
                            <td>₹{transaction.amount.toFixed(2)}</td> {/* Amount formatted with INR symbol */}
                            <td>{transaction.merchant}</td>
                            <td>{transaction.paymentMethod}</td>
                            <td>{transaction.status}</td>
                            <td>{transaction.description}</td> {/* New Data for Description */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionHistory;
