import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CustomerCards = () => {
    const [cards, setCards] = useState([]);
    const userId = localStorage.getItem('user_id'); // Retrieve the user ID from localStorage

    useEffect(() => {
        if (userId) {
            fetchCards(userId);
        }
    }, [userId]);

    const fetchCards = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:5001/cards/${userId}`);
            setCards(response.data);
        } catch (error) {
            console.error('Error fetching cards:', error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">Cards</h2>
            {cards.length === 0 ? (
                <p className="text-center text-gray-500">No data available</p>
            ) : (
                <div className="overflow-auto">
                    <table className="min-w-full table-fixed bg-white">
                        <thead>
                            <tr>
                                <th className="w-1/12 py-2 px-4 bg-gray-200 text-gray-600 border-b border-gray-200">Card ID</th>
                                <th className="w-1/12 py-2 px-4 bg-gray-200 text-gray-600 border-b border-gray-200">User ID</th>
                                <th className="w-1/12 py-2 px-4 bg-gray-200 text-gray-600 border-b border-gray-200">Card Number</th>
                                <th className="w-1/12 py-2 px-4 bg-gray-200 text-gray-600 border-b border-gray-200">Card Type</th>
                                <th className="w-1/12 py-2 px-4 bg-gray-200 text-gray-600 border-b border-gray-200">Expiry Date</th>
                                <th className="w-1/12 py-2 px-4 bg-gray-200 text-gray-600 border-b border-gray-200">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cards.map((card) => (
                                <tr key={card.Card_ID}>
                                    <td className="py-2 px-4 border-b border-gray-200">{card.Card_ID}</td>
                                    <td className="py-2 px-4 border-b border-gray-200">{card.User_ID}</td>
                                    <td className="py-2 px-4 border-b border-gray-200">{card.Card_Number}</td>
                                    <td className="py-2 px-4 border-b border-gray-200">{card.Card_Type}</td>
                                    <td className="py-2 px-4 border-b border-gray-200">{new Date(card.Expiry_Date).toLocaleDateString()}</td>
                                    <td className="py-2 px-4 border-b border-gray-200">{card.Status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default CustomerCards;
