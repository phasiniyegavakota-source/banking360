import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CustomerCardTransaction = () => {
    const [transactions, setTransactions] = useState([]);
    const userId = localStorage.getItem('user_id'); // Retrieve the user ID from localStorage

    useEffect(() => {
        if (userId) {
            fetchTransactions(userId);
        }
    }, [userId]);

    const fetchTransactions = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:5001/cardTransactions/${userId}`);
            setTransactions(response.data);
        } catch (error) {
            console.error('Error fetching card transactions:', error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">Card Transactions</h2>
            {transactions.length === 0 ? (
                <p className="text-center text-gray-500">No data available</p>
            ) : (
                <div className="overflow-auto">
                    <table className="min-w-full table-fixed bg-white">
                        <thead>
                            <tr>
                                <th className="w-1/12 py-2 px-4 bg-gray-200 text-gray-600 border-b border-gray-200">Transaction ID</th>
                                <th className="w-1/12 py-2 px-4 bg-gray-200 text-gray-600 border-b border-gray-200">Card ID</th>
                                <th className="w-1/12 py-2 px-4 bg-gray-200 text-gray-600 border-b border-gray-200">Transaction Date</th>
                                <th className="w-1/12 py-2 px-4 bg-gray-200 text-gray-600 border-b border-gray-200">Amount</th>
                                <th className="w-1/12 py-2 px-4 bg-gray-200 text-gray-600 border-b border-gray-200">Merchant</th>
                                <th className="w-1/12 py-2 px-4 bg-gray-200 text-gray-600 border-b border-gray-200">Transaction Type ID</th>
                                <th className="w-1/12 py-2 px-4 bg-gray-200 text-gray-600 border-b border-gray-200">Location</th>
                                <th className="w-1/12 py-2 px-4 bg-gray-200 text-gray-600 border-b border-gray-200">Currency</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((transaction) => (
                                <tr key={transaction.Transaction_ID}>
                                    <td className="py-2 px-4 border-b border-gray-200">{transaction.Transaction_ID}</td>
                                    <td className="py-2 px-4 border-b border-gray-200">{transaction.Card_ID}</td>
                                    <td className="py-2 px-4 border-b border-gray-200">{new Date(transaction.Transaction_Date).toLocaleDateString()}</td>
                                    <td className="py-2 px-4 border-b border-gray-200">{transaction.Amount}</td>
                                    <td className="py-2 px-4 border-b border-gray-200">{transaction.Merchant}</td>
                                    <td className="py-2 px-4 border-b border-gray-200">{transaction.Transaction_Type_ID}</td>
                                    <td className="py-2 px-4 border-b border-gray-200">{transaction.Location}</td>
                                    <td className="py-2 px-4 border-b border-gray-200">{transaction.Currency}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default CustomerCardTransaction;
