import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CustomerFeedback = () => {
    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
        fetchFeedbacks();
    }, []);

    const fetchFeedbacks = async () => {
        try {
            const response = await axios.get('http://localhost:5001/feedbacks');
            setFeedbacks(response.data);
        } catch (error) {
            console.error('Error fetching feedback:', error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">Feedback</h2>
            {feedbacks.length === 0 ? (
                <p className="text-center text-gray-500">No data available</p>
            ) : (
                <div className="overflow-auto">
                    <table className="min-w-full table-fixed bg-white">
                        <thead>
                            <tr>
                                <th className="w-1/12 py-2 px-4 bg-gray-200 text-gray-600 border-b border-gray-200">Feedback ID</th>
                                <th className="w-1/12 py-2 px-4 bg-gray-200 text-gray-600 border-b border-gray-200">User ID</th>
                                <th className="w-1/12 py-2 px-4 bg-gray-200 text-gray-600 border-b border-gray-200">Feedback Date</th>
                                <th className="w-2/12 py-2 px-4 bg-gray-200 text-gray-600 border-b border-gray-200">Feedback Type</th>
                                <th className="w-5/12 py-2 px-4 bg-gray-200 text-gray-600 border-b border-gray-200">Comments</th>
                                <th className="w-1/12 py-2 px-4 bg-gray-200 text-gray-600 border-b border-gray-200">Rating</th>
                            </tr>
                        </thead>
                        <tbody>
                            {feedbacks.map((feedback) => (
                                <tr key={feedback.Feedback_ID}>
                                    <td className="py-2 px-4 border-b border-gray-200">{feedback.Feedback_ID}</td>
                                    <td className="py-2 px-4 border-b border-gray-200">{feedback.User_ID}</td>
                                    <td className="py-2 px-4 border-b border-gray-200">{new Date(feedback.Feedback_Date).toLocaleDateString()}</td>
                                    <td className="py-2 px-4 border-b border-gray-200">{feedback.Feedback_Type}</td>
                                    <td className="py-2 px-4 border-b border-gray-200">{feedback.Comments}</td>
                                    <td className="py-2 px-4 border-b border-gray-200">{feedback.Rating}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default CustomerFeedback;
