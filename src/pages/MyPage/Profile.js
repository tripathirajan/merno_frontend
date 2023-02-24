import React from 'react'
import Page from '../../components/Page'
import { Grid, Paper, Typography, } from '@mui/material';
import ProfileResetPassword from './ProfileResetPassword';
import EditProfile from './EditProfile';


const Profile = () => {
    return (
        <Page
            title="Profile | Merno"
            legend={`Profile`}
        >
            <Paper sx={{ p: 2 }} elevation={0} variant='outlined'>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4} lg={4}>
                        <Typography variant='subtitle2' color={'secondary'}>My Info</Typography>
                    </Grid>
                    <Grid item xs={12} md={8} lg={8}>
                        <EditProfile />
                    </Grid>
                </Grid>
            </Paper>
            <Paper sx={{ p: 2, mt: 1 }} elevation={0} variant='outlined'>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4} lg={4}>
                        <Typography variant='subtitle2' color={'secondary'}>Change Password</Typography>
                    </Grid>
                    <Grid item xs={12} md={8} lg={8}>
                        <ProfileResetPassword />
                    </Grid>
                </Grid>
            </Paper>
        </Page>
    )
}

export default Profile