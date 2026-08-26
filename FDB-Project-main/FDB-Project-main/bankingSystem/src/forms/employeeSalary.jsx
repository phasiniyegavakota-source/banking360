import React, { useState } from 'react';

const SalaryForm = () => {
  const [formData, setFormData] = useState({
    Employee_ID: '',
    Salary_Amount: '',
    Payment_Date: '',
    Bonus: '',
    Deductions: '',
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

    // Format date to YYYY-MM-DD
    const formattedDate = new Date(formData.Payment_Date).toISOString().split('T')[0];

    const dataToSend = {
      ...formData,
      Payment_Date: formattedDate, // Send the correctly formatted date
    };

    try {
      const response = await fetch('http://localhost:5001/employeeSalaries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        setSuccessMessage('Salary information submitted successfully!');
        setFormData({
          Employee_ID: '',
          Salary_Amount: '',
          Payment_Date: '',
          Bonus: '',
          Deductions: '',
        });
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Failed to submit salary data.');
      }
    } catch (error) {
      setErrorMessage('An error occurred while submitting the form.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Submit Salary Information</h1>
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {/* Employee ID */}
        <div className="mb-4">
          <label htmlFor="Employee_ID" className="block text-gray-700 text-sm font-bold mb-2">Employee ID</label>
          <input
            type="number"
            id="Employee_ID"
            name="Employee_ID"
            value={formData.Employee_ID}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* Salary Amount */}
        <div className="mb-4">
          <label htmlFor="Salary_Amount" className="block text-gray-700 text-sm font-bold mb-2">Salary Amount</label>
          <input
            type="number"
            id="Salary_Amount"
            name="Salary_Amount"
            value={formData.Salary_Amount}
            onChange={handleChange}
            required
            step="0.01"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* Payment Date */}
        <div className="mb-4">
          <label htmlFor="Payment_Date" className="block text-gray-700 text-sm font-bold mb-2">Payment Date</label>
          <input
            type="date"
            id="Payment_Date"
            name="Payment_Date"
            value={formData.Payment_Date}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* Bonus */}
        <div className="mb-4">
          <label htmlFor="Bonus" className="block text-gray-700 text-sm font-bold mb-2">Bonus</label>
          <input
            type="number"
            id="Bonus"
            name="Bonus"
            value={formData.Bonus}
            onChange={handleChange}
            step="0.01"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* Deductions */}
        <div className="mb-4">
          <label htmlFor="Deductions" className="block text-gray-700 text-sm font-bold mb-2">Deductions</label>
          <input
            type="number"
            id="Deductions"
            name="Deductions"
            value={formData.Deductions}
            onChange={handleChange}
            step="0.01"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
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

export default SalaryForm;
