import React from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import AppLoader from './Loader/AppLoader';
import useAuth from '../contexts/AuthContext';

const PersistLogin = () => {
    const { isloading, userInfo } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    if (isloading) {
        return (<AppLoader />);
    }
    if (!isloading && !userInfo?.accessToken) {
        navigate('/login', { state: { redirectTo: location } });
    }

    return <Outlet />
}

export default PersistLogin