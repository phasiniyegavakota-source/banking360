import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [role, setRole] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setIsAuthenticated(true);
            setRole(storedUser.role);
        }
    }, []);

    const login = (user) => {
        setIsAuthenticated(true);
        setRole(user.role);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('user_id', user.id); // Store user ID separately
        setError('');
    };

    const logout = () => {
        setIsAuthenticated(false);
        setRole(null);
        localStorage.removeItem('user');
        localStorage.removeItem('user_id'); 
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, role, login, logout, error, setError }}>
            {children}
        </AuthContext.Provider>
    );
};
