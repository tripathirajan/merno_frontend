import React, { useEffect } from 'react'
import { styled } from '@mui/material/styles';
import { Paper, Container } from '@mui/material';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../contexts/AuthContext';
import AppLoader from '../../components/Loader/AppLoader';


const StyledRoot = styled('div')(({ theme }) => ({
    maxWidth: 480,
    margin: 'auto',
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(12, 0)
}));

const AuthLayout = () => {
    const { isloading, userInfo: { accessToken } } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;
    const { redirectTo = '/dashboard' } = state || {};

    useEffect(() => {
        if (!isloading && accessToken) {
            navigate(redirectTo);
        }
    }, [isloading, accessToken, navigate, redirectTo])

    if (isloading) {
        return <AppLoader />;
    }

    return (
        <StyledRoot>
            <Container maxWidth="sm">
                <Paper
                    variant='outlined'
                    sx={{
                        p: 2,
                        maxWidth: { xs: 400, lg: 475 },
                        margin: { xs: 2, md: 3 },
                        '& > *': {
                            flexGrow: 1,
                            flexBasis: '50%'
                        }
                    }}
                >
                    <Outlet />
                </Paper>
            </Container>



        </StyledRoot>
    )
}

export default AuthLayout