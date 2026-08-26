import React, { useState } from 'react';

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    User_ID: '',
    Feedback_Date: '',
    Feedback_Type: '',
    Comments: '',
    Rating: '',
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
      const response = await fetch('http://localhost:5001/feedbacks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccessMessage('Feedback submitted successfully!');
        setFormData({
          User_ID: '',
          Feedback_Date: '',
          Feedback_Type: '',
          Comments: '',
          Rating: '',
        });
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Failed to submit feedback.');
      }
    } catch (error) {
      setErrorMessage('An error occurred while submitting the form.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Submit Feedback</h1>
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
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

        {/* Feedback Date */}
        <div className="mb-4">
          <label htmlFor="Feedback_Date" className="block text-gray-700 text-sm font-bold mb-2">Feedback Date</label>
          <input
            type="date"
            id="Feedback_Date"
            name="Feedback_Date"
            value={formData.Feedback_Date}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* Feedback Type */}
        <div className="mb-4">
          <label htmlFor="Feedback_Type" className="block text-gray-700 text-sm font-bold mb-2">Feedback Type</label>
          <input
            type="text"
            id="Feedback_Type"
            name="Feedback_Type"
            value={formData.Feedback_Type}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* Comments */}
        <div className="mb-4">
          <label htmlFor="Comments" className="block text-gray-700 text-sm font-bold mb-2">Comments</label>
          <textarea
            id="Comments"
            name="Comments"
            value={formData.Comments}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows="4"
          />
        </div>

        {/* Rating */}
        <div className="mb-4">
          <label htmlFor="Rating" className="block text-gray-700 text-sm font-bold mb-2">Rating (1 to 5)</label>
          <input
            type="number"
            id="Rating"
            name="Rating"
            value={formData.Rating}
            onChange={handleChange}
            required
            min="1"
            max="5"
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

export default FeedbackForm;
