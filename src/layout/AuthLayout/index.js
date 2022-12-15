import React from 'react'
import { styled } from '@mui/material/styles';
import { Paper, Box, Container } from '@mui/material';
import { Outlet } from 'react-router-dom';


const StyledRoot = styled('div')(({ theme }) => ({
    maxWidth: 480,
    margin: 'auto',
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(12, 0)
}));

const AuthLayout = () => {
    return (
        <StyledRoot>
            <Container maxWidth="sm">
                <Paper
                    sx={{
                        maxWidth: { xs: 400, lg: 475 },
                        margin: { xs: 2, md: 3 },
                        '& > *': {
                            flexGrow: 1,
                            flexBasis: '50%'
                        }
                    }}
                >
                    <Box
                    // sx={{ p: { xs: 1, sm: 2, xl: 4 } }}
                    >
                        <Outlet />
                    </Box>
                </Paper>
            </Container>



        </StyledRoot>
    )
}

export default AuthLayout