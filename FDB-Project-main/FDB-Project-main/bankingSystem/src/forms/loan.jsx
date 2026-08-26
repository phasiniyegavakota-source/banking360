import React, { useState } from "react";

const LoanForm = () => {
  const [formData, setFormData] = useState({
    Loan_ID: "",
    User_ID: "",
    Loan_Type_ID: "",
    Amount: "",
    Interest_Rate: "",
    Start_Date: "",
    End_Date: "",
    Status: "Active", // Default status
    Collateral: "",
    Repayment_Term: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    // Validate required fields
    if (
      !formData.User_ID ||
      !formData.Loan_Type_ID ||
      !formData.Amount ||
      !formData.Interest_Rate ||
      !formData.Start_Date ||
      !formData.End_Date ||
      !formData.Collateral ||
      !formData.Repayment_Term
    ) {
      setErrorMessage("Please fill out all required fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5001/loans", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccessMessage("Loan successfully added!");
        setFormData({
          Loan_ID: "",
          User_ID: "",
          Loan_Type_ID: "",
          Amount: "",
          Interest_Rate: "",
          Start_Date: "",
          End_Date: "",
          Status: "Active",
          Collateral: "",
          Repayment_Term: "",
        }); // Reset form
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Failed to add loan.");
      }
    } catch (error) {
      setErrorMessage("An error occurred while adding the loan.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Add New Loan</h1>
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Loan ID
          </label>
          <input
            type="text"
            name="Loan_ID"
            value={formData.Loan_ID}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            User ID<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="User_ID"
            value={formData.User_ID}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Loan Type ID<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="Loan_Type_ID"
            value={formData.Loan_Type_ID}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Amount<span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="Amount"
            value={formData.Amount}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded"
            min="0"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Interest Rate<span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="Interest_Rate"
            value={formData.Interest_Rate}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded"
            min="0"
            step="0.01"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Start Date<span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="Start_Date"
            value={formData.Start_Date}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            End Date<span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="End_Date"
            value={formData.End_Date}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Status</label>
          <select
            name="Status"
            value={formData.Status}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded"
          >
            <option value="Active">Active</option>
            <option value="Closed">Closed</option>
            <option value="Pending">Pending</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Collateral<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="Collateral"
            value={formData.Collateral}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Repayment Term<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="Repayment_Term"
            value={formData.Repayment_Term}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default LoanForm;
