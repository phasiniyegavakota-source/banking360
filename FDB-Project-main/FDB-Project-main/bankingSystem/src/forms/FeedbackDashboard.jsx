import React, { useState, useEffect } from 'react';

const CustomerFeedbackTable = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch feedback data
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await fetch('http://localhost:5001/feedbacks');
        const data = await response.json();
        // Format Feedback_Date without the time zone
        const formattedData = data.map(feedback => ({
          ...feedback,
          Feedback_Date: feedback.Feedback_Date ? feedback.Feedback_Date.split('T')[0] : '',
        }));
        setFeedbacks(formattedData);
      } catch (error) {
        setErrorMessage('An error occurred while fetching feedback data.');
      }
    };

    fetchFeedbacks();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Customer Feedback</h1>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <table className="min-w-full bg-white border border-gray-300 rounded-lg">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Feedback ID</th>
            <th className="px-4 py-2 border">User ID</th>
            <th className="px-4 py-2 border">Feedback Date</th>
            <th className="px-4 py-2 border">Feedback Type</th>
            <th className="px-4 py-2 border">Comments</th>
            <th className="px-4 py-2 border">Rating</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.length > 0 ? (
            feedbacks.map((feedback) => (
              <tr key={feedback.Feedback_ID}>
                <td className="px-4 py-2 border">{feedback.Feedback_ID}</td>
                <td className="px-4 py-2 border">{feedback.User_ID}</td>
                <td className="px-4 py-2 border">{feedback.Feedback_Date}</td>
                <td className="px-4 py-2 border">{feedback.Feedback_Type}</td>
                <td className="px-4 py-2 border">{feedback.Comments}</td>
                <td className="px-4 py-2 border">{feedback.Rating}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="px-4 py-2 border" colSpan="6">No feedback available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerFeedbackTable;
