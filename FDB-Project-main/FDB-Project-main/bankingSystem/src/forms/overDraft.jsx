import React, { useState } from 'react';

const OverdraftForm = () => {
  const [formData, setFormData] = useState({
    Account_ID: '',
    limit: '',
    Start_Date: '',
    End_Date: '',
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
      const response = await fetch('http://localhost:5001/overdrafts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccessMessage('Overdraft added successfully!');
        setFormData({
          Account_ID: '',
          limit: '',
          Start_Date: '',
          End_Date: '',
          Status: '',
        });
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Failed to add overdraft.');
      }
    } catch (error) {
      setErrorMessage('An error occurred while submitting the form.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Add New Overdraft</h1>
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

        {/* Overdraft Limit */}
        <div className="mb-4">
          <label htmlFor="limit" className="block text-gray-700 text-sm font-bold mb-2">Overdraft Limit</label>
          <input
            type="number"
            step="0.01"
            id="limit"
            name="limit"
            value={formData.limit}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* Start Date */}
        <div className="mb-4">
          <label htmlFor="Start_Date" className="block text-gray-700 text-sm font-bold mb-2">Start Date</label>
          <input
            type="date"
            id="Start_Date"
            name="Start_Date"
            value={formData.Start_Date}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* End Date */}
        <div className="mb-4">
          <label htmlFor="End_Date" className="block text-gray-700 text-sm font-bold mb-2">End Date</label>
          <input
            type="date"
            id="End_Date"
            name="End_Date"
            value={formData.End_Date}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
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
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
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

export default OverdraftForm;