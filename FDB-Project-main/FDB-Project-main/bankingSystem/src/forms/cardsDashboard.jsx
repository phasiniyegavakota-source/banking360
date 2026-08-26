import React, { useState, useEffect } from 'react';

const CardTable = () => {
  const [cards, setCards] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedCard, setEditedCard] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch cards data
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch('http://localhost:5001/cardsall');
        const data = await response.json();
        // Format dates in YYYY-MM-DD format
        const formattedData = data.map((card) => ({
          ...card,
          Expiry_Date: card.Expiry_Date ? card.Expiry_Date.split('T')[0] : '',
          Issue_Date: card.Issue_Date ? card.Issue_Date.split('T')[0] : '',
        }));
        setCards(formattedData);
      } catch (error) {
        setErrorMessage('An error occurred while fetching cards.');
      }
    };

    fetchCards();
  }, []);

  // Handle inline edit change
  const handleEditChange = (e, cardId, fieldName) => {
    const value = e.target.value;
    setEditedCard((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  // Toggle editing mode
  const handleEditClick = (card) => {
    setIsEditing(true);
    setEditedCard(card);
  };

  // Save edited card data
  const handleSave = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const formattedCard = { ...editedCard };

      // Ensure Expiry_Date is properly formatted (YYYY-MM-DD)
      if (formattedCard.Expiry_Date) {
        formattedCard.Expiry_Date = new Date(formattedCard.Expiry_Date).toISOString().split('T')[0];
      }

      const response = await fetch(`http://localhost:5001/cards/${editedCard.Card_ID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedCard),
      });

      if (response.ok) {
        setSuccessMessage('Card details updated successfully!');
        setIsEditing(false);
        const updatedCards = cards.map((card) =>
          card.Card_ID === editedCard.Card_ID ? editedCard : card
        );
        setCards(updatedCards);
      } else {
        setErrorMessage('Failed to update card details.');
      }
    } catch (error) {
      setErrorMessage('An error occurred while updating card details.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Card Details</h1>
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      <table className="min-w-full bg-white border border-gray-300 rounded-lg">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Card ID</th>
            <th className="px-4 py-2 border">User ID</th>
            <th className="px-4 py-2 border">Card Type</th>
            <th className="px-4 py-2 border">Expiry Date</th>
            <th className="px-4 py-2 border">Card Number</th>
            <th className="px-4 py-2 border">CVV</th>
            <th className="px-4 py-2 border">Issue Date</th>
            <th className="px-4 py-2 border">Status</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {cards.map((card) => (
            <tr key={card.Card_ID}>
              <td className="px-4 py-2 border">{card.Card_ID}</td>
              <td className="px-4 py-2 border">{card.User_ID}</td>
              {/* Editable Card Type */}
              <td className="px-4 py-2 border">
                {isEditing && editedCard.Card_ID === card.Card_ID ? (
                  <input
                    type="text"
                    value={editedCard.Card_Type}
                    onChange={(e) => handleEditChange(e, card.Card_ID, 'Card_Type')}
                    className="w-full px-2 py-1 border rounded"
                  />
                ) : (
                  card.Card_Type
                )}
              </td>
              {/* Editable Expiry Date */}
              <td className="px-4 py-2 border">
                {isEditing && editedCard.Card_ID === card.Card_ID ? (
                  <input
                    type="date"
                    value={editedCard.Expiry_Date}
                    onChange={(e) => handleEditChange(e, card.Card_ID, 'Expiry_Date')}
                    className="w-full px-2 py-1 border rounded"
                  />
                ) : (
                  card.Expiry_Date
                )}
              </td>
              <td className="px-4 py-2 border">{card.Card_Number}</td>
              <td className="px-4 py-2 border">{card.CVV}</td>
              <td className="px-4 py-2 border">{card.Issue_Date}</td>
              {/* Editable Status */}
              <td className="px-4 py-2 border">
                {isEditing && editedCard.Card_ID === card.Card_ID ? (
                  <select
                    value={editedCard.Status}
                    onChange={(e) => handleEditChange(e, card.Card_ID, 'Status')}
                    className="w-full px-2 py-1 border rounded"
                  >
                    <option value="Active">Active</option>
                    <option value="Blocked">Blocked</option>
                    <option value="Expired">Expired</option>
                  </select>
                ) : (
                  card.Status
                )}
              </td>
              <td className="px-4 py-2 border">
                {isEditing && editedCard.Card_ID === card.Card_ID ? (
                  <button
                    onClick={handleSave}
                    className="bg-blue-500 text-white py-1 px-3 rounded"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEditClick(card)}
                    className="bg-yellow-500 text-white py-1 px-3 rounded"
                  >
                    Edit
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CardTable;
