import React, { useState, useEffect } from 'react';

const LoanTable = () => {
  const [loans, setLoans] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedLoan, setEditedLoan] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch loan data
  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await fetch('http://localhost:5001/loansall');
        const data = await response.json();
        // Format Start_Date and End_Date to 'YYYY-MM-DD'
        const formattedData = data.map((loan) => ({
          ...loan,
          Start_Date: loan.Start_Date ? loan.Start_Date.split('T')[0] : '',
          End_Date: loan.End_Date ? loan.End_Date.split('T')[0] : '',
        }));
        setLoans(formattedData);
      } catch (error) {
        setErrorMessage('An error occurred while fetching loan data.');
      }
    };

    fetchLoans();
  }, []);

  // Handle inline edit change
  const handleEditChange = (e, fieldName) => {
    const value = e.target.value;
    setEditedLoan((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  // Toggle editing mode
  const handleEditClick = (loan) => {
    setIsEditing(true);
    setEditedLoan(loan);
  };

  // Save edited loan data
  const handleSave = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const formattedLoan = { ...editedLoan };
      // Format Start_Date and End_Date to 'YYYY-MM-DD' before sending
      if (formattedLoan.Start_Date) {
        formattedLoan.Start_Date = new Date(formattedLoan.Start_Date).toISOString().split('T')[0];
      }
      if (formattedLoan.End_Date) {
        formattedLoan.End_Date = new Date(formattedLoan.End_Date).toISOString().split('T')[0];
      }

      const response = await fetch(`http://localhost:5001/loans/${editedLoan.Loan_ID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedLoan),
      });

      if (response.ok) {
        setSuccessMessage('Loan data updated successfully!');
        setIsEditing(false);
        const updatedLoans = loans.map((loan) =>
          loan.Loan_ID === editedLoan.Loan_ID ? editedLoan : loan
        );
        setLoans(updatedLoans);
      } else {
        setErrorMessage('Failed to update loan data.');
      }
    } catch (error) {
      setErrorMessage('An error occurred while updating loan data.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Loan Data</h1>
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      <table className="min-w-full bg-white border border-gray-300 rounded-lg">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Loan ID</th>
            <th className="px-4 py-2 border">User ID</th>
            <th className="px-4 py-2 border">Loan Type ID</th>
            <th className="px-4 py-2 border">Amount</th>
            <th className="px-4 py-2 border">Interest Rate</th>
            <th className="px-4 py-2 border">Start Date</th>
            <th className="px-4 py-2 border">End Date</th>
            <th className="px-4 py-2 border">Status</th>
            <th className="px-4 py-2 border">Collateral</th>
            <th className="px-4 py-2 border">Repayment Term</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loans.map((loan) => (
            <tr key={loan.Loan_ID}>
              <td className="px-4 py-2 border">{loan.Loan_ID}</td>
              <td className="px-4 py-2 border">
                {isEditing && editedLoan.Loan_ID === loan.Loan_ID ? (
                  <input
                    type="number"
                    value={editedLoan.User_ID}
                    onChange={(e) => handleEditChange(e, 'User_ID')}
                    className="w-full px-2 py-1 border rounded"
                  />
                ) : (
                  loan.User_ID
                )}
              </td>
              <td className="px-4 py-2 border">
                {isEditing && editedLoan.Loan_ID === loan.Loan_ID ? (
                  <input
                    type="number"
                    value={editedLoan.Loan_Type_ID}
                    onChange={(e) => handleEditChange(e, 'Loan_Type_ID')}
                    className="w-full px-2 py-1 border rounded"
                  />
                ) : (
                  loan.Loan_Type_ID
                )}
              </td>
              <td className="px-4 py-2 border">
                {isEditing && editedLoan.Loan_ID === loan.Loan_ID ? (
                  <input
                    type="number"
                    value={editedLoan.Amount}
                    onChange={(e) => handleEditChange(e, 'Amount')}
                    className="w-full px-2 py-1 border rounded"
                  />
                ) : (
                  loan.Amount
                )}
              </td>
              <td className="px-4 py-2 border">
                {isEditing && editedLoan.Loan_ID === loan.Loan_ID ? (
                  <input
                    type="number"
                    value={editedLoan.Interest_Rate}
                    onChange={(e) => handleEditChange(e, 'Interest_Rate')}
                    className="w-full px-2 py-1 border rounded"
                  />
                ) : (
                  loan.Interest_Rate
                )}
              </td>
              <td className="px-4 py-2 border">
                {isEditing && editedLoan.Loan_ID === loan.Loan_ID ? (
                  <input
                    type="date"
                    value={editedLoan.Start_Date}
                    onChange={(e) => handleEditChange(e, 'Start_Date')}
                    className="w-full px-2 py-1 border rounded"
                  />
                ) : (
                  loan.Start_Date
                )}
              </td>
              <td className="px-4 py-2 border">
                {isEditing && editedLoan.Loan_ID === loan.Loan_ID ? (
                  <input
                    type="date"
                    value={editedLoan.End_Date}
                    onChange={(e) => handleEditChange(e, 'End_Date')}
                    className="w-full px-2 py-1 border rounded"
                  />
                ) : (
                  loan.End_Date
                )}
              </td>
              <td className="px-4 py-2 border">
                {isEditing && editedLoan.Loan_ID === loan.Loan_ID ? (
                  <input
                    type="text"
                    value={editedLoan.Status}
                    onChange={(e) => handleEditChange(e, 'Status')}
                    className="w-full px-2 py-1 border rounded"
                  />
                ) : (
                  loan.Status
                )}
              </td>
              <td className="px-4 py-2 border">
                {isEditing && editedLoan.Loan_ID === loan.Loan_ID ? (
                  <input
                    type="text"
                    value={editedLoan.Collateral}
                    onChange={(e) => handleEditChange(e, 'Collateral')}
                    className="w-full px-2 py-1 border rounded"
                  />
                ) : (
                  loan.Collateral
                )}
              </td>
              <td className="px-4 py-2 border">
                {isEditing && editedLoan.Loan_ID === loan.Loan_ID ? (
                  <input
                    type="text"
                    value={editedLoan.Repayment_Term}
                    onChange={(e) => handleEditChange(e, 'Repayment_Term')}
                    className="w-full px-2 py-1 border rounded"
                  />
                ) : (
                  loan.Repayment_Term
                )}
              </td>
              <td className="px-4 py-2 border">
                {isEditing && editedLoan.Loan_ID === loan.Loan_ID ? (
                  <button
                    onClick={handleSave}
                    className="bg-blue-500 text-white py-1 px-3 rounded"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEditClick(loan)}
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

export default LoanTable;
