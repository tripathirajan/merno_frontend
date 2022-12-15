import React from 'react'
import PropTypes from 'prop-types'
import { Paper, Stack, Typography, Box } from '@mui/material'
const AppToolbar = props => {
    const { counter, children } = props
    return (
        <Paper
            sx={{ px: 2, py: 1 }}
        >
            <Stack
                direction="row"
                spacing={1}
                alignItems="center"
            >
                {
                    counter && <Typography variant='subtitle2' color="text.secondary">
                        {counter} Total Records
                    </Typography>
                }
                <Box sx={{ flexGrow: 1 }} />
                {children}
            </Stack>
        </Paper>
    )
}

AppToolbar.propTypes = {
    counter: PropTypes.number.isRequired,
    children: PropTypes.node
}

export default AppToolbar;