import React, { useState } from 'react';
import axios from 'axios';

const ScheduledPaymentForm = () => {
    const [payment, setPayment] = useState({
        paymentID: '',
        accountID: '',
        amount: '',
        paymentDate: '',
        frequency: '',
        status: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPayment({ ...payment, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Validate form fields before submission
        if (!payment.accountID || !payment.amount || !payment.paymentDate || !payment.status) {
            alert('Please fill out all required fields.');
            return;
        }
    
        console.log('Submitting payment:', payment);
    
        try {
            await axios.post('http://localhost:5001/scheduledPayments', payment);
            alert('Scheduled payment created successfully!');
            setPayment({
                paymentID: '',
                accountID: '',
                amount: '',
                paymentDate: '',
                frequency: '',
                status: ''
            });
        } catch (error) {
            console.error('Error creating payment:', error);
        }
    };
    

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-3xl font-bold mb-6 text-center">Scheduled Payment</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="paymentID" className="block text-sm font-medium">Payment ID</label>
                    <input 
                        type="number"
                        name="paymentID" 
                        placeholder="Payment ID" 
                        value={payment.paymentID} 
                        onChange={handleChange} 
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500" 
                    />
                </div>
                <div>
                    <label htmlFor="accountID" className="block text-sm font-medium">Account ID</label>
                    <input 
                        type="number"
                        name="accountID" 
                        placeholder="Account ID" 
                        value={payment.accountID} 
                        onChange={handleChange} 
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500" 
                    />
                </div>
                <div>
                    <label htmlFor="amount" className="block text-sm font-medium">Amount</label>
                    <input 
                        type="number"
                        name="amount" 
                        placeholder="Amount" 
                        value={payment.amount} 
                        onChange={handleChange} 
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500" 
                    />
                </div>
                <div>
                    <label htmlFor="paymentDate" className="block text-sm font-medium">Payment Date</label>
                    <input 
                        type="date"
                        name="paymentDate" 
                        placeholder="Payment Date" 
                        value={payment.paymentDate} 
                        onChange={handleChange} 
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500" 
                    />
                </div>
                <div>
                    <label htmlFor="frequency" className="block text-sm font-medium">Frequency</label>
                    <select
                        id="frequency"
                        name="frequency"
                        value={payment.frequency}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="">Select Frequency</option>
                        <option value="One-time">One-time</option>
                        <option value="Daily">Daily</option>
                        <option value="Weekly">Weekly</option>
                        <option value="Monthly">Monthly</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="status" className="block text-sm font-medium">Status</label>
                    <select
                        id="status"
                        name="status"
                        value={payment.status}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="">Status</option>
                        <option value="Active">Active</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>
                <div className="mt-6 text-center">
                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:ring-4 focus:ring-blue-200"
                    >
                        Submit Scheduled Payment
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ScheduledPaymentForm;
