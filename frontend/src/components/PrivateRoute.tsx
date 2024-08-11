import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from '../store';

const PrivateRoute: React.FC = () => {
    const accessToken = useSelector((state: RootState) => state.auth.accessToken);

    return accessToken ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
