import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CustomerFixedDeposite = () => {
    const [fixedDeposits, setFixedDeposits] = useState([]);
    const userId = localStorage.getItem('user_id'); // Retrieve the user ID from localStorage

    useEffect(() => {
        if (userId) {
            fetchFixedDeposits(userId);
        }
    }, [userId]);

    const fetchFixedDeposits = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:5001/fixedDeposits/${userId}`);
            setFixedDeposits(response.data);
        } catch (error) {
            console.error('Error fetching fixed deposits:', error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">Your Fixed Deposits</h2>
            {fixedDeposits.length === 0 ? (
                <p className="text-center text-gray-500">No data available</p>
            ) : (
                <div className="overflow-auto">
                    <table className="min-w-full table-fixed bg-white">
                        <thead>
                            <tr>
                                <th className="w-1/7 py-2 px-4 bg-gray-200 text-gray-600 border-b border-gray-200">Deposit ID</th>
                                <th className="w-1/7 py-2 px-4 bg-gray-200 text-gray-600 border-b border-gray-200">User ID</th>
                                <th className="w-1/7 py-2 px-4 bg-gray-200 text-gray-600 border-b border-gray-200">Amount</th>
                                <th className="w-1/7 py-2 px-4 bg-gray-200 text-gray-600 border-b border-gray-200">Interest Rate</th>
                                <th className="w-1/7 py-2 px-4 bg-gray-200 text-gray-600 border-b border-gray-200">Start Date</th>
                                <th className="w-1/7 py-2 px-4 bg-gray-200 text-gray-600 border-b border-gray-200">End Date</th>
                                <th className="w-1/7 py-2 px-4 bg-gray-200 text-gray-600 border-b border-gray-200">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fixedDeposits.map((deposit) => (
                                <tr key={deposit.Deposit_ID}>
                                    <td className="py-2 px-4 border-b border-gray-200">{deposit.Deposit_ID}</td>
                                    <td className="py-2 px-4 border-b border-gray-200">{deposit.User_ID}</td>
                                    <td className="py-2 px-4 border-b border-gray-200">{deposit.Amount}</td>
                                    <td className="py-2 px-4 border-b border-gray-200">{deposit.Interest_Rate}</td>
                                    <td className="py-2 px-4 border-b border-gray-200">{new Date(deposit.Start_Date).toLocaleDateString()}</td>
                                    <td className="py-2 px-4 border-b border-gray-200">{new Date(deposit.End_Date).toLocaleDateString()}</td>
                                    <td className="py-2 px-4 border-b border-gray-200">{deposit.Status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default CustomerFixedDeposite;
