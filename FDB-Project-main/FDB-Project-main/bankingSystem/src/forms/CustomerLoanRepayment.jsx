import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CustomerLoanRepayment = () => {
    const [loanRepayments, setLoanRepayments] = useState([]);
    const userId = localStorage.getItem('user_id'); // Retrieve the user ID from localStorage

    useEffect(() => {
        if (userId) {
            fetchLoanRepayments(userId);
        }
    }, [userId]);

    const fetchLoanRepayments = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:5001/loanRepayments/${userId}`);
            setLoanRepayments(response.data);
        } catch (error) {
            console.error('Error fetching loan repayments:', error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">Loan Repayments</h2>
            {loanRepayments.length === 0 ? (
                <p className="text-center text-gray-500">No data available</p>
            ) : (
                <div className="overflow-auto">
                    <table className="min-w-full table-fixed bg-white">
                        <thead>
                            <tr>
                                <th className="w-1/6 py-2 px-4 bg-gray-200 text-gray-600 border-b border-gray-200">Repayment ID</th>
                                <th className="w-1/6 py-2 px-4 bg-gray-200 text-gray-600 border-b border-gray-200">Loan ID</th>
                                <th className="w-1/6 py-2 px-4 bg-gray-200 text-gray-600 border-b border-gray-200">Repayment Amount</th>
                                <th className="w-1/6 py-2 px-4 bg-gray-200 text-gray-600 border-b border-gray-200">Repayment Date</th>
                                <th className="w-1/6 py-2 px-4 bg-gray-200 text-gray-600 border-b border-gray-200">Payment Method</th>
                                <th className="w-1/6 py-2 px-4 bg-gray-200 text-gray-600 border-b border-gray-200">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loanRepayments.map((repayment) => (
                                <tr key={repayment.Repayment_ID}>
                                    <td className="py-2 px-4 border-b border-gray-200">{repayment.Repayment_ID}</td>
                                    <td className="py-2 px-4 border-b border-gray-200">{repayment.Loan_ID}</td>
                                    <td className="py-2 px-4 border-b border-gray-200">{repayment.Repayment_Amount}</td>
                                    <td className="py-2 px-4 border-b border-gray-200">{new Date(repayment.Repayment_Date).toLocaleDateString()}</td>
                                    <td className="py-2 px-4 border-b border-gray-200">{repayment.Payment_Method}</td>
                                    <td className="py-2 px-4 border-b border-gray-200">{repayment.Status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default CustomerLoanRepayment;
