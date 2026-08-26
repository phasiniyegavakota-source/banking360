import React, { useState, useEffect } from 'react';

const ATMTransactionTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTransaction, setEditedTransaction] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch transactions data
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch('http://localhost:5001/atmTransactionsall');
        const data = await response.json();
        // Format Transaction_Date without the time zone
        const formattedData = data.map(transaction => ({
          ...transaction,
          Transaction_Date: transaction.Transaction_Date
            ? transaction.Transaction_Date.split('T')[0]
            : '',
        }));
        setTransactions(formattedData);
      } catch (error) {
        setErrorMessage('An error occurred while fetching ATM transactions.');
      }
    };

    fetchTransactions();
  }, []);

  // Handle inline edit change
  const handleEditChange = (e, transactionId, fieldName) => {
    const value = e.target.value;
    setEditedTransaction((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  // Toggle editing mode
  const handleEditClick = (transaction) => {
    setIsEditing(true);
    setEditedTransaction(transaction);
  };

  // Save edited transaction data
  const handleSave = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const response = await fetch(
        `http://localhost:5001/atmTransactions/${editedTransaction.ATM_Transaction_ID}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editedTransaction),
        }
      );

      if (response.ok) {
        setSuccessMessage('ATM transaction updated successfully!');
        setIsEditing(false);
        const updatedTransactions = transactions.map((transaction) =>
          transaction.ATM_Transaction_ID === editedTransaction.ATM_Transaction_ID
            ? editedTransaction
            : transaction
        );
        setTransactions(updatedTransactions);
      } else {
        setErrorMessage('Failed to update ATM transaction.');
      }
    } catch (error) {
      setErrorMessage('An error occurred while updating ATM transaction.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">ATM Transactions</h1>
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      <table className="min-w-full bg-white border border-gray-300 rounded-lg">
        <thead>
          <tr>
            <th className="px-4 py-2 border">ATM Transaction ID</th>
            <th className="px-4 py-2 border">ATM ID</th>
            <th className="px-4 py-2 border">User ID</th>
            <th className="px-4 py-2 border">Transaction Date</th>
            <th className="px-4 py-2 border">Amount</th>
            <th className="px-4 py-2 border">Transaction Type ID</th>
            <th className="px-4 py-2 border">Status</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.ATM_Transaction_ID}>
              <td className="px-4 py-2 border">{transaction.ATM_Transaction_ID}</td>
              <td className="px-4 py-2 border">{transaction.ATM_ID}</td>
              <td className="px-4 py-2 border">{transaction.User_ID}</td>
              <td className="px-4 py-2 border">{transaction.Transaction_Date}</td>
              {/* Editable Amount */}
              <td className="px-4 py-2 border">
                {isEditing && editedTransaction.ATM_Transaction_ID === transaction.ATM_Transaction_ID ? (
                  <input
                    type="number"
                    step="0.01"
                    value={editedTransaction.Amount}
                    onChange={(e) => handleEditChange(e, transaction.ATM_Transaction_ID, 'Amount')}
                    className="w-full px-2 py-1 border rounded"
                  />
                ) : (
                  transaction.Amount
                )}
              </td>
              {/* Editable Transaction Type ID */}
              <td className="px-4 py-2 border">
                {isEditing && editedTransaction.ATM_Transaction_ID === transaction.ATM_Transaction_ID ? (
                  <input
                    type="number"
                    value={editedTransaction.Transaction_Type_ID}
                    onChange={(e) =>
                      handleEditChange(e, transaction.ATM_Transaction_ID, 'Transaction_Type_ID')
                    }
                    className="w-full px-2 py-1 border rounded"
                  />
                ) : (
                  transaction.Transaction_Type_ID
                )}
              </td>
              {/* Editable Status */}
              <td className="px-4 py-2 border">
                {isEditing && editedTransaction.ATM_Transaction_ID === transaction.ATM_Transaction_ID ? (
                  <select
                    value={editedTransaction.Status}
                    onChange={(e) => handleEditChange(e, transaction.ATM_Transaction_ID, 'Status')}
                    className="w-full px-2 py-1 border rounded"
                  >
                    <option value="Success">Success</option>
                    <option value="Failed">Failed</option>
                    <option value="Pending">Pending</option>
                  </select>
                ) : (
                  transaction.Status
                )}
              </td>
              <td className="px-4 py-2 border">
                {isEditing && editedTransaction.ATM_Transaction_ID === transaction.ATM_Transaction_ID ? (
                  <button
                    onClick={handleSave}
                    className="bg-blue-500 text-white py-1 px-3 rounded"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEditClick(transaction)}
                    className="bg-yellow-500 text-white py-1 px-3 rounded"
                  >
                    Edit
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ATMTransactionTable;

