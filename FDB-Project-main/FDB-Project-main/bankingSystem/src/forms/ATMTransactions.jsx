import React, { useState } from 'react';

const ATMTransactionForm = () => {
  const [formData, setFormData] = useState({
    ATM_ID: '',
    User_ID: '',
    Transaction_Date: '',
    Amount: '',
    Transaction_Type_ID: '',
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

    try {
      const response = await fetch('http://localhost:5001/atmTransactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccessMessage('ATM transaction recorded successfully!');
        setFormData({
          ATM_ID: '',
          User_ID: '',
          Transaction_Date: '',
          Amount: '',
          Transaction_Type_ID: '',
          Status: '',
        });
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Failed to record ATM transaction.');
      }
    } catch (error) {
      setErrorMessage('An error occurred while submitting the form.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Record ATM Transaction</h1>
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {/* ATM ID */}
        <div className="mb-4">
          <label htmlFor="ATM_ID" className="block text-gray-700 text-sm font-bold mb-2">ATM ID</label>
          <input
            type="number"
            id="ATM_ID"
            name="ATM_ID"
            value={formData.ATM_ID}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* User ID */}
        <div className="mb-4">
          <label htmlFor="User_ID" className="block text-gray-700 text-sm font-bold mb-2">User ID</label>
          <input
            type="number"
            id="User_ID"
            name="User_ID"
            value={formData.User_ID}
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
            id="Amount"
            name="Amount"
            step="0.01"
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

        {/* Status */}
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
            <option value="Success">Success</option>
            <option value="Failed">Failed</option>
            <option value="Pending">Pending</option>
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

export default ATMTransactionForm;
