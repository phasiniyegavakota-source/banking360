import React, { useState } from "react";

const LoanTypeForm = () => {
  const [formData, setFormData] = useState({
    Loan_Type_ID: "",
    Type_Name: "",
    Description: "",
    Maximum_Amount: "",
    Minimum_Amount: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Handle input field changes
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
    const { Type_Name, Maximum_Amount, Minimum_Amount } = formData;
    if (!Type_Name || !Maximum_Amount || !Minimum_Amount) {
      setErrorMessage("Please fill out all required fields.");
      return;
    }

    // Ensure Minimum_Amount is less than or equal to Maximum_Amount
    if (parseFloat(Minimum_Amount) > parseFloat(Maximum_Amount)) {
      setErrorMessage("Minimum Amount cannot be greater than Maximum Amount.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5001/loanTypes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccessMessage("Loan Type successfully added!");
        setFormData({
          Loan_Type_ID: "",
          Type_Name: "",
          Description: "",
          Maximum_Amount: "",
          Minimum_Amount: "",
        }); // Reset form
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Failed to add loan type.");
      }
    } catch (error) {
      setErrorMessage("An error occurred while adding the loan type.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Add New Loan Type</h1>
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        {/* Loan Type ID */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Loan Type ID
          </label>
          <input
            type="text"
            name="Loan_Type_ID"
            value={formData.Loan_Type_ID}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Type Name<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="Type_Name"
            value={formData.Type_Name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Description
          </label>
          <textarea
            name="Description"
            value={formData.Description}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded"
            rows="4"
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Maximum Amount<span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="Maximum_Amount"
            value={formData.Maximum_Amount}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded"
            step="0.01"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Minimum Amount<span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="Minimum_Amount"
            value={formData.Minimum_Amount}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded"
            step="0.01"
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

export default LoanTypeForm;
