import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AccountHolder = () => {
    const [accountHolder, setAccountHolder] = useState({
        accountHolderID: '',
        accountID: '',
        customerID: '',
        relationshipType: 'Primary',
        startDate: '',
        endDate: '',
    });

    const [errors, setErrors] = useState({});
    const [accountHolders, setAccountHolders] = useState([]);

    useEffect(() => {
        fetchAccountHolders();
    }, []);

    const fetchAccountHolders = async () => {
        try {
            const response = await axios.get('http://localhost:5001/accountHolders');
            setAccountHolders(response.data);
        } catch (error) {
            console.error('Error fetching account holders:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAccountHolder({ ...accountHolder, [name]: value });
    };

    const validate = () => {
        const newErrors = {};
        if (!accountHolder.startDate) newErrors.startDate = 'Start Date is required';
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            await axios.post('http://localhost:5001/accountHolders', accountHolder);
            alert('Account Holder created successfully!');
            fetchAccountHolders();
            setAccountHolder({
                accountHolderID: '',
                accountID: '',
                customerID: '',
                relationshipType: 'Primary',
                startDate: '',
                endDate: '',
            });
            setErrors({});
        } catch (error) {
            console.error('Error creating account holder:', error);
        }
    };

    const handleUpdate = async (id) => {
        const updatedAccountHolder = accountHolders.find(holder => holder.Account_Holder_ID === id);
        try {
            await axios.put(`http://localhost:5001/accountHolders/${id}`, updatedAccountHolder);
            alert('Account Holder updated successfully!');
            fetchAccountHolders();
        } catch (error) {
            console.error('Error updating account holder:', error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-3xl font-bold mb-6 text-center">Account Holder Details</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="accountHolderID" className="block text-sm font-medium">Account Holder ID</label>
                    <input
                        type="text"
                        id="accountHolderID"
                        name="accountHolderID"
                        placeholder="Enter Account Holder ID"
                        value={accountHolder.accountHolderID}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="accountID" className="block text-sm font-medium">Account ID</label>
                    <input
                        type="text"
                        id="accountID"
                        name="accountID"
                        placeholder="Enter Account ID"
                        value={accountHolder.accountID}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="customerID" className="block text-sm font-medium">Customer ID</label>
                    <input
                        type="text"
                        id="customerID"
                        name="customerID"
                        placeholder="Enter Customer ID"
                        value={accountHolder.customerID}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="relationshipType" className="block text-sm font-medium">Relationship Type</label>
                    <select
                        id="relationshipType"
                        name="relationshipType"
                        value={accountHolder.relationshipType}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="Primary">Primary</option>
                        <option value="Joint">Joint</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="startDate" className="block text-sm font-medium">Start Date</label>
                    <input
                        type="date"
                        id="startDate"
                        name="startDate"
                        value={accountHolder.startDate}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.startDate && <p className="text-red-500 text-sm mt-2">{errors.startDate}</p>}
                </div>
                <div className="mt-6 text-center">
                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:ring-4 focus:ring-blue-200"
                    >
                        Create Account Holder
                    </button>
                </div>
            </form>
            <h2 className="text-2xl font-bold mb-4 text-center">Account Holders</h2>
            <ul>
                {accountHolders.map(holder => (
                    <li key={holder.Account_Holder_ID}>
                        {holder.Relationship_Type} - {holder.Customer_ID}
                        <button onClick={() => handleUpdate(holder.Account_Holder_ID)} className="ml-2 text-blue-500">Update</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AccountHolder;
