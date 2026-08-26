import React, { useState, useEffect } from 'react';

const TransactionTypeTable = () => {
  const [transactionTypes, setTransactionTypes] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedType, setEditedType] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch transaction types data
  useEffect(() => {
    const fetchTransactionTypes = async () => {
      try {
        const response = await fetch('http://localhost:5001/transactionTypes');
        const data = await response.json();
        setTransactionTypes(data);
      } catch (error) {
        setErrorMessage('An error occurred while fetching transaction types.');
      }
    };

    fetchTransactionTypes();
  }, []);

  // Handle inline edit change
  const handleEditChange = (e, typeId, fieldName) => {
    const value = e.target.value;
    setEditedType((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  // Toggle editing mode
  const handleEditClick = (type) => {
    setIsEditing(true);
    setEditedType(type);
  };

  // Save edited type data
  const handleSave = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const response = await fetch(
        `http://localhost:5001/transactionTypes/${editedType.Transaction_Type_ID}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editedType),
        }
      );

      if (response.ok) {
        setSuccessMessage('Transaction type updated successfully!');
        setIsEditing(false);
        const updatedTransactionTypes = transactionTypes.map((type) =>
          type.Transaction_Type_ID === editedType.Transaction_Type_ID
            ? editedType
            : type
        );
        setTransactionTypes(updatedTransactionTypes);
      } else {
        setErrorMessage('Failed to update transaction type.');
      }
    } catch (error) {
      setErrorMessage('An error occurred while updating transaction type.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Transaction Types</h1>
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      <table className="min-w-full bg-white border border-gray-300 rounded-lg">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Transaction Type ID</th>
            <th className="px-4 py-2 border">Type Name</th>
            <th className="px-4 py-2 border">Description</th>
            <th className="px-4 py-2 border">Category</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactionTypes.map((type) => (
            <tr key={type.Transaction_Type_ID}>
              <td className="px-4 py-2 border">{type.Transaction_Type_ID}</td>
              {/* Editable Type Name */}
              <td className="px-4 py-2 border">
                {isEditing && editedType.Transaction_Type_ID === type.Transaction_Type_ID ? (
                  <input
                    type="text"
                    value={editedType.Type_Name}
                    onChange={(e) =>
                      handleEditChange(e, type.Transaction_Type_ID, 'Type_Name')
                    }
                    className="w-full px-2 py-1 border rounded"
                  />
                ) : (
                  type.Type_Name
                )}
              </td>
              {/* Editable Description */}
              <td className="px-4 py-2 border">
                {isEditing && editedType.Transaction_Type_ID === type.Transaction_Type_ID ? (
                  <textarea
                    value={editedType.Description}
                    onChange={(e) =>
                      handleEditChange(e, type.Transaction_Type_ID, 'Description')
                    }
                    className="w-full px-2 py-1 border rounded"
                  ></textarea>
                ) : (
                  type.Description
                )}
              </td>
              {/* Editable Category */}
              <td className="px-4 py-2 border">
                {isEditing && editedType.Transaction_Type_ID === type.Transaction_Type_ID ? (
                  <input
                    type="text"
                    value={editedType.Category}
                    onChange={(e) =>
                      handleEditChange(e, type.Transaction_Type_ID, 'Category')
                    }
                    className="w-full px-2 py-1 border rounded"
                  />
                ) : (
                  type.Category
                )}
              </td>
              <td className="px-4 py-2 border">
                {isEditing && editedType.Transaction_Type_ID === type.Transaction_Type_ID ? (
                  <button
                    onClick={handleSave}
                    className="bg-blue-500 text-white py-1 px-3 rounded"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEditClick(type)}
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

export default TransactionTypeTable;

