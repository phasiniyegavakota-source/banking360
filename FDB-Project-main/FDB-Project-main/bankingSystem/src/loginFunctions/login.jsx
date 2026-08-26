import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../forms/authentication';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login, error, setError } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username || !password) {
            setError('Both username and password are required');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5001/login', { username, password });
            
            if (response.data.message === 'Login successful') {
                // Store user data in localStorage, including id
                login(response.data.user); // Pass user data including role to context
                alert(`Logged in as ${username}`);
                navigate('/'); // Redirect to home after login
            } else {
                setError('Invalid credentials');
            }
        } catch (error) {
            if (error.response) {
                // Server-side error
                setError(error.response.data.error || 'Invalid credentials');
            } else if (error.request) {
                // No response received
                setError('No response from server. Please try again later.');
            } else {
                // Other errors
                setError('An error occurred. Please try again.');
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <div className="bg-white shadow-lg rounded-lg p-8 w-[400px]">
                <h2 className="text-2xl font-bold mb-6 text-center text-black">Login</h2>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                    >
                        Login
                    </button>
                </form>

                <p className="text-center mt-4 text-black">
                    <Link to="/register" className="text-blue-500 hover:underline">
                        Don't have an account? Register here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
