import React, { useState, useEffect } from 'react';

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedEmployee, setEditedEmployee] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch employee data
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('http://localhost:5001/employees');
        const data = await response.json();
        const formattedData = data.map((employee) => ({
          ...employee,
          Hire_Date: employee.Hire_Date ? employee.Hire_Date.split('T')[0] : '',
        }));
        setEmployees(formattedData);
      } catch (error) {
        setErrorMessage('An error occurred while fetching employee data.');
      }
    };

    fetchEmployees();
  }, []);

  // Handle inline edit change
  const handleEditChange = (e, fieldName) => {
    const value = e.target.value;
    setEditedEmployee((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  // Toggle editing mode
  const handleEditClick = (employee) => {
    setIsEditing(true);
    setEditedEmployee(employee);
  };

  // Save edited employee data
  const handleSave = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const formattedEmployee = { ...editedEmployee };
      if (formattedEmployee.Hire_Date) {
        formattedEmployee.Hire_Date = new Date(formattedEmployee.Hire_Date).toISOString().split('T')[0];
      }

      const response = await fetch(`http://localhost:5001/employees/${editedEmployee.Employee_ID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedEmployee),
      });

      if (response.ok) {
        setSuccessMessage('Employee data updated successfully!');
        setIsEditing(false);
        const updatedEmployees = employees.map((employee) =>
          employee.Employee_ID === editedEmployee.Employee_ID ? editedEmployee : employee
        );
        setEmployees(updatedEmployees);
      } else {
        setErrorMessage('Failed to update employee data.');
      }
    } catch (error) {
      setErrorMessage('An error occurred while updating employee data.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Employee Data</h1>
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      <table className="min-w-full bg-white border border-gray-300 rounded-lg">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Employee ID</th>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Position</th>
            <th className="px-4 py-2 border">Branch ID</th>
            <th className="px-4 py-2 border">Hire Date</th>
            <th className="px-4 py-2 border">Salary</th>
            <th className="px-4 py-2 border">Status</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.Employee_ID}>
              <td className="px-4 py-2 border">{employee.Employee_ID}</td>
              <td className="px-4 py-2 border">
                {isEditing && editedEmployee.Employee_ID === employee.Employee_ID ? (
                  <input
                    type="text"
                    value={editedEmployee.Name}
                    onChange={(e) => handleEditChange(e, 'Name')}
                    className="w-full px-2 py-1 border rounded"
                  />
                ) : (
                  employee.Name
                )}
              </td>
              <td className="px-4 py-2 border">
                {isEditing && editedEmployee.Employee_ID === employee.Employee_ID ? (
                  <input
                    type="text"
                    value={editedEmployee.Position}
                    onChange={(e) => handleEditChange(e, 'Position')}
                    className="w-full px-2 py-1 border rounded"
                  />
                ) : (
                  employee.Position
                )}
              </td>
              <td className="px-4 py-2 border">
                {isEditing && editedEmployee.Employee_ID === employee.Employee_ID ? (
                  <input
                    type="number"
                    value={editedEmployee.Branch_ID}
                    onChange={(e) => handleEditChange(e, 'Branch_ID')}
                    className="w-full px-2 py-1 border rounded"
                  />
                ) : (
                  employee.Branch_ID
                )}
              </td>
              <td className="px-4 py-2 border">
                {isEditing && editedEmployee.Employee_ID === employee.Employee_ID ? (
                  <input
                    type="date"
                    value={editedEmployee.Hire_Date}
                    onChange={(e) => handleEditChange(e, 'Hire_Date')}
                    className="w-full px-2 py-1 border rounded"
                  />
                ) : (
                  employee.Hire_Date
                )}
              </td>
              <td className="px-4 py-2 border">
                {isEditing && editedEmployee.Employee_ID === employee.Employee_ID ? (
                  <input
                    type="number"
                    value={editedEmployee.Salary}
                    onChange={(e) => handleEditChange(e, 'Salary')}
                    className="w-full px-2 py-1 border rounded"
                  />
                ) : (
                  employee.Salary
                )}
              </td>
              <td className="px-4 py-2 border">
                {isEditing && editedEmployee.Employee_ID === employee.Employee_ID ? (
                  <select
                    value={editedEmployee.Status}
                    onChange={(e) => handleEditChange(e, 'Status')}
                    className="w-full px-2 py-1 border rounded"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                ) : (
                  employee.Status
                )}
              </td>
              <td className="px-4 py-2 border">
                {isEditing && editedEmployee.Employee_ID === employee.Employee_ID ? (
                  <button
                    onClick={handleSave}
                    className="bg-blue-500 text-white py-1 px-3 rounded"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEditClick(employee)}
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

export default EmployeeTable;
