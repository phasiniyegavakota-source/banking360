import React, { useState } from 'react';

const EmployeeForm = () => {
  const [formData, setFormData] = useState({
    Name: '',
    Position: '',
    Branch_ID: '',
    Hire_Date: '',
    Salary: '',
    Status: 'Active', // Default status
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

  // Validate form data
  const validateForm = () => {
    if (!formData.Name || !formData.Position || !formData.Branch_ID || !formData.Hire_Date || !formData.Salary) {
      return 'All fields are required.';
    }
    if (Number(formData.Salary) <= 0) {
      return 'Salary must be a positive value.';
    }
    return null;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    const error = validateForm();
    if (error) {
      setErrorMessage(error);
      return;
    }

    try {
      const response = await fetch('http://localhost:5001/employees', { // Updated URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccessMessage('Employee added successfully!');
        setTimeout(() => setSuccessMessage(''), 3000); // Auto-hide success message
        setFormData({
          Name: '',
          Position: '',
          Branch_ID: '',
          Hire_Date: '',
          Salary: '',
          Status: 'Active',
        });
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Failed to submit employee data.');
      }
    } catch (error) {
      setErrorMessage('An error occurred while submitting the form.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Submit Employee Information</h1>
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {/* Name */}
        <div className="mb-4">
          <label htmlFor="Name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
          <input
            type="text"
            id="Name"
            name="Name"
            value={formData.Name}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* Position */}
        <div className="mb-4">
          <label htmlFor="Position" className="block text-gray-700 text-sm font-bold mb-2">Position</label>
          <input
            type="text"
            id="Position"
            name="Position"
            value={formData.Position}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* Branch ID */}
        <div className="mb-4">
          <label htmlFor="Branch_ID" className="block text-gray-700 text-sm font-bold mb-2">Branch ID</label>
          <input
            type="number"
            id="Branch_ID"
            name="Branch_ID"
            value={formData.Branch_ID}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* Hire Date */}
        <div className="mb-4">
          <label htmlFor="Hire_Date" className="block text-gray-700 text-sm font-bold mb-2">Hire Date</label>
          <input
            type="date"
            id="Hire_Date"
            name="Hire_Date"
            value={formData.Hire_Date}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* Salary */}
        <div className="mb-4">
          <label htmlFor="Salary" className="block text-gray-700 text-sm font-bold mb-2">Salary</label>
          <input
            type="number"
            id="Salary"
            name="Salary"
            value={formData.Salary}
            onChange={handleChange}
            required
            step="0.01"
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

export default EmployeeForm;
