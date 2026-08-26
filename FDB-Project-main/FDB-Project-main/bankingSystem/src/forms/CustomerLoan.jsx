import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CustomerLoan = () => {
    const [loans, setLoans] = useState([]);
    const userId = localStorage.getItem('user_id'); // Retrieve the user ID from localStorage

    useEffect(() => {
        if (userId) {
            fetchLoans(userId);
        }
    }, [userId]);

    const fetchLoans = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:5001/loans/${userId}`);
            setLoans(response.data);
        } catch (error) {
            console.error('Error fetching loans:', error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">Your Loans</h2>
            {loans.length === 0 ? (
                <p className="text-center text-gray-500">No data available</p>
            ) : (
                <div className="overflow-auto">
                    <table className="min-w-full table-fixed bg-white">
                        <thead>
                            <tr>
                                <th className="w-1/10 py-2 px-4 bg-gray-200 text-gray-600 border-b border-gray-200">Loan ID</th>
                                <th className="w-1/10 py-2 px-4 bg-gray-200 text-gray-600 border-b border-gray-200">User ID</th>
                                <th className="w-1/10 py-2 px-4 bg-gray-200 text-gray-600 border-b border-gray-200">Loan Type ID</th>
                                <th className="w-1/10 py-2 px-4 bg-gray-200 text-gray-600 border-b border-gray-200">Amount</th>
                                <th className="w-1/10 py-2 px-4 bg-gray-200 text-gray-600 border-b border-gray-200">Interest Rate</th>
                                <th className="w-1/10 py-2 px-4 bg-gray-200 text-gray-600 border-b border-gray-200">Start Date</th>
                                <th className="w-1/10 py-2 px-4 bg-gray-200 text-gray-600 border-b border-gray-200">End Date</th>
                                <th className="w-1/10 py-2 px-4 bg-gray-200 text-gray-600 border-b border-gray-200">Status</th>
                                <th className="w-1/10 py-2 px-4 bg-gray-200 text-gray-600 border-b border-gray-200">Collateral</th>
                                <th className="w-1/10 py-2 px-4 bg-gray-200 text-gray-600 border-b border-gray-200">Repayment Term</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loans.map((loan) => (
                                <tr key={loan.Loan_ID}>
                                    <td className="py-2 px-4 border-b border-gray-200">{loan.Loan_ID}</td>
                                    <td className="py-2 px-4 border-b border-gray-200">{loan.User_ID}</td>
                                    <td className="py-2 px-4 border-b border-gray-200">{loan.Loan_Type_ID}</td>
                                    <td className="py-2 px-4 border-b border-gray-200">{loan.Amount}</td>
                                    <td className="py-2 px-4 border-b border-gray-200">{loan.Interest_Rate}</td>
                                    <td className="py-2 px-4 border-b border-gray-200">{new Date(loan.Start_Date).toLocaleDateString()}</td>
                                    <td className="py-2 px-4 border-b border-gray-200">{new Date(loan.End_Date).toLocaleDateString()}</td>
                                    <td className="py-2 px-4 border-b border-gray-200">{loan.Status}</td>
                                    <td className="py-2 px-4 border-b border-gray-200">{loan.Collateral}</td>
                                    <td className="py-2 px-4 border-b border-gray-200">{loan.Repayment_Term}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default CustomerLoan;
