import React, { useEffect, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import { useSelector } from 'react-redux';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './MyAccount'; // Import your CSS for styling

const AccountDetails = ({ accountType }) => {
  const [accountData, setAccountData] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionsPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const token = useSelector((state) => state['Online Banking Appln'].result);

  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        const response = await axios.get('http://localhost:9090/api/user/my-accounts', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const account = response.data.find((acc) => acc.accountType === accountType);
        if (account) {
          setAccountData(account);
          await fetchTransactions(account.accountNumber);
        } else {
          setError('No account found for the specified type.');
        }
      } catch (error) {
        setError('Error fetching account details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    const fetchTransactions = async (accountNumber) => {
      try {
        const response = await axios.get(`http://localhost:9090/api/user/transactions/userAccountTypeTransaction?accountType=${accountType}&page=${currentPage}&size=${transactionsPerPage}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTransactions(response.data);
      } catch (error) {
        setError('Error fetching transactions. Please try again later.');
      }
    };

    fetchAccountData();
  }, [accountType, token, currentPage]);

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text('Transaction Report', 20, 20);

    // Define the columns for the PDF table
    const columns = [
      { header: 'Transaction ID', dataKey: 'id' },
      { header: 'Amount', dataKey: 'amount' },
      { header: 'Date', dataKey: 'transactionDate' },
      { header: 'Type', dataKey: 'transactionType' },
      { header: 'Status', dataKey: 'status' },
      { header: 'Message', dataKey: 'message' },
    ];

    // Prepare the data for the table
    const data = transactions.map(transaction => ({
      id: transaction.id,
      amount: transaction.transactionType === 'WITHDRAWAL' ? `- $${Math.abs(transaction.amount)}` : `$${transaction.amount}`,
      transactionDate: new Date(transaction.transactionDate).toLocaleDateString(),
      transactionType: transaction.transactionType,
      status: transaction.status,
      message: transaction.message,
    }));

    // Create the table in the PDF
    doc.autoTable({
      head: [columns],
      body: data,
      startY: 30,
    });

    // Save the PDF
    doc.save('transaction_report.pdf');
  };

  if (loading) return <p>Loading account details...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="account-details">
      <h3>{accountType}</h3>
      {accountData ? (
        <>
          <ul className="list-group mb-4">
            <li className="list-group-item"><strong>Account Number:</strong> {accountData.accountNumber}</li>
            <li className="list-group-item"><strong>Balance:</strong> {accountData.balance} <i className="fa fa-rupee" style={{ fontSize: '15px', color: 'blue' }}></i></li>
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
                    <td>{new Date(transaction.transactionDate).toLocaleDateString()}</td>
                    <td>{transaction.message}</td>
                    <td style={{ color: transaction.transactionType === 'WITHDRAWAL' ? 'red' : 'green' }}>
                      {transaction.transactionType === 'WITHDRAWAL' ? `-$${Math.abs(transaction.amount)}` : `$${transaction.amount}`}
                    </td>
                    <td>
                      {transaction.transactionType === 'DEPOSIT' ? (
                        <i className="fa fa-money-bill-alt" style={{ color: 'green' }}></i>
                      ) : (
                        <i className="fa fa-history" style={{ color: 'orange' }}></i>
                      )}
                      {transaction.transactionType}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No transactions available</td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="d-flex justify-content-between">
            <Button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Previous</Button>
            <Button onClick={() => setCurrentPage(currentPage + 1)}>Next</Button>
          </div>

          {/* Modal for downloading PDF */}
          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Download PDF</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formStartDate">
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="formEndDate">
                  <Form.Label>End Date</Form.Label>
                  <Form.Control type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
              <Button variant="primary" onClick={downloadPDF}>Download</Button>
            </Modal.Footer>
          </Modal>
        </>
      ) : (
        <p>No account details available.</p>
      )}
    </div>
  );
};

export default AccountDetails;
