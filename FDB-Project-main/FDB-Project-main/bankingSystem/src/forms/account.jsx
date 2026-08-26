import React, { useState } from 'react';

const AccountForm = () => {
    const [formData, setFormData] = useState({
        User_ID: '',
        Account_Type: '',
        Balance: '',
        Open_Date: '',
        Status: '',
        Interest_Rate: '',
        Branch_ID: '',
        Currency: '',
        Overdraft_Limit: '',
    });

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage('');
        setErrorMessage('');

        try {
            const response = await fetch('http://localhost:5001/accounts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSuccessMessage('Account added successfully!');
                setFormData({
                    User_ID: '',
                    Account_Type: '',
                    Balance: '',
                    Open_Date: '',
                    Status: '',
                    Interest_Rate: '',
                    Branch_ID: '',
                    Currency: '',
                    Overdraft_Limit: '',
                });
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || 'Failed to add account.');
            }
        } catch (error) {
            setErrorMessage('An error occurred while submitting the form.');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-xl font-bold mb-4">Add New Account</h1>
            {successMessage && <p className="text-green-500">{successMessage}</p>}
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                {/* User ID */}
                <div className="mb-4">
                    <label htmlFor="User_ID" className="block text-gray-700 text-sm font-bold mb-2">User ID</label>
                    <input
                        type="number"
                        id="User_ID"
                        name="User_ID"
                        value={formData.User_ID}
                        onChange={handleChange}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                {/* Account Type Dropdown */}
                <div className="mb-4">
                    <label htmlFor="Account_Type" className="block text-gray-700 text-sm font-bold mb-2">Account Type</label>
                    <select
                        id="Account_Type"
                        name="Account_Type"
                        value={formData.Account_Type}
                        onChange={handleChange}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="">Select Account Type</option>
                        <option value="Savings">Savings</option>
                        <option value="Checking">Checking</option>
                        <option value="Business">Business</option>
                    </select>
                </div>

                {/* Balance */}
                <div className="mb-4">
                    <label htmlFor="Balance" className="block text-gray-700 text-sm font-bold mb-2">Balance</label>
                    <input
                        type="number"
                        step="0.01"
                        id="Balance"
                        name="Balance"
                        value={formData.Balance}
                        onChange={handleChange}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                {/* Open Date */}
                <div className="mb-4">
                    <label htmlFor="Open_Date" className="block text-gray-700 text-sm font-bold mb-2">Open Date</label>
                    <input
                        type="date"
                        id="Open_Date"
                        name="Open_Date"
                        value={formData.Open_Date}
                        onChange={handleChange}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                {/* Status Dropdown */}
                <div className="mb-4">
                    <label htmlFor="Status" className="block text-gray-700 text-sm font-bold mb-2">Status</label>
                    <select
                        id="Status"
                        name="Status"
                        value={formData.Status}
                        onChange={handleChange}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="">Select Status</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                </div>

                {/* Interest Rate */}
                <div className="mb-4">
                    <label htmlFor="Interest_Rate" className="block text-gray-700 text-sm font-bold mb-2">Interest Rate (%)</label>
                    <input
                        type="number"
                        step="0.01"
                        id="Interest_Rate"
                        name="Interest_Rate"
                        value={formData.Interest_Rate}
                        onChange={handleChange}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                {/* Branch ID */}
                <div className="mb-4">
                    <label htmlFor="Branch_ID" className="block text-gray-700 text-sm font-bold mb-2">Branch ID</label>
                    <input
                        type="number"
                        id="Branch_ID"
                        name="Branch_ID"
                        value={formData.Branch_ID}
                        onChange={handleChange}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                {/* Currency Dropdown */}
                <div className="mb-4">
                    <label htmlFor="Currency" className="block text-gray-700 text-sm font-bold mb-2">Currency</label>
                    <select
                        id="Currency"
                        name="Currency"
                        value={formData.Currency}
                        onChange={handleChange}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="">Select Currency</option>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="INR">INR</option>
                    </select>
                </div>

                {/* Overdraft Limit */}
                <div className="mb-4">
                    <label htmlFor="Overdraft_Limit" className="block text-gray-700 text-sm font-bold mb-2">Overdraft Limit</label>
                    <input
                        type="number"
                        step="0.01"
                        id="Overdraft_Limit"
                        name="Overdraft_Limit"
                        value={formData.Overdraft_Limit}
                        onChange={handleChange}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default AccountForm;