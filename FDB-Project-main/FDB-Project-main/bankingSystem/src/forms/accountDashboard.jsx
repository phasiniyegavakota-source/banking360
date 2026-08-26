
import React, { useState, useEffect } from 'react';

const AccountTable = () => {
  const [accounts, setAccounts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedAccount, setEditedAccount] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch accounts data
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await fetch('http://localhost:5001/accountsall');
        const data = await response.json();
        // Format Open_Date without the time zone
        const formattedData = data.map(account => ({
          ...account,
          Open_Date: account.Open_Date ? account.Open_Date.split('T')[0] : '',
        }));
        setAccounts(formattedData);
      } catch (error) {
        setErrorMessage('An error occurred while fetching account data.');
      }
    };

    fetchAccounts();
  }, []);

  // Handle inline edit change
  const handleEditChange = (e, accountId, fieldName) => {
    const value = e.target.value;
    setEditedAccount((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  // Toggle editing mode
  const handleEditClick = (account) => {
    setIsEditing(true);
    setEditedAccount(account);
  };

  // Save edited account data
  const handleSave = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const response = await fetch(`http://localhost:5001/accounts/${editedAccount.Account_ID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedAccount),
      });

      if (response.ok) {
        setSuccessMessage('Account data updated successfully!');
        setIsEditing(false);
        const updatedAccounts = accounts.map((account) =>
          account.Account_ID === editedAccount.Account_ID ? editedAccount : account
        );
        setAccounts(updatedAccounts);
      } else {
        setErrorMessage('Failed to update account data.');
      }
    } catch (error) {
      setErrorMessage('An error occurred while updating account data.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Account Data</h1>
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      <table className="min-w-full bg-white border border-gray-300 rounded-lg">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Account ID</th>
            <th className="px-4 py-2 border">User ID</th>
            <th className="px-4 py-2 border">Account Type</th>
            <th className="px-4 py-2 border">Balance</th>
            <th className="px-4 py-2 border">Open Date</th>
            <th className="px-4 py-2 border">Status</th>
            <th className="px-4 py-2 border">Interest Rate</th>
            <th className="px-4 py-2 border">Overdraft Limit</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account) => (
            <tr key={account.Account_ID}>
              <td className="px-4 py-2 border">{account.Account_ID}</td>
              <td className="px-4 py-2 border">{account.User_ID}</td>
              {/* Editable Account Type */}
              <td className="px-4 py-2 border">
                {isEditing && editedAccount.Account_ID === account.Account_ID ? (
                  <input
                    type="text"
                    value={editedAccount.Account_Type}
                    onChange={(e) => handleEditChange(e, account.Account_ID, 'Account_Type')}
                    className="w-full px-2 py-1 border rounded"
                  />
                ) : (
                  account.Account_Type
                )}
              </td>
              {/* Editable Balance */}
              <td className="px-4 py-2 border">
                {isEditing && editedAccount.Account_ID === account.Account_ID ? (
                  <input
                    type="number"
                    value={editedAccount.Balance}
                    onChange={(e) => handleEditChange(e, account.Account_ID, 'Balance')}
                    className="w-full px-2 py-1 border rounded"
                  />
                ) : (
                  account.Balance
                )}
              </td>
              {/* Non-editable Open Date */}
              <td className="px-4 py-2 border">
                {account.Open_Date}
              </td>
              {/* Editable Status */}
              <td className="px-4 py-2 border">
                {isEditing && editedAccount.Account_ID === account.Account_ID ? (
                  <select
                    value={editedAccount.Status}
                    onChange={(e) => handleEditChange(e, account.Account_ID, 'Status')}
                    className="w-full px-2 py-1 border rounded"
                  >
                    <option value="Active">Active</option>
                    <option value="Closed">Closed</option>
                  </select>
                ) : (
                  account.Status
                )}
              </td>
              {/* Editable Interest Rate */}
              <td className="px-4 py-2 border">
                {isEditing && editedAccount.Account_ID === account.Account_ID ? (
                  <input
                    type="number"
                    step="0.01"
                    value={editedAccount.Interest_Rate}
                    onChange={(e) => handleEditChange(e, account.Account_ID, 'Interest_Rate')}
                    className="w-full px-2 py-1 border rounded"
                  />
                ) : (
                  account.Interest_Rate
                )}
              </td>
              {/* Editable Overdraft Limit */}
              <td className="px-4 py-2 border">
                {isEditing && editedAccount.Account_ID === account.Account_ID ? (
                  <input
                    type="number"
                    step="0.01"
                    value={editedAccount.Overdraft_Limit}
                    onChange={(e) => handleEditChange(e, account.Account_ID, 'Overdraft_Limit')}
                    className="w-full px-2 py-1 border rounded"
                  />
                ) : (
                  account.Overdraft_Limit
                )}
              </td>
              <td className="px-4 py-2 border">
                {isEditing && editedAccount.Account_ID === account.Account_ID ? (
                  <button
                    onClick={handleSave}
                    className="bg-blue-500 text-white py-1 px-3 rounded"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEditClick(account)}
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

export default AccountTable;
