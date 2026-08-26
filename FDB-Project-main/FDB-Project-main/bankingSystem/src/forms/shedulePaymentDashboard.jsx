import React, { useState, useEffect } from 'react';

const ScheduledPaymentsTable = () => {
  const [payments, setPayments] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedPayment, setEditedPayment] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch payments data
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await fetch('http://localhost:5001/scheduledPaymentsall');
        const data = await response.json();
        // Format Payment_Date to 'YYYY-MM-DD'
        const formattedData = data.map((payment) => ({
          ...payment,
          Payment_Date: payment.Payment_Date
            ? payment.Payment_Date.split('T')[0]
            : '',
        }));
        setPayments(formattedData);
      } catch (error) {
        setErrorMessage('An error occurred while fetching payment data.');
      }
    };

    fetchPayments();
  }, []);

  // Handle inline edit change
  const handleEditChange = (e, fieldName) => {
    const value = e.target.value;
    setEditedPayment((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  // Toggle editing mode
  const handleEditClick = (payment) => {
    setIsEditing(true);
    setEditedPayment(payment);
  };

  // Save edited payment data
  const handleSave = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const formattedPayment = { ...editedPayment };
      // Ensure Payment_Date is in 'YYYY-MM-DD' format
      if (formattedPayment.Payment_Date) {
        formattedPayment.Payment_Date = formattedPayment.Payment_Date.split(
          'T'
        )[0];
      }

      const response = await fetch(
        `http://localhost:5001/scheduledPayments/${editedPayment.Payment_ID}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formattedPayment),
        }
      );

      if (response.ok) {
        setSuccessMessage('Payment data updated successfully!');
        setIsEditing(false);
        const updatedPayments = payments.map((payment) =>
          payment.Payment_ID === editedPayment.Payment_ID
            ? editedPayment
            : payment
        );
        setPayments(updatedPayments);
      } else {
        setErrorMessage('Failed to update payment data.');
      }
    } catch (error) {
      setErrorMessage('An error occurred while updating payment data.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Scheduled Payments</h1>
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      <table className="min-w-full bg-white border border-gray-300 rounded-lg">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Payment ID</th>
            <th className="px-4 py-2 border">Account ID</th>
            <th className="px-4 py-2 border">Amount</th>
            <th className="px-4 py-2 border">Payment Date</th>
            <th className="px-4 py-2 border">Description</th>
            <th className="px-4 py-2 border">Status</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.Payment_ID}>
              <td className="px-4 py-2 border">{payment.Payment_ID}</td>
              <td className="px-4 py-2 border">
                {isEditing && editedPayment.Payment_ID === payment.Payment_ID ? (
                  <input
                    type="number"
                    value={editedPayment.Account_ID}
                    onChange={(e) => handleEditChange(e, 'Account_ID')}
                    className="w-full px-2 py-1 border rounded"
                  />
                ) : (
                  payment.Account_ID
                )}
              </td>
              <td className="px-4 py-2 border">
                {isEditing && editedPayment.Payment_ID === payment.Payment_ID ? (
                  <input
                    type="number"
                    value={editedPayment.Amount}
                    onChange={(e) => handleEditChange(e, 'Amount')}
                    className="w-full px-2 py-1 border rounded"
                  />
                ) : (
                  payment.Amount
                )}
              </td>
              <td className="px-4 py-2 border">
                {isEditing && editedPayment.Payment_ID === payment.Payment_ID ? (
                  <input
                    type="date"
                    value={editedPayment.Payment_Date}
                    onChange={(e) => handleEditChange(e, 'Payment_Date')}
                    className="w-full px-2 py-1 border rounded"
                  />
                ) : (
                  payment.Payment_Date
                )}
              </td>
              <td className="px-4 py-2 border">
                {isEditing && editedPayment.Payment_ID === payment.Payment_ID ? (
                  <input
                    type="text"
                    value={editedPayment.Description}
                    onChange={(e) => handleEditChange(e, 'Description')}
                    className="w-full px-2 py-1 border rounded"
                  />
                ) : (
                  payment.Description
                )}
              </td>
              <td className="px-4 py-2 border">
                {isEditing && editedPayment.Payment_ID === payment.Payment_ID ? (
                  <select
                    value={editedPayment.Status}
                    onChange={(e) => handleEditChange(e, 'Status')}
                    className="w-full px-2 py-1 border rounded"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                ) : (
                  payment.Status
                )}
              </td>
              <td className="px-4 py-2 border">
                {isEditing && editedPayment.Payment_ID === payment.Payment_ID ? (
                  <button
                    onClick={handleSave}
                    className="bg-blue-500 text-white py-1 px-3 rounded"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEditClick(payment)}
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

export default ScheduledPaymentsTable;
