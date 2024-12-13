// src/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const isTokenExpired = () => {
    const expirationTime = localStorage.getItem('tokenExpiration');
    if (!expirationTime) {
        return true;
    }
    return new Date().getTime() > expirationTime;
}

const ProtectedRoute = ({ element }) => {
    const isAuthenticated = localStorage.getItem('jwtToken') && !isTokenExpired();

    return isAuthenticated ? element : <Navigate to="/starholadmin/" />;
};

export default ProtectedRoute;
