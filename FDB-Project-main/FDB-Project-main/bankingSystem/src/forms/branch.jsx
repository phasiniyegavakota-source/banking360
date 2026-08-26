import React, { useState } from 'react';

const BranchForm = () => {
  const [formData, setFormData] = useState({
    Branch_Name: '',
    Address: '',
    Phone: '',
    Manager_ID: '',
    Opening_Date: '',
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
    const formattedOpeningDate = new Date(formData.Opening_Date).toISOString().split('T')[0];

    const dataToSend = {
      ...formData,
      Opening_Date: formattedOpeningDate,
    };

    try {
      const response = await fetch('http://localhost:5001/branches', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        setSuccessMessage('Branch added successfully!');
        setFormData({
          Branch_Name: '',
          Address: '',
          Phone: '',
          Manager_ID: '',
          Opening_Date: '',
          Status: '',
        });
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Failed to add branch.');
      }
    } catch (error) {
      setErrorMessage('An error occurred while submitting the form.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Add New Branch</h1>
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {/* Branch Name */}
        <div className="mb-4">
          <label htmlFor="Branch_Name" className="block text-gray-700 text-sm font-bold mb-2">Branch Name</label>
          <input
            type="text"
            id="Branch_Name"
            name="Branch_Name"
            value={formData.Branch_Name}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* Address */}
        <div className="mb-4">
          <label htmlFor="Address" className="block text-gray-700 text-sm font-bold mb-2">Address</label>
          <input
            type="text"
            id="Address"
            name="Address"
            value={formData.Address}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label htmlFor="Phone" className="block text-gray-700 text-sm font-bold mb-2">Phone</label>
          <input
            type="text"
            id="Phone"
            name="Phone"
            value={formData.Phone}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* Manager ID */}
        <div className="mb-4">
          <label htmlFor="Manager_ID" className="block text-gray-700 text-sm font-bold mb-2">Manager ID</label>
          <input
            type="number"
            id="Manager_ID"
            name="Manager_ID"
            value={formData.Manager_ID}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* Opening Date */}
        <div className="mb-4">
          <label htmlFor="Opening_Date" className="block text-gray-700 text-sm font-bold mb-2">Opening Date</label>
          <input
            type="date"
            id="Opening_Date"
            name="Opening_Date"
            value={formData.Opening_Date}
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

export default BranchForm;