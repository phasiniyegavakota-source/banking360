import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CardForm = () => {
    const [card, setCard] = useState({
        cardID: '',
        customerID: '',
        cardType: 'Debit',
        expiryDate: '',
        cardNumber: '',
        cvv: '',
        issueDate: '',
        status: 'Active',
    });

    const [errors, setErrors] = useState({});
    const [cards, setCards] = useState([]);

    useEffect(() => {
        fetchCards();
    }, []);

    const fetchCards = async () => {
        try {
            const response = await axios.get('http://localhost:5001/cardsall');
            setCards(response.data);
        } catch (error) {
            console.error('Error fetching cards:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCard({ ...card, [name]: value });
    };

    const validate = () => {
        const newErrors = {};
        if (!card.cardNumber || card.cardNumber.length !== 16) newErrors.cardNumber = 'Card Number must be 16 digits';
        if (!card.cvv || card.cvv.length !== 3) newErrors.cvv = 'CVV must be 3 digits';
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
            await axios.post('http://localhost:5001/cards', card);
            alert('Card created successfully!');
            fetchCards();
            setCard({
                cardID: '',
                customerID: '',
                cardType: 'Debit',
                expiryDate: '',
                cardNumber: '',
                cvv: '',
                issueDate: '',
                status: 'Active',
            });
            setErrors({});
        } catch (error) {
            console.error('Error creating card:', error);
        }
    };

    const handleUpdate = async (id) => {
        const updatedCard = cards.find(c => c.Card_ID === id);
        try {
            await axios.put(`http://localhost:5001/cards/${id}`, updatedCard);
            alert('Card updated successfully!');
            fetchCards();
        } catch (error) {
            console.error('Error updating card:', error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-3xl font-bold mb-6 text-center">Create Card</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="cardType" className="block text-sm font-medium">Card Type</label>
                    <select
                        id="cardType"
                        name="cardType"
                        value={card.cardType}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="Debit">Debit</option>
                        <option value="Credit">Credit</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="cardNumber" className="block text-sm font-medium">Card Number</label>
                    <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        placeholder="Enter 16-digit card number"
                        value={card.cardNumber}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.cardNumber && <p className="text-red-500 text-sm mt-2">{errors.cardNumber}</p>}
                </div>
                <div>
                    <label htmlFor="cvv" className="block text-sm font-medium">CVV</label>
                    <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        placeholder="Enter 3-digit CVV"
                        value={card.cvv}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.cvv && <p className="text-red-500 text-sm mt-2">{errors.cvv}</p>}
                </div>
                <div>
                    <label htmlFor="expiryDate" className="block text-sm font-medium">Expiry Date</label>
                    <input
                        type="month"
                        id="expiryDate"
                        name="expiryDate"
                        value={card.expiryDate}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="issueDate" className="block text-sm font-medium">Issue Date</label>
                    <input
                        type="date"
                        id="issueDate"
                        name="issueDate"
                        value={card.issueDate}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div className="mt-6 text-center">
                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:ring-4 focus:ring-blue-200"
                    >
                        Create Card
                    </button>
                </div>
            </form>
            <h2 className="text-2xl font-bold mb-4 text-center">Cards</h2>
            <ul>
                {cards.map(card => (
                    <li key={card.Card_ID}>
                        {card.Card_Type} - {card.Card_Number}
                        <button onClick={() => handleUpdate(card.Card_ID)} className="ml-2 text-blue-500">Update</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CardForm;
