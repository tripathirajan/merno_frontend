import { Avatar, Stack, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileRenderer = (props) => {
    const { img = '', title, subtitle1, redirectURL } = props;
    const navigate = useNavigate();
    const handleTitleClick = (e) => {
        if (!redirectURL) {
            return false;
        }
        navigate(redirectURL);

    }
    return (<Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        spacing={1}
        sx={{ p: 1 }}
    >
        <Avatar src={img} variant="rounded" alt={title} />
        <Stack
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
            onClick={handleTitleClick}
        >
            <Typography variant='body2' color="primary" sx={{ fontWeight: 'bold' }}>{title}</Typography>
            <Typography variant='caption' sx={{ color: 'text.secondary' }}>{subtitle1}</Typography>
        </Stack>
    </Stack>
    )
}

export default ProfileRenderer;