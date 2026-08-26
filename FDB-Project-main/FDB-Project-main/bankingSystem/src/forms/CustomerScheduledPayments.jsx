import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CustomerScheduledPayments = () => {
    const [payments, setPayments] = useState([]);
    const userId = localStorage.getItem('user_id');

    useEffect(() => {
        if (userId) {
            fetchScheduledPayments(userId);
        }
    }, [userId]);

    const fetchScheduledPayments = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:5001/scheduledPayments/${userId}`);
            setPayments(response.data);
        } catch (error) {
            console.error('Error fetching scheduled payments:', error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">Scheduled Payments</h2>
            {payments.length === 0 ? (
                <p className="text-center text-gray-500">No data available</p>
            ) : (
                <div className="overflow-auto">
                    <table className="min-w-full table-fixed bg-white">
                        <thead>
                            <tr>
                                <th className="w-1/10 py-2 px-4 bg-gray-200 text-gray-600 border-b border-gray-200">Payment ID</th>
                                <th className="w-1/10 py-2 px-4 bg-gray-200 text-gray-600 border-b border-gray-200">Account ID</th>
                                <th className="w-2/10 py-2 px-4 bg-gray-200 text-gray-600 border-b border-gray-200">Amount</th>
                                <th className="w-2/10 py-2 px-4 bg-gray-200 text-gray-600 border-b border-gray-200">Payment Date</th>
                                <th className="w-3/10 py-2 px-4 bg-gray-200 text-gray-600 border-b border-gray-200">Description</th>
                                <th className="w-1/10 py-2 px-4 bg-gray-200 text-gray-600 border-b border-gray-200">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((payment) => (
                                <tr key={payment.Payment_ID}>
                                    <td className="py-2 px-4 border-b border-gray-200">{payment.Payment_ID}</td>
                                    <td className="py-2 px-4 border-b border-gray-200">{payment.Account_ID}</td>
                                    <td className="py-2 px-4 border-b border-gray-200">{payment.Amount}</td>
                                    <td className="py-2 px-4 border-b border-gray-200">{new Date(payment.Payment_Date).toLocaleDateString()}</td>
                                    <td className="py-2 px-4 border-b border-gray-200">{payment.Description}</td>
                                    <td className="py-2 px-4 border-b border-gray-200">{payment.Status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default CustomerScheduledPayments;
