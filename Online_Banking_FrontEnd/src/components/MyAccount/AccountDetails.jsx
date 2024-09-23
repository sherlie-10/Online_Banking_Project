import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useSelector } from 'react-redux';

const AccountDetails = ({ accountType }) => {
  const [accountData, setAccountData] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = useSelector((state) => state['Online Banking Appln'].result);
  
  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        const response = await axios.get('http://localhost:9090/api/user/my-accounts', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(response.data); // Log the entire response data

        // Filter for the specific account type
        const account = response.data.find((acc) => acc.accountType === accountType);
        console.log('Requested account type:', accountType); // Log requested account type
        console.log('Filtered account:', account); // Log the filtered account

        if (account) {
          setAccountData(account);
          // You might need to set transactions here if they come separately
          // setTransactions(account.transactions || []); // Assuming transactions exist
        } else {
          setError('No account found for the specified type.');
        }
        setLoading(false);
      } catch (error) {
        setError('Error fetching account details. Please try again later.');
        setLoading(false);
      }
    };

    fetchAccountData();
  }, [accountType, token]);

  if (loading) {
    return <p>Loading account details...</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <div className="account-details">
      <h3>{accountType}</h3>
      {accountData ? (
        <>
          <ul className="list-group mb-4">
            <li className="list-group-item"><strong>Account Number:</strong> {accountData.accountNumber}</li>
            <li className="list-group-item"><strong>Balance:</strong> {accountData.balance}</li>
            <li className="list-group-item"><strong>Status:</strong> {accountData.accountStatus}</li>
            <li className="list-group-item"><strong>Created Date:</strong> {new Date(accountData.createdDate).toLocaleDateString()}</li>
          </ul>

          <div className="d-flex justify-content-between align-items-center">
            <h4>Transaction History</h4>
            <Button variant="primary" onClick={() => setShowModal(true)}>Download Statement</Button>
          </div>

          <table className="table table-striped mt-2">
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length > 0 ? (
                transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td>{transaction.date}</td>
                    <td>{transaction.description}</td>
                    <td>{transaction.amount < 0 ? `-$${Math.abs(transaction.amount)}` : `$${transaction.amount}`}</td>
                    <td>{transaction.type}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No transactions available</td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      ) : (
        <p>No account details available.</p>
      )}
    </div>
  );
};

export default AccountDetails;
