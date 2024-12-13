// src/PublicRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const isTokenExpired = () => {
    const expirationTime = localStorage.getItem('tokenExpiration');
    if (!expirationTime) {
        return true;
    }
    return new Date().getTime() > expirationTime;
}

const PublicRoute = ({ element }) => {
    const isAuthenticated = !!localStorage.getItem('jwtToken') && !isTokenExpired();

    return isAuthenticated ? <Navigate to="/starholadmin/admin" /> : element;
};

export default PublicRoute;