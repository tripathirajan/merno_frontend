import React from 'react';
import { Container, CircularProgress, Paper, Stack, Typography, Box } from '@mui/material';

const Loader = () => {
    return (
        <Container maxWidth="sm">
            <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
                sx={{
                    minWidth: '75px'
                }}
            >
                <Paper
                    sx={{ p: 2 }}
                    variant="outlined"
                >
                    <Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}
                    >
                        <Box sx={{ display: 'flex' }}>
                            <CircularProgress size={30} />
                        </Box>
                        <Typography variant='subtitle2' color="secondary" sx={{ fontWeight: 'fontWeightBold' }}>
                            Loading.....
                        </Typography>
                    </Stack>
                </Paper>
            </Stack>
        </Container>
    )
}

export default Loader