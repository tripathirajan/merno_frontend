import React from 'react'
import Page from '../../components/Page';
import { Container, Paper, List, ListItem, ListItemIcon, ListItemText, Switch, ListItemButton } from '@mui/material';
import NotificationsActiveTwoToneIcon from '@mui/icons-material/NotificationsActiveTwoTone';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../storage/actions/authAction';

const Settings = () => {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logoutUser())
    }
    return (<Page
        title="Settings | Merno"
        legend={`Settings`}
    >
        <Container maxWidth="md">
            <Paper variant='outlined' sx={{ p: 2 }}>
                <List>
                    <ListItem divider>
                        <ListItemIcon>
                            <NotificationsActiveTwoToneIcon />
                        </ListItemIcon>
                        <ListItemText
                            id="switch-list-label-wifi"
                            primary="Notification"
                            secondary="Enable/Disable all type of notification"
                            primaryTypographyProps={{
                                sx: { fontWeight: '500' }
                            }}
                        />
                        <Switch
                            edge="end"
                            checked={false}
                            inputProps={{
                                'aria-labelledby': 'switch-list-label-wifi',
                            }}
                        />
                    </ListItem>
                    <ListItem divider>
                        <ListItemIcon>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemButton onClick={handleLogout}>Logout</ListItemButton>
                    </ListItem>
                </List>
            </Paper>
        </Container>
    </Page>
    )
}

export default Settings;