import React from 'react';
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/authProvider";

function ProtectedRoute() {
    // const { authContext } = useAuth();
    let token = sessionStorage.getItem('token');
    // console.log("Auth2:", token);
    if (!token) {
        // If not authenticated, redirect to the login page
        return <Navigate to="/login" />;
    }
    
      // If authenticated, render the child routes
    return <Outlet />;
}

export default ProtectedRoute