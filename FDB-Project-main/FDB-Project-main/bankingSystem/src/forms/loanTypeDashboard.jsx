import React, { useState, useEffect } from 'react';

const LoanTypeDashboard = () => {
  const [loanTypes, setLoanTypes] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedLoanType, setEditedLoanType] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch loan types data
  useEffect(() => {
    const fetchLoanTypes = async () => {
      try {
        const response = await fetch('http://localhost:5001/loanTypes');
        const data = await response.json();
        setLoanTypes(data);
      } catch (error) {
        setErrorMessage('An error occurred while fetching loan types.');
      }
    };

    fetchLoanTypes();
  }, []);

  // Handle inline edit change
  const handleEditChange = (e, loanTypeId, fieldName) => {
    const value = e.target.value;
    setEditedLoanType((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  // Toggle editing mode
  const handleEditClick = (loanType) => {
    setIsEditing(true);
    setEditedLoanType(loanType);
  };

  // Save edited loan type data
  const handleSave = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const response = await fetch(`http://localhost:5001/loanTypes/${editedLoanType.Loan_Type_ID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedLoanType),
      });

      if (response.ok) {
        setSuccessMessage('Loan type data updated successfully!');
        setIsEditing(false);
        const updatedLoanTypes = loanTypes.map((loanType) =>
          loanType.Loan_Type_ID === editedLoanType.Loan_Type_ID ? editedLoanType : loanType
        );
        setLoanTypes(updatedLoanTypes);
      } else {
        setErrorMessage('Failed to update loan type data.');
      }
    } catch (error) {
      setErrorMessage('An error occurred while updating loan type data.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Loan Type Data</h1>
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      <table className="min-w-full bg-white border border-gray-300 rounded-lg">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Loan Type ID</th>
            <th className="px-4 py-2 border">Type Name</th>
            <th className="px-4 py-2 border">Description</th>
            <th className="px-4 py-2 border">Maximum Amount</th>
            <th className="px-4 py-2 border">Minimum Amount</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loanTypes.map((loanType) => (
            <tr key={loanType.Loan_Type_ID}>
              <td className="px-4 py-2 border">{loanType.Loan_Type_ID}</td>
              {/* Editable fields */}
              <td className="px-4 py-2 border">
                {isEditing && editedLoanType.Loan_Type_ID === loanType.Loan_Type_ID ? (
                  <input
                    type="text"
                    value={editedLoanType.Type_Name}
                    onChange={(e) => handleEditChange(e, loanType.Loan_Type_ID, 'Type_Name')}
                    className="w-full px-2 py-1 border rounded"
                  />
                ) : (
                  loanType.Type_Name
                )}
              </td>
              <td className="px-4 py-2 border">
                {isEditing && editedLoanType.Loan_Type_ID === loanType.Loan_Type_ID ? (
                  <input
                    type="text"
                    value={editedLoanType.Description}
                    onChange={(e) => handleEditChange(e, loanType.Loan_Type_ID, 'Description')}
                    className="w-full px-2 py-1 border rounded"
                  />
                ) : (
                  loanType.Description
                )}
              </td>
              <td className="px-4 py-2 border">
                {isEditing && editedLoanType.Loan_Type_ID === loanType.Loan_Type_ID ? (
                  <input
                    type="number"
                    value={editedLoanType.Maximum_Amount}
                    onChange={(e) => handleEditChange(e, loanType.Loan_Type_ID, 'Maximum_Amount')}
                    className="w-full px-2 py-1 border rounded"
                  />
                ) : (
                  loanType.Maximum_Amount
                )}
              </td>
              <td className="px-4 py-2 border">
                {isEditing && editedLoanType.Loan_Type_ID === loanType.Loan_Type_ID ? (
                  <input
                    type="number"
                    value={editedLoanType.Minimum_Amount}
                    onChange={(e) => handleEditChange(e, loanType.Loan_Type_ID, 'Minimum_Amount')}
                    className="w-full px-2 py-1 border rounded"
                  />
                ) : (
                  loanType.Minimum_Amount
                )}
              </td>
              <td className="px-4 py-2 border">
                {isEditing && editedLoanType.Loan_Type_ID === loanType.Loan_Type_ID ? (
                  <button
                    onClick={handleSave}
                    className="bg-blue-500 text-white py-1 px-3 rounded"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEditClick(loanType)}
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

export default LoanTypeDashboard;
