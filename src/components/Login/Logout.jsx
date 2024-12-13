// src/components/Logout.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    React.useEffect(() => {
        // Remove token and expiration time from localStorage
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('tokenExpiration');

        // Redirect to login page
        navigate('/starholadmin/');
    }, [navigate]);

    return null; // This component doesn't need to render anything
};

export default Logout;
