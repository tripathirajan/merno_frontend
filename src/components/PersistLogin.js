import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { refreshToken } from '../storage/actions/authAction';
import { selectAccessToken } from '../storage/slices/authSlice';
import AppLoader from './Loader/AppLoader';

const PersistLogin = () => {
    const token = useSelector(selectAccessToken)
    const [isLoading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        let isMounted = true;
        const verifyRefreshToken = async () => {
            try {
                const { status } = await dispatch(refreshToken())
                if (status === 401) {
                    navigate('/login')
                }
            }
            catch (err) {
                console.error(err);
            }
            finally {
                isMounted && setLoading(false);
            }
        }
        !token ? verifyRefreshToken() : setLoading(false);

        return () => isMounted = false;
        // eslint-disable-next-line
    }, [])

    return (<>
        {
            (isLoading && <AppLoader />) || <Outlet />
        }
    </>
    )
}

export default PersistLogin