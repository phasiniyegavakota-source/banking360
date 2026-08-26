import React, { useState, useEffect } from 'react';

const OverdraftTable = () => {
  const [overdrafts, setOverdrafts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedOverdraft, setEditedOverdraft] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchOverdrafts = async () => {
      try {
        const response = await fetch('http://localhost:5001/overdraftsall');
        const data = await response.json();
        const formattedData = data.map(overdraft => ({
          ...overdraft,
          Start_Date: overdraft.Start_Date ? overdraft.Start_Date.split('T')[0] : '',
          End_Date: overdraft.End_Date ? overdraft.End_Date.split('T')[0] : '',
        }));
        setOverdrafts(formattedData);
      } catch (error) {
        console.error('Error fetching overdraft data:', error);
        setErrorMessage('An error occurred while fetching overdraft data.');
      }
    };

    fetchOverdrafts();
  }, []);

  const handleEditChange = (e, fieldName) => {
    const value = e.target.value;
    setEditedOverdraft(prev => ({ ...prev, [fieldName]: value }));
  };

  const handleEditClick = overdraft => {
    setIsEditing(true);
    setEditedOverdraft(overdraft);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const formattedOverdraft = { ...editedOverdraft };
      if (formattedOverdraft.Start_Date) {
        formattedOverdraft.Start_Date = new Date(formattedOverdraft.Start_Date).toISOString().split('T')[0];
      }
      if (formattedOverdraft.End_Date) {
        formattedOverdraft.End_Date = new Date(formattedOverdraft.End_Date).toISOString().split('T')[0];
      }

      // Ensure Limit is not NULL or empty
      if (!formattedOverdraft.Limit) {
        formattedOverdraft.Limit = 0; // Set a default value if Limit is empty or NULL
      }

      const response = await fetch(`http://localhost:5001/overdrafts/${editedOverdraft.Overdraft_ID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedOverdraft),
      });

      if (response.ok) {
        setSuccessMessage('Overdraft data updated successfully!');
        setIsEditing(false);
        const updatedOverdrafts = overdrafts.map(overdraft =>
          overdraft.Overdraft_ID === editedOverdraft.Overdraft_ID ? editedOverdraft : overdraft
        );
        setOverdrafts(updatedOverdrafts);
      } else {
        const errorData = await response.json();
        console.error('Error updating overdraft data:', errorData);
        setErrorMessage('Failed to update overdraft data.');
      }
    } catch (error) {
      console.error('Error updating overdraft data:', error);
      setErrorMessage('An error occurred while updating overdraft data.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Overdraft Data</h1>
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      <table className="min-w-full bg-white border border-gray-300 rounded-lg">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Overdraft ID</th>
            <th className="px-4 py-2 border">Account ID</th>
            <th className="px-4 py-2 border">Overdraft Limit</th>
            <th className="px-4 py-2 border">Start Date</th>
            <th className="px-4 py-2 border">End Date</th>
            <th className="px-4 py-2 border">Status</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {overdrafts.map((overdraft) => (
            <tr key={overdraft.Overdraft_ID}>
              <td className="px-4 py-2 border">{overdraft.Overdraft_ID}</td>
              <td className="px-4 py-2 border">
                {isEditing && editedOverdraft.Overdraft_ID === overdraft.Overdraft_ID ? (
                  <input
                    type="number"
                    value={editedOverdraft.Account_ID}
                    onChange={(e) => handleEditChange(e, 'Account_ID')}
                    className="w-full px-2 py-1 border rounded"
                  />
                ) : (
                  overdraft.Account_ID
                )}
              </td>
              <td className="px-4 py-2 border">
                {isEditing && editedOverdraft.Overdraft_ID === overdraft.Overdraft_ID ? (
                  <input
                    type="number"
                    value={editedOverdraft.Limit}
                    onChange={(e) => handleEditChange(e, 'Limit')}
                    className="w-full px-2 py-1 border rounded"
                  />
                ) : (
                  overdraft.Limit
                )}
              </td>
              <td className="px-4 py-2 border">
                {isEditing && editedOverdraft.Overdraft_ID === overdraft.Overdraft_ID ? (
                  <input
                    type="date"
                    value={editedOverdraft.Start_Date}
                    onChange={(e) => handleEditChange(e, 'Start_Date')}
                    disabled={true}
                    className="w-full px-2 py-1 border rounded"
                  />
                ) : (
                  overdraft.Start_Date
                )}
              </td>
              <td className="px-4 py-2 border">
                {isEditing && editedOverdraft.Overdraft_ID === overdraft.Overdraft_ID ? (
                  <input
                    type="date"
                    value={editedOverdraft.End_Date}
                    onChange={(e) => handleEditChange(e, 'End_Date')}
                    disabled={true}
                    className="w-full px-2 py-1 border rounded"
                  />
                ) : (
                  overdraft.End_Date
                )}
              </td>
              <td className="px-4 py-2 border">
                {isEditing && editedOverdraft.Overdraft_ID === overdraft.Overdraft_ID ? (
                  <select
                    value={editedOverdraft.Status}
                    onChange={(e) => handleEditChange(e, 'Status')}
                    className="w-full px-2 py-1 border rounded"
                  >
                    <option value="Active">Active</option>
                    <option value="Closed">Closed</option>
                  </select>
                ) : (
                  overdraft.Status
                )}
              </td>
              <td className="px-4 py-2 border">
                {isEditing && editedOverdraft.Overdraft_ID === overdraft.Overdraft_ID ? (
                  <button
                    onClick={handleSave}
                    className="bg-blue-500 text-white py-1 px-3 rounded"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEditClick(overdraft)}
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

export default OverdraftTable;
