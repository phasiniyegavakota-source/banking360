import React, { useState } from 'react';

const UserForm = () => {
    const [formData, setFormData] = useState({
        Username: '',
        Password: '',
        Email: '',
        Role: '',
        Status: '',
        Name: '',
        Address: '',
        Phone: '',
        Date_of_Birth: '',
        Gender: '',
        Nationality: '',
        Occupation: '',
        Marital_Status: '',
        Date_Joined: '',
    });

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage('');
        setErrorMessage('');

        try {
            const response = await fetch('http://localhost:5001/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSuccessMessage('User added successfully!');
                setFormData({
                    Username: '',
                    Password: '',
                    Email: '',
                    Role: '',
                    Status: '',
                    Name: '',
                    Address: '',
                    Phone: '',
                    Date_of_Birth: '',
                    Gender: '',
                    Nationality: '',
                    Occupation: '',
                    Marital_Status: '',
                    Date_Joined: '',
                });
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || 'Failed to add user.');
            }
        } catch (error) {
            setErrorMessage('An error occurred while submitting the form.');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-xl font-bold mb-4">Add New User</h1>
            {successMessage && <p className="text-green-500">{successMessage}</p>}
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                {/* Username */}
                <div className="mb-4">
                    <label htmlFor="Username" className="block text-gray-700 text-sm font-bold mb-2">Username</label>
                    <input
                        type="text"
                        id="Username"
                        name="Username"
                        value={formData.Username}
                        onChange={handleChange}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                {/* Password */}
                <div className="mb-4">
                    <label htmlFor="Password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                    <input
                        type="password"
                        id="Password"
                        name="Password"
                        value={formData.Password}
                        onChange={handleChange}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                {/* Email */}
                <div className="mb-4">
                    <label htmlFor="Email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                    <input
                        type="email"
                        id="Email"
                        name="Email"
                        value={formData.Email}
                        onChange={handleChange}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                {/* Role Dropdown */}
                <div className="mb-4">
                    <label htmlFor="Role" className="block text-gray-700 text-sm font-bold mb-2">Role</label>
                    <select
                        id="Role"
                        name="Role"
                        value={formData.Role}
                        onChange={handleChange}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="">Select Role</option>
                        <option value="User">User</option>
                        <option value="Admin">Admin</option>
                    </select>
                </div>

                {/* Status Dropdown */}
                <div className="mb-4">
                    <label htmlFor="Status" className="block text-gray-700 text-sm font-bold mb-2">Status</label>
                    <select
                        id="Status"
                        name="Status"
                        value={formData.Status}
                        onChange={handleChange}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="">Select Status</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                </div>

                {/* Name */}
                <div className="mb-4">
                    <label htmlFor="Name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                    <input
                        type="text"
                        id="Name"
                        name="Name"
                        value={formData.Name}
                        onChange={handleChange}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                {/* Gender Dropdown */}
                <div className="mb-4">
                    <label htmlFor="Gender" className="block text-gray-700 text-sm font-bold mb-2">Gender</label>
                    <select
                        id="Gender"
                        name="Gender"
                        value={formData.Gender}
                        onChange={handleChange}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                {/* Marital Status Dropdown */}
                <div className="mb-4">
                    <label htmlFor="Marital_Status" className="block text-gray-700 text-sm font-bold mb-2">Marital Status</label>
                    <select
                        id="Marital_Status"
                        name="Marital_Status"
                        value={formData.Marital_Status}
                        onChange={handleChange}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="">Select Marital Status</option>
                        <option value="Single">Single</option>
                        <option value="Married">Married</option>
                        <option value="Divorced">Divorced</option>
                        <option value="Widowed">Widowed</option>
                    </select>
                </div>

                {/* Remaining Fields */}
                {['Address', 'Phone', 'Date_of_Birth', 'Nationality', 'Occupation', 'Date_Joined'].map((field) => (
                    <div key={field} className="mb-4">
                        <label htmlFor={field} className="block text-gray-700 text-sm font-bold mb-2">{field.replace(/_/g, ' ')}</label>
                        <input
                            type={field.includes('Date') ? 'date' : 'text'}
                            id={field}
                            name={field}
                            value={formData[field]}
                            onChange={handleChange}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                ))}

                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default UserForm;
