import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CardTransaction = () => {
    const [transaction, setTransaction] = useState({
        transactionID: '',
        cardID: '',
        transactionDate: '',
        amount: '',
        merchant: '',
        transactionTypeID: '',
        location: '',
        currency: 'USD'
    });

    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
        try {
            const response = await axios.get('http://localhost:5001/cardTransactionsall');
            setTransactions(response.data);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTransaction({ ...transaction, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5001/cardTransactions', transaction);
            alert('Transaction created successfully!');
            fetchTransactions();
            setTransaction({
                transactionID: '',
                cardID: '',
                transactionDate: '',
                amount: '',
                merchant: '',
                transactionTypeID: '',
                location: '',
                currency: 'USD'
            });
        } catch (error) {
            console.error('Error creating transaction:', error);
        }
    };

    const handleUpdate = async (id) => {
        const updatedTransaction = transactions.find(trans => trans.Transaction_ID === id);
        try {
            await axios.put(`http://localhost:5001/cardTransactions/${id}`, updatedTransaction);
            alert('Transaction updated successfully!');
            fetchTransactions();
        } catch (error) {
            console.error('Error updating transaction:', error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-3xl font-bold mb-6 text-center">Card Transaction</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="transactionID" className="block text-sm font-medium">Transaction ID</label>
                    <input type="text" name="transactionID" value={transaction.transactionID} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                    <label htmlFor="cardID" className="block text-sm font-medium">Card ID</label>
                    <input type="text" name="cardID" value={transaction.cardID} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                    <label htmlFor="transactionDate" className="block text-sm font-medium">Transaction Date</label>
                    <input type="date" name="transactionDate" value={transaction.transactionDate} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                    <label htmlFor="amount" className="block text-sm font-medium">Amount</label>
                    <input type="number" name="amount" value={transaction.amount} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                    <label htmlFor="merchant" className="block text-sm font-medium">Merchant</label>
                    <input type="text" name="merchant" value={transaction.merchant} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                    <label htmlFor="transactionTypeID" className="block text-sm font-medium">Transaction Type ID</label>
                    <input type="text" name="transactionTypeID" value={transaction.transactionTypeID} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                    <label htmlFor="location" className="block text-sm font-medium">Location</label>
                    <input type="text" name="location" value={transaction.location} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                    <label htmlFor="currency" className="block text-sm font-medium">Currency</label>
                    <select name="currency" value={transaction.currency} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500">
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                    </select>
                </div>
                <div className="mt-6 text-center">
                    <button type="submit" className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:ring-4 focus:ring-blue-200">Submit Transaction</button>
                </div>
            </form>
            <h2 className="text-2xl font-bold mb-4 text-center">Card Transactions</h2>
            <ul>
                {transactions.map(trans => (
                    <li key={trans.Transaction_ID}>
                        {trans.Merchant} - {trans.Amount}
                        <button onClick={() => handleUpdate(trans.Transaction_ID)} className="ml-2 text-blue-500">Update</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CardTransaction;
