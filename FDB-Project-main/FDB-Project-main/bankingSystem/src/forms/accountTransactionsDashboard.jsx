import React, { useState, useEffect } from 'react';

const TransactionTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTransaction, setEditedTransaction] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch transactions data
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch('http://localhost:5001/accountTransactionsAll');
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
        setErrorMessage('An error occurred while fetching transactions.');
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
        `http://localhost:5001/accountTransactions/${editedTransaction.Transaction_ID}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editedTransaction),
        }
      );

      if (response.ok) {
        setSuccessMessage('Transaction updated successfully!');
        setIsEditing(false);
        const updatedTransactions = transactions.map((transaction) =>
          transaction.Transaction_ID === editedTransaction.Transaction_ID
            ? editedTransaction
            : transaction
        );
        setTransactions(updatedTransactions);
      } else {
        setErrorMessage('Failed to update transaction.');
      }
    } catch (error) {
      setErrorMessage('An error occurred while updating transaction.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Account Transactions</h1>
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      <table className="min-w-full bg-white border border-gray-300 rounded-lg">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Transaction ID</th>
            <th className="px-4 py-2 border">Account ID</th>
            <th className="px-4 py-2 border">Transaction Date</th>
            <th className="px-4 py-2 border">Amount</th>
            <th className="px-4 py-2 border">Transaction Type ID</th>
            <th className="px-4 py-2 border">Description</th>
            <th className="px-4 py-2 border">Status</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.Transaction_ID}>
              <td className="px-4 py-2 border">{transaction.Transaction_ID}</td>
              <td className="px-4 py-2 border">{transaction.Account_ID}</td>
              <td className="px-4 py-2 border">{transaction.Transaction_Date}</td>
              {/* Editable Amount */}
              <td className="px-4 py-2 border">
                {isEditing && editedTransaction.Transaction_ID === transaction.Transaction_ID ? (
                  <input
                    type="number"
                    step="0.01"
                    value={editedTransaction.Amount}
                    onChange={(e) => handleEditChange(e, transaction.Transaction_ID, 'Amount')}
                    className="w-full px-2 py-1 border rounded"
                  />
                ) : (
                  transaction.Amount
                )}
              </td>
              {/* Editable Transaction Type ID */}
              <td className="px-4 py-2 border">
                {isEditing && editedTransaction.Transaction_ID === transaction.Transaction_ID ? (
                  <input
                    type="number"
                    value={editedTransaction.Transaction_Type_ID}
                    onChange={(e) =>
                      handleEditChange(e, transaction.Transaction_ID, 'Transaction_Type_ID')
                    }
                    className="w-full px-2 py-1 border rounded"
                  />
                ) : (
                  transaction.Transaction_Type_ID
                )}
              </td>
              {/* Editable Description */}
              <td className="px-4 py-2 border">
                {isEditing && editedTransaction.Transaction_ID === transaction.Transaction_ID ? (
                  <textarea
                    value={editedTransaction.Description}
                    onChange={(e) => handleEditChange(e, transaction.Transaction_ID, 'Description')}
                    className="w-full px-2 py-1 border rounded"
                  />
                ) : (
                  transaction.Description
                )}
              </td>
              {/* Editable Status */}
              <td className="px-4 py-2 border">
                {isEditing && editedTransaction.Transaction_ID === transaction.Transaction_ID ? (
                  <select
                    value={editedTransaction.Status}
                    onChange={(e) => handleEditChange(e, transaction.Transaction_ID, 'Status')}
                    className="w-full px-2 py-1 border rounded"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                    <option value="Failed">Failed</option>
                  </select>
                ) : (
                  transaction.Status
                )}
              </td>
              <td className="px-4 py-2 border">
                {isEditing && editedTransaction.Transaction_ID === transaction.Transaction_ID ? (
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

export default TransactionTable;

