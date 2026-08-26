import React, { useState, useEffect } from 'react';

const SalaryTable = () => {
  const [salaries, setSalaries] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedSalary, setEditedSalary] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch salary data
  useEffect(() => {
    const fetchSalaries = async () => {
      try {
        const response = await fetch('http://localhost:5001/employeeSalaries');
        const data = await response.json();
        const formattedData = data.map((salary) => ({
          ...salary,
          Payment_Date: salary.Payment_Date ? salary.Payment_Date.split('T')[0] : '',
        }));
        setSalaries(formattedData);
      } catch (error) {
        setErrorMessage('An error occurred while fetching salary data.');
      }
    };

    fetchSalaries();
  }, []);

  // Handle inline edit change
  const handleEditChange = (e, fieldName) => {
    const value = e.target.value;
    setEditedSalary((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  // Toggle editing mode
  const handleEditClick = (salary) => {
    setIsEditing(true);
    setEditedSalary(salary);
  };

  // Save edited salary data
  const handleSave = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const formattedSalary = { ...editedSalary };
      if (formattedSalary.Payment_Date) {
        formattedSalary.Payment_Date = new Date(formattedSalary.Payment_Date).toISOString().split('T')[0];
      }

      const response = await fetch(`http://localhost:5001/employeeSalaries/${editedSalary.Salary_ID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedSalary),
      });

      if (response.ok) {
        setSuccessMessage('Salary data updated successfully!');
        setIsEditing(false);
        const updatedSalaries = salaries.map((salary) =>
          salary.Salary_ID === editedSalary.Salary_ID ? editedSalary : salary
        );
        setSalaries(updatedSalaries);
      } else {
        setErrorMessage('Failed to update salary data.');
      }
    } catch (error) {
      setErrorMessage('An error occurred while updating salary data.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Salary Data</h1>
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      <table className="min-w-full bg-white border border-gray-300 rounded-lg">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Salary ID</th>
            <th className="px-4 py-2 border">Employee ID</th>
            <th className="px-4 py-2 border">Salary Amount</th>
            <th className="px-4 py-2 border">Payment Date</th>
            <th className="px-4 py-2 border">Bonus</th>
            <th className="px-4 py-2 border">Deductions</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {salaries.map((salary) => (
            <tr key={salary.Salary_ID}>
              <td className="px-4 py-2 border">{salary.Salary_ID}</td>
              <td className="px-4 py-2 border">
                {isEditing && editedSalary.Salary_ID === salary.Salary_ID ? (
                  <input
                    type="number"
                    value={editedSalary.Employee_ID}
                    onChange={(e) => handleEditChange(e, 'Employee_ID')}
                    className="w-full px-2 py-1 border rounded"
                  />
                ) : (
                  salary.Employee_ID
                )}
              </td>
              <td className="px-4 py-2 border">
                {isEditing && editedSalary.Salary_ID === salary.Salary_ID ? (
                  <input
                    type="number"
                    value={editedSalary.Salary_Amount}
                    onChange={(e) => handleEditChange(e, 'Salary_Amount')}
                    className="w-full px-2 py-1 border rounded"
                  />
                ) : (
                  salary.Salary_Amount
                )}
              </td>
              <td className="px-4 py-2 border">
                {isEditing && editedSalary.Salary_ID === salary.Salary_ID ? (
                  <input
                    type="date"
                    value={editedSalary.Payment_Date}
                    onChange={(e) => handleEditChange(e, 'Payment_Date')}
                    className="w-full px-2 py-1 border rounded"
                  />
                ) : (
                  salary.Payment_Date
                )}
              </td>
              <td className="px-4 py-2 border">
                {isEditing && editedSalary.Salary_ID === salary.Salary_ID ? (
                  <input
                    type="number"
                    value={editedSalary.Bonus}
                    onChange={(e) => handleEditChange(e, 'Bonus')}
                    className="w-full px-2 py-1 border rounded"
                  />
                ) : (
                  salary.Bonus
                )}
              </td>
              <td className="px-4 py-2 border">
                {isEditing && editedSalary.Salary_ID === salary.Salary_ID ? (
                  <input
                    type="number"
                    value={editedSalary.Deductions}
                    onChange={(e) => handleEditChange(e, 'Deductions')}
                    className="w-full px-2 py-1 border rounded"
                  />
                ) : (
                  salary.Deductions
                )}
              </td>
              <td className="px-4 py-2 border">
                {isEditing && editedSalary.Salary_ID === salary.Salary_ID ? (
                  <button
                    onClick={handleSave}
                    className="bg-blue-500 text-white py-1 px-3 rounded"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEditClick(salary)}
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

export default SalaryTable;
