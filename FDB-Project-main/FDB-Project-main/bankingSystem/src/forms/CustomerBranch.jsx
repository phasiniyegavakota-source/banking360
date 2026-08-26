import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CustomerBranch = () => {
    const [branches, setBranches] = useState([]);

    useEffect(() => {
        fetchBranches();
    }, []);

    const fetchBranches = async () => {
        try {
            const response = await axios.get('http://localhost:5001/branches');
            setBranches(response.data);
        } catch (error) {
            console.error('Error fetching branches:', error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">Branches</h2>
            {branches.length === 0 ? (
                <p className="text-center text-gray-500">No data available</p>
            ) : (
                <div className="overflow-auto">
                    <table className="min-w-full table-fixed bg-white">
                        <thead>
                            <tr>
                                <th className="w-1/7 py-2 px-4 bg-gray-200 text-gray-600 border-b border-gray-200">Branch ID</th>
                                <th className="w-1/7 py-2 px-4 bg-gray-200 text-gray-600 border-b border-gray-200">Branch Name</th>
                                <th className="w-1/7 py-2 px-4 bg-gray-200 text-gray-600 border-b border-gray-200">Address</th>
                                <th className="w-1/7 py-2 px-4 bg-gray-200 text-gray-600 border-b border-gray-200">Phone</th>
                                <th className="w-1/7 py-2 px-4 bg-gray-200 text-gray-600 border-b border-gray-200">Manager ID</th>
                                <th className="w-1/7 py-2 px-4 bg-gray-200 text-gray-600 border-b border-gray-200">Opening Date</th>
                                <th className="w-1/7 py-2 px-4 bg-gray-200 text-gray-600 border-b border-gray-200">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {branches.map((branch) => (
                                <tr key={branch.Branch_ID}>
                                    <td className="py-2 px-4 border-b border-gray-200">{branch.Branch_ID}</td>
                                    <td className="py-2 px-4 border-b border-gray-200">{branch.Branch_Name}</td>
                                    <td className="py-2 px-4 border-b border-gray-200">{branch.Address}</td>
                                    <td className="py-2 px-4 border-b border-gray-200">{branch.Phone}</td>
                                    <td className="py-2 px-4 border-b border-gray-200">{branch.Manager_ID}</td>
                                    <td className="py-2 px-4 border-b border-gray-200">{new Date(branch.Opening_Date).toLocaleDateString()}</td>
                                    <td className="py-2 px-4 border-b border-gray-200">{branch.Status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default CustomerBranch;
