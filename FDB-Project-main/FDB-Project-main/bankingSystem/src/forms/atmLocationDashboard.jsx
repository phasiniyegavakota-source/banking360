import React, { useState, useEffect } from 'react';

const ATMTable = () => {
  const [atms, setATMs] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedATM, setEditedATM] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch ATM data
  useEffect(() => {
    const fetchATMs = async () => {
      try {
        const response = await fetch('http://localhost:5001/atms');
        const data = await response.json();
        // Format dates in YYYY-MM-DD format
        const formattedData = data.map((atm) => ({
          ...atm,
          Installation_Date: atm.Installation_Date ? atm.Installation_Date.split('T')[0] : '',
        }));
        setATMs(formattedData);
      } catch (error) {
        setErrorMessage('An error occurred while fetching ATMs.');
      }
    };

    fetchATMs();
  }, []);

  // Handle inline edit change
  const handleEditChange = (e, atmId, fieldName) => {
    const value = e.target.value;
    setEditedATM((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  // Toggle editing mode
  const handleEditClick = (atm) => {
    setIsEditing(true);
    setEditedATM(atm);
  };

  // Save edited ATM data
  const handleSave = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const formattedATM = { ...editedATM };

      // Ensure Installation_Date is properly formatted (YYYY-MM-DD)
      if (formattedATM.Installation_Date) {
        formattedATM.Installation_Date = new Date(formattedATM.Installation_Date)
          .toISOString()
          .split('T')[0];
      }

      const response = await fetch(`http://localhost:5001/atms/${editedATM.ATM_ID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedATM),
      });

      if (response.ok) {
        setSuccessMessage('ATM details updated successfully!');
        setIsEditing(false);
        const updatedATMs = atms.map((atm) =>
          atm.ATM_ID === editedATM.ATM_ID ? editedATM : atm
        );
        setATMs(updatedATMs);
      } else {
        setErrorMessage('Failed to update ATM details.');
      }
    } catch (error) {
      setErrorMessage('An error occurred while updating ATM details.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">ATM Details</h1>
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      <table className="min-w-full bg-white border border-gray-300 rounded-lg">
        <thead>
          <tr>
            <th className="px-4 py-2 border">ATM ID</th>
            <th className="px-4 py-2 border">Location</th>
            <th className="px-4 py-2 border">Branch ID</th>
            <th className="px-4 py-2 border">Installation Date</th>
            <th className="px-4 py-2 border">Status</th>
            <th className="px-4 py-2 border">Maintenance Schedule</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {atms.map((atm) => (
            <tr key={atm.ATM_ID}>
              <td className="px-4 py-2 border">{atm.ATM_ID}</td>
              {/* Editable Location */}
              <td className="px-4 py-2 border">
                {isEditing && editedATM.ATM_ID === atm.ATM_ID ? (
                  <input
                    type="text"
                    value={editedATM.Location}
                    onChange={(e) => handleEditChange(e, atm.ATM_ID, 'Location')}
                    className="w-full px-2 py-1 border rounded"
                  />
                ) : (
                  atm.Location
                )}
              </td>
              <td className="px-4 py-2 border">{atm.Branch_ID}</td>
              {/* Editable Installation Date */}
              <td className="px-4 py-2 border">
                {isEditing && editedATM.ATM_ID === atm.ATM_ID ? (
                  <input
                    type="date"
                    value={editedATM.Installation_Date}
                    onChange={(e) => handleEditChange(e, atm.ATM_ID, 'Installation_Date')}
                    className="w-full px-2 py-1 border rounded"
                  />
                ) : (
                  atm.Installation_Date
                )}
              </td>
              {/* Editable Status */}
              <td className="px-4 py-2 border">
                {isEditing && editedATM.ATM_ID === atm.ATM_ID ? (
                  <select
                    value={editedATM.Status}
                    onChange={(e) => handleEditChange(e, atm.ATM_ID, 'Status')}
                    className="w-full px-2 py-1 border rounded"
                  >
                    <option value="Operational">Operational</option>
                    <option value="Out of Service">Out of Service</option>
                    <option value="Under Maintenance">Under Maintenance</option>
                  </select>
                ) : (
                  atm.Status
                )}
              </td>
              {/* Editable Maintenance Schedule */}
              <td className="px-4 py-2 border">
                {isEditing && editedATM.ATM_ID === atm.ATM_ID ? (
                  <input
                    type="text"
                    value={editedATM.Maintenance_Schedule}
                    onChange={(e) => handleEditChange(e, atm.ATM_ID, 'Maintenance_Schedule')}
                    className="w-full px-2 py-1 border rounded"
                  />
                ) : (
                  atm.Maintenance_Schedule
                )}
              </td>
              <td className="px-4 py-2 border">
                {isEditing && editedATM.ATM_ID === atm.ATM_ID ? (
                  <button
                    onClick={handleSave}
                    className="bg-blue-500 text-white py-1 px-3 rounded"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEditClick(atm)}
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

export default ATMTable;
