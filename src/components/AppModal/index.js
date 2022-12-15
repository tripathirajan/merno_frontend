import React from 'react'
import PropTypes from 'prop-types'
import { Paper, Box, Modal, Stack, Typography, IconButton, Fade, Portal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    minWidth: 400,
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 8
};

const AppModal = ({ children, open, handleClose, title = 'Title', footer = '', ...rest }) => {

    const handleModalClose = (event, reason) => {
        if (reason !== 'backdropClick') {
            handleClose(event, reason);
        }
    }

    return (
        <Portal>
            <Modal
                open={open}
                onClose={handleModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                disableEscapeKeyDown={true}
                closeAfterTransition
                BackdropProps={{
                    timeout: 500
                }}
            >
                <Fade in={open}>
                    <Paper sx={style} variant="outlined">
                        <Stack direction="column" spacing={1}>
                            <Box sx={{ pt: 1 }} display="flex" flexDirection="row" alignItems="center">
                                <Typography color="secondary" variant='subtitle1'>{title}</Typography>
                                <Box sx={{ flexGrow: 1 }} />
                                <IconButton color="secondary" aria-label="back" component="span" size="small" onClick={handleClose}>
                                    <CloseIcon />
                                </IconButton>
                            </Box>
                            <Box sx={{ p: 1 }}>
                                {children}
                            </Box>
                            {
                                footer && <Box sx={{ pb: 1 }}>{footer}</Box>
                            }
                        </Stack>

                    </Paper>
                </Fade>
            </Modal>
        </Portal>
    )
}

AppModal.propTypes = {
    children: PropTypes.any.isRequired,
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
}

export default AppModal;