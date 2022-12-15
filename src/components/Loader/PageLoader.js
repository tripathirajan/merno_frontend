import React from 'react'
import { styled, alpha } from '@mui/material/styles';
import Loader from './Loader';

const StyledRoot = styled('div')(({ theme }) => ({
    margin: 'auto',
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: "center",
    position: 'fixed',
    width: '100%',
    zIndex: 1300,
    backdropFilter: 'blur(3px)',
    WebkitBackdropFilter: 'blur(3px)', // Fix on Mobile
    backgroundColor: alpha(theme.palette.background.paper, 0.2),
    left: 0,
    top: 0
}));

const PageLoader = () => {
    return (
        <StyledRoot>
            <Loader />
        </StyledRoot>
    )
}

export default PageLoader