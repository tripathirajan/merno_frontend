import React, { useState } from 'react'
import { styled } from '@mui/material/styles';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import SideNav from './SideNav';
import { HEADER_DESKTOP, HEADER_MOBILE } from '../../constants';


const RootStyle = styled('div')({
    display: 'flex',
    minHeight: '100%',
    overflow: 'hidden'
});

const MainStyle = styled('main')(({ theme }) => ({
    flexGrow: 1,
    overflow: 'auto',
    minHeight: '100%',
    paddingTop: HEADER_MOBILE + 16,
    paddingBottom: theme.spacing(10),
    // paddingLeft: theme.spacing(2),
    // paddingRight: theme.spacing(2),
    color: theme.palette.text.secondary,
    [theme.breakpoints.up('lg')]: {
        paddingTop: HEADER_DESKTOP + 16
    }
}));

const DashboardLayout = () => {
    const [open, setOpen] = useState(false);
    return (
        <RootStyle>
            <Header title="Mernodico" onClickMenu={() => setOpen(prevState => !prevState)} />
            <SideNav openNav={open} onCloseNav={() => setOpen(false)} />
            <MainStyle>
                <Outlet />
            </MainStyle>
        </RootStyle>
    )
}

export default DashboardLayout;