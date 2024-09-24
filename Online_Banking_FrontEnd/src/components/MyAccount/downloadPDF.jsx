import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Inside your AccountDetails component
const downloadPDF = () => {
  const doc = new jsPDF();
  doc.text('Transaction Report', 20, 20);

  // Define the columns and data for the table
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
