import React, { useMemo, useState } from 'react'
import { Divider, Typography, Stack, MenuItem, Avatar, Button, Popover, Badge } from '@mui/material';
import { useDispatch } from 'react-redux';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { styled } from '@mui/material/styles';
import useAuth from '../../../contexts/AuthContext';
import { logoutUser } from '../../../storage/actions/authAction';
import { useNavigate } from 'react-router-dom';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));



const AccountPopover = props => {
    const [open, setOpen] = useState(null);
    const { userInfo: { fullName, username, image = '' } } = useAuth();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleOpen = (event) => {
        setOpen(event.currentTarget);
    };

    const handleClose = () => {
        setOpen(null);
    };

    const handleLogOut = () => {
        dispatch(logoutUser());
    }
    const menus = useMemo(() => ([
        {
            label: 'Profile',
            onClick: () => {
                handleClose();
                navigate('/profile')
            }
        },
        {
            label: 'Settings',
            onClick: () => {
                handleClose();
                navigate('/settings')
            }
        },
    ]), [navigate]);

    return (
        <>
            <Button
                onClick={handleOpen}
                endIcon={<KeyboardArrowDownIcon />}
                sx={{
                    p: 1,
                    borderRadius: '10px',
                    bgcolor: 'transparent',
                    ...(open && {
                        '&:before': {
                            zIndex: 1,
                            content: "''",
                            width: '100%',
                            height: '100%',
                            borderRadius: '10px',
                            position: 'absolute',
                            bgcolor: 'action.selected'
                        },
                    }),
                }}
            >
                <Stack
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={1}
                >
                    <StyledBadge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        variant="dot"
                    >
                        <Avatar src={image} alt={fullName} />
                    </StyledBadge>
                    <Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="flex-start"
                        spacing={0}
                        sx={
                            {
                                display: { xs: 'none', sm: 'none', md: 'block', lg: 'block' }
                            }
                        }
                    >
                        <Typography variant="subtitle2" sx={{ color: 'text.primary' }} noWrap>
                            {fullName}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary', textTransform: 'lowercase' }} noWrap>
                            {username}
                        </Typography>
                    </Stack>
                </Stack>
            </Button>

            <Popover
                open={Boolean(open)}
                anchorEl={open}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                PaperProps={{
                    sx: {
                        p: 0,
                        mt: 1.5,
                        ml: 0.75,
                        width: 180,
                        '& .MuiMenuItem-root': {
                            typography: 'body2',
                            borderRadius: 0.75,
                        },
                    },
                }}
            >
                <Stack sx={{ p: 1 }}>
                    {menus.map((option) => (
                        <MenuItem key={option.label} onClick={option.onClick}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Stack>

                <Divider sx={{ borderStyle: 'dashed' }} />

                <MenuItem onClick={handleLogOut} sx={{ m: 1 }}>
                    Logout
                </MenuItem>
            </Popover>
        </>
    )
}


export default AccountPopover