import React, { useState } from "react";

const TransactionTypeForm = () => {
  const [formData, setFormData] = useState({
    Transaction_Type_ID: "",
    Type_Name: "",
    Description: "",
    Category: "",
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
    if (!formData.Type_Name || !formData.Category) {
      setErrorMessage("Please fill out all required fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5001/transactionTypes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccessMessage("Transaction Type successfully added!");
        setFormData({
          Transaction_Type_ID: "",
          Type_Name: "",
          Description: "",
          Category: "",
        }); // Reset form
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Failed to add transaction type.");
      }
    } catch (error) {
      setErrorMessage("An error occurred while adding the transaction type.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Add New Transaction Type</h1>
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Transaction Type ID
          </label>
          <input
            type="text"
            name="Transaction_Type_ID"
            value={formData.Transaction_Type_ID}
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
            Category<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="Category"
            value={formData.Category}
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

export default TransactionTypeForm;
