import React, { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import AppLoader from './Loader/AppLoader';
import useAuth from '../contexts/AuthContext';

const PersistLogin = () => {
    const { isloading, userInfo: { accessToken } } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!isloading && !accessToken) {
            navigate('/login', { state: { redirectTo: location } });
        }
    }, [isloading, accessToken, location, navigate]);

    if (isloading || !accessToken) return (<AppLoader />);
    return <Outlet />
}

export default PersistLogin