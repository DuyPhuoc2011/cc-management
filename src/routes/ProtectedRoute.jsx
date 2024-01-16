import React from 'react';
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';

function ProtectedRoute() {
    const {token} = useSelector(state => state.auth);
    if (!token || token === 'undefined') {
        // If not authenticated, redirect to the login page
        return <Navigate to="/login" />;
    }
    
      // If authenticated, render the child routes
    return <Outlet />;
}

export default ProtectedRoute