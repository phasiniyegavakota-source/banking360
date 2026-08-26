import React, { useState } from 'react';

const TransactionForm = () => {
  const [formData, setFormData] = useState({
    Account_ID: '',
    Transaction_Date: '',
    Amount: '',
    Transaction_Type_ID: '',
    Description: '',
    Status: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    // Format date to 'YYYY-MM-DD' before sending
    const formattedTransactionDate = new Date(formData.Transaction_Date).toISOString().split('T')[0];

    const dataToSend = {
      ...formData,
      Transaction_Date: formattedTransactionDate,
    };

    try {
      const response = await fetch('http://localhost:5001/accountTransactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        setSuccessMessage('Transaction added successfully!');
        setFormData({
          Account_ID: '',
          Transaction_Date: '',
          Amount: '',
          Transaction_Type_ID: '',
          Description: '',
          Status: '',
        });
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Failed to add transaction.');
      }
    } catch (error) {
      setErrorMessage('An error occurred while submitting the form.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Add New Transaction</h1>
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {/* Account ID */}
        <div className="mb-4">
          <label htmlFor="Account_ID" className="block text-gray-700 text-sm font-bold mb-2">Account ID</label>
          <input
            type="number"
            id="Account_ID"
            name="Account_ID"
            value={formData.Account_ID}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* Transaction Date */}
        <div className="mb-4">
          <label htmlFor="Transaction_Date" className="block text-gray-700 text-sm font-bold mb-2">Transaction Date</label>
          <input
            type="date"
            id="Transaction_Date"
            name="Transaction_Date"
            value={formData.Transaction_Date}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* Amount */}
        <div className="mb-4">
          <label htmlFor="Amount" className="block text-gray-700 text-sm font-bold mb-2">Amount</label>
          <input
            type="number"
            step="0.01"
            id="Amount"
            name="Amount"
            value={formData.Amount}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* Transaction Type ID */}
        <div className="mb-4">
          <label htmlFor="Transaction_Type_ID" className="block text-gray-700 text-sm font-bold mb-2">Transaction Type ID</label>
          <input
            type="number"
            id="Transaction_Type_ID"
            name="Transaction_Type_ID"
            value={formData.Transaction_Type_ID}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label htmlFor="Description" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
          <textarea
            id="Description"
            name="Description"
            value={formData.Description}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          ></textarea>
        </div>

        {/* Status Dropdown */}
        <div className="mb-4">
          <label htmlFor="Status" className="block text-gray-700 text-sm font-bold mb-2">Status</label>
          <select
            id="Status"
            name="Status"
            value={formData.Status}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select Status</option>
            <option value="Active">Completed</option>
            <option value="Inactive">InCompleted</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;
