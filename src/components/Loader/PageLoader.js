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

const PageLoader = (props) => {
    const { paperProps } = props;
    return (
        <StyledRoot>
            <Loader paperProps={paperProps} />
        </StyledRoot>
    )
}

export default PageLoader