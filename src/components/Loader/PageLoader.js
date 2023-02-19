import React from 'react'
import { styled } from '@mui/material/styles';
import Loader from './Loader';

const StyledRoot = styled('div')(({ theme }) => ({
    margin: 'auto',
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: "center",
    position: 'static',
    width: '100%',
    zIndex: 1300
}));

const PageLoader = () => {
    return (
        <StyledRoot>
            <Loader />
        </StyledRoot>
    )
}

export default PageLoader