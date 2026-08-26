import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CustomerATMTransactions = () => {
    const [transactions, setTransactions] = useState([]);
    const userId = localStorage.getItem('user_id'); // Retrieve the user ID from localStorage

    useEffect(() => {
        if (userId) {
            fetchTransactions(userId);
        }
    }, [userId]);

    const fetchTransactions = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:5001/atmTransactions/${userId}`);
            setTransactions(response.data);
        } catch (error) {
            console.error('Error fetching ATM transactions:', error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">ATM Transactions</h2>
            {transactions.length === 0 ? (
                <p className="text-center text-gray-500">No data available</p>
            ) : (
                <div className="overflow-auto">
                    <table className="min-w-full table-fixed bg-white">
                        <thead>
                            <tr>
                                <th className="w-1/12 py-2 px-4 bg-gray-200 text-gray-600 border-b border-gray-200">Transaction ID</th>
                                <th className="w-1/12 py-2 px-4 bg-gray-200 text-gray-600 border-b border-gray-200">ATM ID</th>
                                <th className="w-1/12 py-2 px-4 bg-gray-200 text-gray-600 border-b border-gray-200">User ID</th>
                                <th className="w-1/12 py-2 px-4 bg-gray-200 text-gray-600 border-b border-gray-200">Transaction Date</th>
                                <th className="w-1/12 py-2 px-4 bg-gray-200 text-gray-600 border-b border-gray-200">Amount</th>
                                <th className="w-1/12 py-2 px-4 bg-gray-200 text-gray-600 border-b border-gray-200">Transaction Type ID</th>
                                <th className="w-1/12 py-2 px-4 bg-gray-200 text-gray-600 border-b border-gray-200">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((transaction) => (
                                <tr key={transaction.ATM_Transaction_ID}>
                                    <td className="py-2 px-4 border-b border-gray-200">{transaction.ATM_Transaction_ID}</td>
                                    <td className="py-2 px-4 border-b border-gray-200">{transaction.ATM_ID}</td>
                                    <td className="py-2 px-4 border-b border-gray-200">{transaction.User_ID}</td>
                                    <td className="py-2 px-4 border-b border-gray-200">{new Date(transaction.Transaction_Date).toLocaleDateString()}</td>
                                    <td className="py-2 px-4 border-b border-gray-200">{transaction.Amount}</td>
                                    <td className="py-2 px-4 border-b border-gray-200">{transaction.Transaction_Type_ID}</td>
                                    <td className="py-2 px-4 border-b border-gray-200">{transaction.Status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default CustomerATMTransactions;
