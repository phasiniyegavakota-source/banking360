import React, { useState, useEffect } from "react";

const LoanRepaymentTable = () => {
  const [repayments, setRepayments] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedRepayment, setEditedRepayment] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch repayment data
  useEffect(() => {
    const fetchRepayments = async () => {
      try {
        const response = await fetch("http://localhost:5001/loanRepaymentsall");
        const data = await response.json();
        // Format Repayment_Date to 'YYYY-MM-DD'
        const formattedData = data.map((repayment) => ({
          ...repayment,
          Repayment_Date: repayment.Repayment_Date
            ? repayment.Repayment_Date.split("T")[0]
            : "",
        }));
        setRepayments(formattedData);
      } catch (error) {
        setErrorMessage("An error occurred while fetching loan repayment data.");
      }
    };

    fetchRepayments();
  }, []);

  // Handle inline edit change
  const handleEditChange = (e, fieldName) => {
    const value = e.target.value;
    setEditedRepayment((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  // Toggle editing mode
  const handleEditClick = (repayment) => {
    setIsEditing(true);
    setEditedRepayment(repayment);
  };

  // Save edited repayment data
  const handleSave = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const formattedRepayment = { ...editedRepayment };
      // Format Repayment_Date to 'YYYY-MM-DD' before sending
      if (formattedRepayment.Repayment_Date) {
        formattedRepayment.Repayment_Date = new Date(
          formattedRepayment.Repayment_Date
        )
          .toISOString()
          .split("T")[0];
      }

      const response = await fetch(
        `http://localhost:5001/loanRepayments/${editedRepayment.Repayment_ID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formattedRepayment),
        }
      );

      if (response.ok) {
        setSuccessMessage("Repayment data updated successfully!");
        setIsEditing(false);
        const updatedRepayments = repayments.map((repayment) =>
          repayment.Repayment_ID === editedRepayment.Repayment_ID
            ? editedRepayment
            : repayment
        );
        setRepayments(updatedRepayments);
      } else {
        setErrorMessage("Failed to update repayment data.");
      }
    } catch (error) {
      setErrorMessage("An error occurred while updating repayment data.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Loan Repayment Data</h1>
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      <table className="min-w-full bg-white border border-gray-300 rounded-lg">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Repayment ID</th>
            <th className="px-4 py-2 border">Loan ID</th>
            <th className="px-4 py-2 border">Repayment Amount</th>
            <th className="px-4 py-2 border">Repayment Date</th>
            <th className="px-4 py-2 border">Payment Method</th>
            <th className="px-4 py-2 border">Status</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {repayments.map((repayment) => (
            <tr key={repayment.Repayment_ID}>
              <td className="px-4 py-2 border">{repayment.Repayment_ID}</td>
              <td className="px-4 py-2 border">
                {isEditing && editedRepayment.Repayment_ID === repayment.Repayment_ID ? (
                  <input
                    type="number"
                    value={editedRepayment.Loan_ID}
                    onChange={(e) => handleEditChange(e, "Loan_ID")}
                    className="w-full px-2 py-1 border rounded"
                  />
                ) : (
                  repayment.Loan_ID
                )}
              </td>
              <td className="px-4 py-2 border">
                {isEditing && editedRepayment.Repayment_ID === repayment.Repayment_ID ? (
                  <input
                    type="number"
                    value={editedRepayment.Repayment_Amount}
                    onChange={(e) => handleEditChange(e, "Repayment_Amount")}
                    className="w-full px-2 py-1 border rounded"
                  />
                ) : (
                  repayment.Repayment_Amount
                )}
              </td>
              <td className="px-4 py-2 border">
                {isEditing && editedRepayment.Repayment_ID === repayment.Repayment_ID ? (
                  <input
                    type="date"
                    value={editedRepayment.Repayment_Date}
                    onChange={(e) => handleEditChange(e, "Repayment_Date")}
                    className="w-full px-2 py-1 border rounded"
                  />
                ) : (
                  repayment.Repayment_Date
                )}
              </td>
              <td className="px-4 py-2 border">
                {isEditing && editedRepayment.Repayment_ID === repayment.Repayment_ID ? (
                  <input
                    type="text"
                    value={editedRepayment.Payment_Method}
                    onChange={(e) => handleEditChange(e, "Payment_Method")}
                    className="w-full px-2 py-1 border rounded"
                  />
                ) : (
                  repayment.Payment_Method
                )}
              </td>
              <td className="px-4 py-2 border">
                {isEditing && editedRepayment.Repayment_ID === repayment.Repayment_ID ? (
                  <select
                    value={editedRepayment.Status}
                    onChange={(e) => handleEditChange(e, "Status")}
                    className="w-full px-2 py-1 border rounded"
                  >
                    <option value="Completed">Completed</option>
                    <option value="Pending">Pending</option>
                    <option value="Failed">Failed</option>
                  </select>
                ) : (
                  repayment.Status
                )}
              </td>
              <td className="px-4 py-2 border">
                {isEditing && editedRepayment.Repayment_ID === repayment.Repayment_ID ? (
                  <button
                    onClick={handleSave}
                    className="bg-blue-500 text-white py-1 px-3 rounded"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEditClick(repayment)}
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

export default LoanRepaymentTable;
