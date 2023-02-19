import React from 'react'
import PropTypes from 'prop-types'
import { Alert, Snackbar, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

export const toastType = {
    success: 'success',
    error: 'error',
    warn: 'warning',
    info: 'info',
    default: 'default'
}

const DEFAULT_DISPLAY_TIMEOUT = 4000;

const Toaster = props => {
    const {
        open = false,
        vertical = 'top',
        horizontal = 'center',
        message,
        handleClose,
        type = toastType.default,
        displayTimeout = DEFAULT_DISPLAY_TIMEOUT
    } = props;
    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );
    if (type !== toastType.default) {
        return (<Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={open}
            onClose={handleClose}
            key={vertical + horizontal}
            autoHideDuration={displayTimeout}
            action={handleClose ? action : null}
        >
            <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }} variant="filled" elevation={6}>
                {message}
            </Alert>
        </Snackbar>)
    }

    return (<Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message={message || ''}
        key={vertical + horizontal}
        autoHideDuration={displayTimeout}
        action={handleClose ? action : null}
    />)
}

Toaster.propTypes = {
    open: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    handleClose: PropTypes.func
}

export default React.memo(Toaster);


