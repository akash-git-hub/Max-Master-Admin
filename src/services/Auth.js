import React from 'react';
import { AuthContext } from "../states/AuthContext";
import { useContext } from "react";
import { Navigate, Outlet } from 'react-router-dom';

const Auth = () => {
    const { loggedIn } = useContext(AuthContext);
    return loggedIn ? <Outlet /> : <Navigate to="/" />;
};

export default Auth;

