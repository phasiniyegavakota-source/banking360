import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CustomerOverDraft = () => {
    const [overdrafts, setOverdrafts] = useState([]);
    const userId = localStorage.getItem('user_id'); // Retrieve the user ID from localStorage

    useEffect(() => {
        if (userId) {
            fetchOverdrafts(userId);
        }
    }, [userId]);

    const fetchOverdrafts = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:5001/overdrafts/${userId}`);
            setOverdrafts(response.data);
        } catch (error) {
            console.error('Error fetching overdrafts:', error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">Your Overdrafts</h2>
            {overdrafts.length === 0 ? (
                <p className="text-center text-gray-500">No data available</p>
            ) : (
                <div className="overflow-auto">
                    <table className="min-w-full table-fixed bg-white">
                        <thead>
                            <tr>
                                <th className="w-1/6 py-2 px-4 bg-gray-200 text-gray-600 border-b border-gray-200">Overdraft ID</th>
                                <th className="w-1/6 py-2 px-4 bg-gray-200 text-gray-600 border-b border-gray-200">Account ID</th>
                                <th className="w-1/6 py-2 px-4 bg-gray-200 text-gray-600 border-b border-gray-200">Limit</th>
                                <th className="w-1/6 py-2 px-4 bg-gray-200 text-gray-600 border-b border-gray-200">Start Date</th>
                                <th className="w-1/6 py-2 px-4 bg-gray-200 text-gray-600 border-b border-gray-200">End Date</th>
                                <th className="w-1/6 py-2 px-4 bg-gray-200 text-gray-600 border-b border-gray-200">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {overdrafts.map((overdraft) => (
                                <tr key={overdraft.Overdraft_ID}>
                                    <td className="py-2 px-4 border-b border-gray-200">{overdraft.Overdraft_ID}</td>
                                    <td className="py-2 px-4 border-b border-gray-200">{overdraft.Account_ID}</td>
                                    <td className="py-2 px-4 border-b border-gray-200">{overdraft.Limit}</td>
                                    <td className="py-2 px-4 border-b border-gray-200">{new Date(overdraft.Start_Date).toLocaleDateString()}</td>
                                    <td className="py-2 px-4 border-b border-gray-200">{new Date(overdraft.End_Date).toLocaleDateString()}</td>
                                    <td className="py-2 px-4 border-b border-gray-200">{overdraft.Status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default CustomerOverDraft;
