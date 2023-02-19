import React from 'react'
import Page from '../../components/Page'
import { Avatar, Button, ButtonGroup, Grid, IconButton, Paper, Stack, Typography, styled } from '@mui/material';
import useAuth from '../../contexts/AuthContext';
import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';
import VpnKeyTwoToneIcon from '@mui/icons-material/VpnKeyTwoTone';
import LockTwoToneIcon from '@mui/icons-material/LockTwoTone';

const ProfilePicPreview = styled(Avatar)(({ theme }) => ({
    width: '150px',
    height: '150px',
    border: `2px solid ${theme.palette.background.default}`,
    padding: theme.spacing(1)
}))
const Profile = () => {
    const { userInfo: { fullName, username, photoURL = '' } } = useAuth()
    return (
        <Page
            title="Profile | Merno"
            legend={`Profile`}
        >
            <Grid container spacing={2}>
                <Grid item xs={12} md={4} lg={4}>
                    <Paper sx={{ p: 2 }}>
                        <Stack
                            direction={'column'}
                            alignItems={'center'}
                            justifyContent={'center'}
                            spacing={2}
                        >
                            <ProfilePicPreview
                                src={'http://res.cloudinary.com/dwwhstsge/image/upload/v1676779661/63f1a087a7f59d155b0c3cfa.jpg'}
                            />
                            <Stack
                                direction={'column'}
                                alignItems={'center'}
                                justifyContent={'center'}
                            >
                                <Typography variant="subtitle2" color="secondary" noWrap>
                                    {fullName}
                                </Typography>
                                <Typography variant="caption" sx={{ color: 'text.secondary', textTransform: 'lowercase' }} noWrap>
                                    {username}
                                </Typography>
                            </Stack>
                            <ButtonGroup variant="outlined" aria-label="social links">
                                <IconButton title='Settings'>
                                    <SettingsTwoToneIcon />
                                </IconButton>
                                <IconButton title='Change password'>
                                    <VpnKeyTwoToneIcon />
                                </IconButton>
                                <IconButton title='Logout'>
                                    <LockTwoToneIcon />
                                </IconButton>
                            </ButtonGroup>
                        </Stack>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={8} lg={8}>
                    <Paper sx={{ p: 2 }}>
                        page1
                    </Paper>
                </Grid>
            </Grid>
        </Page>
    )
}

export default Profile