import React from 'react';
import PropTypes from 'prop-types'
import { styled } from '@mui/material/styles';
import {
    AppBar,
    Toolbar,
    Box,
    IconButton,
    Stack,
    alpha,
    Typography
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountPopover from './AccountPopover';
import { DRAWER_WIDTH, HEADER_MOBILE, HEADER_DESKTOP } from '../../../constants';



const RootStyle = styled((props) => <AppBar  {...props} />)(({ theme }) => ({
    boxShadow: 'none',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)', // Fix on Mobile
    backgroundColor: alpha(theme.palette.background.default, 0.8),
    padding: theme.spacing(1),
    [theme.breakpoints.up('lg')]: {
        width: `calc(100% - ${DRAWER_WIDTH + 1}px)`
    }
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
    minHeight: HEADER_MOBILE,
    color: theme.palette.text.primary,
    [theme.breakpoints.up('lg')]: {
        minHeight: HEADER_DESKTOP,
        padding: theme.spacing(0, 3)
    }
}));

const Header = ({ title, onClickMenu }) => {
    return (
        <RootStyle>
            <ToolbarStyle>
                <IconButton
                    onClick={onClickMenu}
                    sx={{
                        mr: 1,
                        display: { lg: 'none' },
                    }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography
                    variant="h6"
                    component="h6"
                    color="secondary"
                    sx={{
                        fontWeight: 'fontWeightBold',
                        display: { lg: 'none' }
                    }}>
                    {title}
                </Typography>
                {/* <Searchbar /> */}
                <Box sx={{ flexGrow: 1 }} />
                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={{
                        xs: 0.5,
                        sm: 1,
                    }}
                >
                    <AccountPopover />
                </Stack>
            </ToolbarStyle>
        </RootStyle>
    )
}

Header.propTypes = {
    title: PropTypes.node,
    onClickMenu: PropTypes.func
}

export default Header;