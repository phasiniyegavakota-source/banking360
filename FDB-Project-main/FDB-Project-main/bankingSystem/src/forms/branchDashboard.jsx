import React, { useState, useEffect } from 'react';

const BranchTable = () => {
  const [branches, setBranches] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedBranch, setEditedBranch] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch branch data
  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await fetch('http://localhost:5001/branches');
        const data = await response.json();
        // Format Opening_Date to 'YYYY-MM-DD'
        const formattedData = data.map((branch) => ({
          ...branch,
          Opening_Date: branch.Opening_Date ? branch.Opening_Date.split('T')[0] : '',
        }));
        setBranches(formattedData);
      } catch (error) {
        setErrorMessage('An error occurred while fetching branch data.');
      }
    };

    fetchBranches();
  }, []);

  // Handle inline edit change
  const handleEditChange = (e, fieldName) => {
    const value = e.target.value;
    setEditedBranch((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  // Toggle editing mode
  const handleEditClick = (branch) => {
    setIsEditing(true);
    setEditedBranch(branch);
  };

  // Save edited branch data
  const handleSave = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const formattedBranch = { ...editedBranch };
      // Format Opening_Date to 'YYYY-MM-DD' before sending
      if (formattedBranch.Opening_Date) {
        formattedBranch.Opening_Date = new Date(formattedBranch.Opening_Date).toISOString().split('T')[0];
      }

      const response = await fetch(`http://localhost:5001/branches/${editedBranch.Branch_ID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedBranch),
      });

      if (response.ok) {
        setSuccessMessage('Branch data updated successfully!');
        setIsEditing(false);
        const updatedBranches = branches.map((branch) =>
          branch.Branch_ID === editedBranch.Branch_ID ? editedBranch : branch
        );
        setBranches(updatedBranches);
      } else {
        setErrorMessage('Failed to update branch data.');
      }
    } catch (error) {
      setErrorMessage('An error occurred while updating branch data.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Branch Data</h1>
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      <table className="min-w-full bg-white border border-gray-300 rounded-lg">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Branch ID</th>
            <th className="px-4 py-2 border">Branch Name</th>
            <th className="px-4 py-2 border">Address</th>
            <th className="px-4 py-2 border">Phone</th>
            <th className="px-4 py-2 border">Manager ID</th>
            <th className="px-4 py-2 border">Opening Date</th>
            <th className="px-4 py-2 border">Status</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {branches.map((branch) => (
            <tr key={branch.Branch_ID}>
              <td className="px-4 py-2 border">{branch.Branch_ID}</td>
              <td className="px-4 py-2 border">
                {isEditing && editedBranch.Branch_ID === branch.Branch_ID ? (
                  <input
                    type="text"
                    value={editedBranch.Branch_Name}
                    onChange={(e) => handleEditChange(e, 'Branch_Name')}
                    className="w-full px-2 py-1 border rounded"
                  />
                ) : (
                  branch.Branch_Name
                )}
              </td>
              <td className="px-4 py-2 border">
                {isEditing && editedBranch.Branch_ID === branch.Branch_ID ? (
                  <input
                    type="text"
                    value={editedBranch.Address}
                    onChange={(e) => handleEditChange(e, 'Address')}
                    className="w-full px-2 py-1 border rounded"
                  />
                ) : (
                  branch.Address
                )}
              </td>
              <td className="px-4 py-2 border">
                {isEditing && editedBranch.Branch_ID === branch.Branch_ID ? (
                  <input
                    type="text"
                    value={editedBranch.Phone}
                    onChange={(e) => handleEditChange(e, 'Phone')}
                    className="w-full px-2 py-1 border rounded"
                  />
                ) : (
                  branch.Phone
                )}
              </td>
              <td className="px-4 py-2 border">
                {isEditing && editedBranch.Branch_ID === branch.Branch_ID ? (
                  <input
                    type="number"
                    value={editedBranch.Manager_ID}
                    onChange={(e) => handleEditChange(e, 'Manager_ID')}
                    className="w-full px-2 py-1 border rounded"
                  />
                ) : (
                  branch.Manager_ID
                )}
              </td>
              <td className="px-4 py-2 border">
                {isEditing && editedBranch.Branch_ID === branch.Branch_ID ? (
                  <input
                    type="date"
                    value={editedBranch.Opening_Date}
                    onChange={(e) => handleEditChange(e, 'Opening_Date')}
                    className="w-full px-2 py-1 border rounded"
                  />
                ) : (
                  branch.Opening_Date
                )}
              </td>
              <td className="px-4 py-2 border">
                {isEditing && editedBranch.Branch_ID === branch.Branch_ID ? (
                  <select
                    value={editedBranch.Status}
                    onChange={(e) => handleEditChange(e, 'Status')}
                    className="w-full px-2 py-1 border rounded"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                ) : (
                  branch.Status
                )}
              </td>
              <td className="px-4 py-2 border">
                {isEditing && editedBranch.Branch_ID === branch.Branch_ID ? (
                  <button
                    onClick={handleSave}
                    className="bg-blue-500 text-white py-1 px-3 rounded"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEditClick(branch)}
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

export default BranchTable;
