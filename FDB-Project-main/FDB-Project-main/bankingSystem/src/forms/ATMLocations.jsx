import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ATMLocations = () => {
    const [atm, setAtm] = useState({
        atmID: '',
        location: '',
        branchID: '',
        installationDate: '',
        status: 'Active',
        maintenanceSchedule: '',
    });

    const [errors, setErrors] = useState({});
    const [atms, setAtms] = useState([]);

    useEffect(() => {
        fetchATMs();
    }, []);

    const fetchATMs = async () => {
        try {
            const response = await axios.get('http://localhost:5001/atms');
            setAtms(response.data);
        } catch (error) {
            console.error('Error fetching ATMs:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAtm({ ...atm, [name]: value });
    };

    const validate = () => {
        const newErrors = {};
        if (!atm.location) newErrors.location = 'Location is required';
        if (!atm.installationDate) newErrors.installationDate = 'Installation Date is required';
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            await axios.post('http://localhost:5001/atms', atm);
            alert('ATM created successfully!');
            fetchATMs();
            setAtm({
                atmID: '',
                location: '',
                branchID: '',
                installationDate: '',
                status: 'Active',
                maintenanceSchedule: '',
            });
            setErrors({});
        } catch (error) {
            console.error('Error creating ATM:', error);
        }
    };

    const handleUpdate = async (id) => {
        const updatedATM = atms.find(atm => atm.ATM_ID === id);
        try {
            await axios.put(`http://localhost:5001/atms/${id}`, updatedATM);
            alert('ATM updated successfully!');
            fetchATMs();
        } catch (error) {
            console.error('Error updating ATM:', error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-3xl font-bold mb-6 text-center">ATM Locations</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Location */}
                <div>
                    <label htmlFor="location" className="block text-sm font-medium">Location</label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        placeholder="Enter ATM Location"
                        value={atm.location}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.location && <p className="text-red-500 text-sm mt-2">{errors.location}</p>}
                </div>

                {/* Branch ID */}
                <div>
                    <label htmlFor="branchID" className="block text-sm font-medium">Branch ID</label>
                    <input
                        type="text"
                        id="branchID"
                        name="branchID"
                        placeholder="Enter Branch ID"
                        value={atm.branchID}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.branchID && <p className="text-red-500 text-sm mt-2">{errors.branchID}</p>}
                </div>

                {/* Installation Date */}
                <div>
                    <label htmlFor="installationDate" className="block text-sm font-medium">Installation Date</label>
                    <input
                        type="date"
                        id="installationDate"
                        name="installationDate"
                        value={atm.installationDate}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.installationDate && <p className="text-red-500 text-sm mt-2">{errors.installationDate}</p>}
                </div>

                {/* Maintenance Schedule */}
                <div>
                    <label htmlFor="maintenanceSchedule" className="block text-sm font-medium">Maintenance Schedule</label>
                    <input
                        type="text"
                        id="maintenanceSchedule"
                        name="maintenanceSchedule"
                        placeholder="Enter Maintenance Schedule"
                        value={atm.maintenanceSchedule}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                {/* Submit Button */}
                <div className="mt-6 text-center">
                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:ring-4 focus:ring-blue-200"
                    >
                        Create ATM
                    </button>
                </div>
            </form>
            <h2 className="text-2xl font-bold mb-4 text-center">ATM Locations</h2>
            <ul>
                {atms.map(atm => (
                    <li key={atm.ATM_ID}>
                        {atm.Location} - {atm.Branch_ID}
                        <button onClick={() => handleUpdate(atm.ATM_ID)} className="ml-2 text-blue-500">Update</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ATMLocations;
