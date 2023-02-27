import React, { useEffect, useState } from 'react'
import Page from '../../components/Page'
import { Grid, Paper, Typography, } from '@mui/material';
import ProfileResetPassword from './ProfileResetPassword';
import EditProfile from './EditProfile';
import PageLoader from '../../components/Loader/PageLoader';
import { useDispatch } from 'react-redux';
import { getUserProfile } from '../../storage/actions/userAction';


const Profile = () => {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        const loadProfile = async () => {
            await dispatch(getUserProfile());
            setLoading(false);
        }
        loadProfile();
    }, [dispatch])

    return (
        <Page
            title="Profile | Merno"
            legend={`Profile`}
        >
            <Paper sx={{ p: 2 }} elevation={0} variant='outlined'>
                {
                    loading ? <PageLoader paperProps={{ variant: '' }} /> : <Grid container spacing={2}>
                        <Grid item xs={12} md={4} lg={4}>
                            <Typography variant='subtitle2'>My Info</Typography>
                        </Grid>
                        <Grid item xs={12} md={8} lg={8}>
                            <EditProfile />
                        </Grid>
                    </Grid>
                }
            </Paper>
            <Paper sx={{ p: 2, mt: 1 }} elevation={0} variant='outlined'>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4} lg={4}>
                        <Typography variant='subtitle2'>Change Password</Typography>
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