import React, { useCallback, useEffect } from 'react'
import Page from '../../components/Page';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../storage/actions/userAction';
import { Paper, Avatar, Typography, Container, Stack, List, ListItem, ListItemText, ListItemIcon, Box } from '@mui/material';
import { selectUserProfile } from '../../storage/slices/userSlice';
import MailTwoToneIcon from '@mui/icons-material/MailTwoTone';
import AdminPanelSettingsTwoToneIcon from '@mui/icons-material/AdminPanelSettingsTwoTone';
import Label from '../../components/Label';

const status = {
    success: {
        label: "Active",
        labelColor: 'success'
    },
    error: {
        label: "In-Active",
        labelColor: 'error'
    }
}

const ViewUser = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const { fullName, email, username, image, roles = [], isActive } = useSelector(selectUserProfile)
    const { label, labelColor } = status[isActive ? "success" : "error"];

    const loadUserProfile = useCallback(() => {
        dispatch(getUserDetails(userId));
        // eslint-disable-next-line
    }, [userId]);

    useEffect(() => {
        loadUserProfile();
        // eslint-disable-next-line
    }, []);

    return (
        <Page
            title="View User | Merno"
            legend="View User"
            enableGoBack={true}
        >
            <Container maxWidth="md">
                <Stack
                    direction="column"
                    spacing={2}
                >
                    <Stack direction="column" spacing={2} justifyContent={'center'} alignItems={'center'}>
                        <Avatar src={image} sx={{ width: '100px', height: '100px' }} />
                        <Stack direction='column' justifyContent={'center'} alignItems={'center'}>
                            <Typography variant='h6' color="primary">{fullName}</Typography>
                            <Typography variant='subtitle' sx={{ color: 'text.secondary' }}>{username}</Typography>
                        </Stack>
                    </Stack>
                    <Paper variant='outlined' sx={{ p: 0 }}>
                        <List dense>

                            <ListItem secondaryAction={<Label color={labelColor} variant="ghost">{label}</Label>} divider>
                                <ListItemIcon>
                                    <MailTwoToneIcon />
                                </ListItemIcon>
                                <ListItemText
                                    primary={<Typography variant='subtitle2'>Account Status</Typography>}
                                />
                            </ListItem>
                            <ListItem secondaryAction={<Typography variant='subtitle' sx={{ color: 'text.secondary' }}>{roles[0]?.toString()}</Typography>} divider>
                                <ListItemIcon>
                                    <AdminPanelSettingsTwoToneIcon />
                                </ListItemIcon>
                                <ListItemText
                                    primary={<Typography variant='subtitle2'>User Role</Typography>}
                                />
                            </ListItem>
                            <ListItem secondaryAction={<Box title={`Click to send email to: ${email}`} component="a" href={`mailto:${email}`} variant='subtitle' sx={{ color: 'text.secondary' }}>{email}</Box>}>
                                <ListItemIcon>
                                    <MailTwoToneIcon />
                                </ListItemIcon>
                                <ListItemText
                                    primary={<Typography variant='subtitle2'>Email</Typography>}
                                />
                            </ListItem>
                        </List>
                    </Paper>
                </Stack>
            </Container>

        </Page>
    )
}

export default ViewUser;