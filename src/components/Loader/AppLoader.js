import React from 'react';
import { styled } from '@mui/material/styles';
import Loader from './Loader';

const StyledRoot = styled('div')(({ theme }) => ({
    maxWidth: 480,
    margin: 'auto',
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(12, 0)
}));

const AppLoader = () => {
    return (
        <StyledRoot>
            <Loader />
        </StyledRoot>
    )
}

export default AppLoader;