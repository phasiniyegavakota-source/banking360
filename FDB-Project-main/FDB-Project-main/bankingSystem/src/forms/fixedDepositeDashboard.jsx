import React, { useState, useEffect } from 'react';

const DepositTable = () => {
  const [deposits, setDeposits] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedDeposit, setEditedDeposit] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch deposits data
  useEffect(() => {
    const fetchDeposits = async () => {
      try {
        const response = await fetch('http://localhost:5001/fixedDepositsall');
        const data = await response.json();
        setDeposits(data);
      } catch (error) {
        setErrorMessage('An error occurred while fetching deposits.');
      }
    };

    fetchDeposits();
  }, []);

  // Handle inline edit change
  const handleEditChange = (e, depositId, fieldName) => {
    const value = e.target.value;
    setEditedDeposit((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  // Toggle editing mode
  const handleEditClick = (deposit) => {
    setIsEditing(true);
    setEditedDeposit(deposit);
  };

  // Save edited deposit data
  const handleSave = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    // Correct date format
    const startDate = editedDeposit.Start_Date.split('T')[0]; // Get only the date part
    const endDate = editedDeposit.End_Date.split('T')[0]; // Get only the date part

    const updatedDeposit = {
      ...editedDeposit,
      Start_Date: startDate,
      End_Date: endDate,
    };

    try {
      const response = await fetch(`http://localhost:5001/fixedDeposits/${editedDeposit.Deposit_ID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedDeposit),
      });

      if (response.ok) {
        setSuccessMessage('Deposit data updated successfully!');
        setIsEditing(false);
        const updatedDeposits = deposits.map((deposit) =>
          deposit.Deposit_ID === editedDeposit.Deposit_ID ? updatedDeposit : deposit
        );
        setDeposits(updatedDeposits);
      } else {
        setErrorMessage('Failed to update deposit data.');
      }
    } catch (error) {
      setErrorMessage('An error occurred while updating deposit data.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Deposit Data</h1>
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      <table className="min-w-full bg-white border border-gray-300 rounded-lg">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Deposit ID</th>
            <th className="px-4 py-2 border">User ID</th>
            <th className="px-4 py-2 border">Amount</th>
            <th className="px-4 py-2 border">Interest Rate</th>
            <th className="px-4 py-2 border">Start Date</th>
            <th className="px-4 py-2 border">End Date</th>
            <th className="px-4 py-2 border">Status</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {deposits.map((deposit) => (
            <tr key={deposit.Deposit_ID}>
              <td className="px-4 py-2 border">{deposit.Deposit_ID}</td>
              <td className="px-4 py-2 border">{deposit.User_ID}</td>
              {/* Editable fields */}
              <td className="px-4 py-2 border">
                {isEditing && editedDeposit.Deposit_ID === deposit.Deposit_ID ? (
                  <input
                    type="number"
                    value={editedDeposit.Amount}
                    onChange={(e) => handleEditChange(e, deposit.Deposit_ID, 'Amount')}
                    className="w-full px-2 py-1 border rounded appearance-none"
                    min="0" // Adding min value to avoid negative values
                  />
                ) : (
                  deposit.Amount
                )}
              </td>
              <td className="px-4 py-2 border">
                {isEditing && editedDeposit.Deposit_ID === deposit.Deposit_ID ? (
                  <input
                    type="number"
                    value={editedDeposit.Interest_Rate}
                    onChange={(e) => handleEditChange(e, deposit.Deposit_ID, 'Interest_Rate')}
                    className="w-full px-2 py-1 border rounded appearance-none"
                    min="0" // Adding min value to avoid negative interest rates
                  />
                ) : (
                  deposit.Interest_Rate
                )}
              </td>
              <td className="px-4 py-2 border">{deposit.Start_Date}</td>
              <td className="px-4 py-2 border">{deposit.End_Date}</td>
              <td className="px-4 py-2 border">
                {isEditing && editedDeposit.Deposit_ID === deposit.Deposit_ID ? (
                  <select
                    value={editedDeposit.Status}
                    onChange={(e) => handleEditChange(e, deposit.Deposit_ID, 'Status')}
                    className="w-full px-2 py-1 border rounded"
                  >
                    <option value="Active">Active</option>
                    <option value="Closed">Closed</option>
                    <option value="Pending">Pending</option>
                  </select>
                ) : (
                  deposit.Status
                )}
              </td>
              <td className="px-4 py-2 border">
                {isEditing && editedDeposit.Deposit_ID === deposit.Deposit_ID ? (
                  <button
                    onClick={handleSave}
                    className="bg-blue-500 text-white py-1 px-3 rounded"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEditClick(deposit)}
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

export default DepositTable;
