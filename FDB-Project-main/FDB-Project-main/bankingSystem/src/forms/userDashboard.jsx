
import React, { useState, useEffect } from 'react';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch users data
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5001/users');
        const data = await response.json();
        // Format date without the time zone
        const formattedData = data.map(user => ({
          ...user,
          Date_of_Birth: user.Date_of_Birth ? user.Date_of_Birth.split('T')[0] : '',
        }));
        setUsers(formattedData);
      } catch (error) {
        setErrorMessage('An error occurred while fetching users.');
      }
    };

    fetchUsers();
  }, []);

  // Handle inline edit change
  const handleEditChange = (e, userId, fieldName) => {
    const value = e.target.value;
    setEditedUser((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  // Toggle editing mode
  const handleEditClick = (user) => {
    setIsEditing(true);
    setEditedUser(user);
  };

  // Save edited user data
  const handleSave = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    try {
      // Format date as YYYY-MM-DD before sending to the backend
      const formattedUser = { ...editedUser };
      
      // Ensure Date_of_Birth is formatted properly (YYYY-MM-DD)
      if (formattedUser.Date_of_Birth) {
        formattedUser.Date_of_Birth = new Date(formattedUser.Date_of_Birth).toISOString().split('T')[0];
      }

      // Ensure Date_Joined is formatted properly (YYYY-MM-DD)
      if (formattedUser.Date_Joined) {
        formattedUser.Date_Joined = new Date(formattedUser.Date_Joined).toISOString().split('T')[0];
      }

      const response = await fetch(`http://localhost:5001/users/${editedUser.User_ID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedUser),
      });

      if (response.ok) {
        setSuccessMessage('User data updated successfully!');
        setIsEditing(false);
        const updatedUsers = users.map((user) =>
          user.User_ID === editedUser.User_ID ? editedUser : user
        );
        setUsers(updatedUsers);
      } else {
        setErrorMessage('Failed to update user data.');
      }
    } catch (error) {
      setErrorMessage('An error occurred while updating user data.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">User Data</h1>
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      <table className="min-w-full bg-white border border-gray-300 rounded-lg">
        <thead>
          <tr>
            <th className="px-4 py-2 border">User ID</th>
            <th className="px-4 py-2 border">Username</th>
            <th className="px-4 py-2 border">Email</th>
            <th className="px-4 py-2 border">Phone</th>
            <th className="px-4 py-2 border">Occupation</th>
            <th className="px-4 py-2 border">Marital Status</th>
            <th className="px-4 py-2 border">Date of Birth</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.User_ID}>
              <td className="px-4 py-2 border">{user.User_ID}</td>
              {/* Editable fields */}
              <td className="px-4 py-2 border">
                {isEditing && editedUser.User_ID === user.User_ID ? (
                  <input
                    type="text"
                    value={editedUser.Username}
                    onChange={(e) => handleEditChange(e, user.User_ID, 'Username')}
                    className="w-full px-2 py-1 border rounded"
                  />
                ) : (
                  user.Username
                )}
              </td>
              <td className="px-4 py-2 border">
                {isEditing && editedUser.User_ID === user.User_ID ? (
                  <input
                    type="email"
                    value={editedUser.Email}
                    onChange={(e) => handleEditChange(e, user.User_ID, 'Email')}
                    className="w-full px-2 py-1 border rounded"
                  />
                ) : (
                  user.Email
                )}
              </td>
              <td className="px-4 py-2 border">
                {isEditing && editedUser.User_ID === user.User_ID ? (
                  <input
                    type="text"
                    value={editedUser.Phone}
                    onChange={(e) => handleEditChange(e, user.User_ID, 'Phone')}
                    className="w-full px-2 py-1 border rounded"
                  />
                ) : (
                  user.Phone
                )}
              </td>
              <td className="px-4 py-2 border">
                {isEditing && editedUser.User_ID === user.User_ID ? (
                  <input
                    type="text"
                    value={editedUser.Occupation}
                    onChange={(e) => handleEditChange(e, user.User_ID, 'Occupation')}
                    className="w-full px-2 py-1 border rounded"
                  />
                ) : (
                  user.Occupation
                )}
              </td>
              <td className="px-4 py-2 border">
                {isEditing && editedUser.User_ID === user.User_ID ? (
                  <select
                    value={editedUser.Marital_Status}
                    onChange={(e) => handleEditChange(e, user.User_ID, 'Marital_Status')}
                    className="w-full px-2 py-1 border rounded"
                  >
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                    <option value="Divorced">Divorced</option>
                  </select>
                ) : (
                  user.Marital_Status
                )}
              </td>
              {/* Date of Birth */}
              <td className="px-4 py-2 border">
                {isEditing && editedUser.User_ID === user.User_ID ? (
                  <input
                    type="date"
                    value={editedUser.Date_of_Birth}  // Date is now in 'YYYY-MM-DD' format
                    onChange={(e) => handleEditChange(e, user.User_ID, 'Date_of_Birth')}
                    className="w-full px-2 py-1 border rounded"
                  />
                ) : (
                  user.Date_of_Birth
                )}
              </td>
              <td className="px-4 py-2 border">
                {isEditing && editedUser.User_ID === user.User_ID ? (
                  <button
                    onClick={handleSave}
                    className="bg-blue-500 text-white py-1 px-3 rounded"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEditClick(user)}
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

export default UserTable;

