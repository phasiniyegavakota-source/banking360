import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CustomerATMLocations = () => {
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        fetchATMLocations();
    }, []);

    const fetchATMLocations = async () => {
        try {
            const response = await axios.get('http://localhost:5001/atms');
            setLocations(response.data);
        } catch (error) {
            console.error('Error fetching ATM locations:', error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">ATM Locations</h2>
            {locations.length === 0 ? (
                <p className="text-center text-gray-500">No data available</p>
            ) : (
                <div className="overflow-auto">
                    <table className="min-w-full table-fixed bg-white">
                        <thead>
                            <tr>
                                <th className="w-1/12 py-2 px-4 bg-gray-200 text-gray-600 border-b border-gray-200">ATM ID</th>
                                <th className="w-1/12 py-2 px-4 bg-gray-200 text-gray-600 border-b border-gray-200">Location</th>
                                <th className="w-1/12 py-2 px-4 bg-gray-200 text-gray-600 border-b border-gray-200">Branch ID</th>
                                <th className="w-1/12 py-2 px-4 bg-gray-200 text-gray-600 border-b border-gray-200">Installation Date</th>
                                <th className="w-1/12 py-2 px-4 bg-gray-200 text-gray-600 border-b border-gray-200">Status</th>
                                <th className="w-1/12 py-2 px-4 bg-gray-200 text-gray-600 border-b border-gray-200">Maintenance Schedule</th>
                            </tr>
                        </thead>
                        <tbody>
                            {locations.map((location) => (
                                <tr key={location.ATM_ID}>
                                    <td className="py-2 px-4 border-b border-gray-200">{location.ATM_ID}</td>
                                    <td className="py-2 px-4 border-b border-gray-200">{location.Location}</td>
                                    <td className="py-2 px-4 border-b border-gray-200">{location.Branch_ID}</td>
                                    <td className="py-2 px-4 border-b border-gray-200">{new Date(location.Installation_Date).toLocaleDateString()}</td>
                                    <td className="py-2 px-4 border-b border-gray-200">{location.Status}</td>
                                    <td className="py-2 px-4 border-b border-gray-200">{location.Maintenance_Schedule}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default CustomerATMLocations;
