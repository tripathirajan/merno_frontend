import React from 'react'
import PropTypes from 'prop-types'
import { ALERT_TYPE_ERROR, ALERT_TYPE_INFO, ALERT_TYPE_SUCCESS, ALERT_TYPE_WARNING } from '../../constants'
import { Snackbar, Alert, AlertTitle } from '@mui/material';

const alertTitle = {
    error: 'Error!',
    success: 'Success!',
    info: 'Info!',
    warning: 'Warning!',
    default: 'Alert!'
}

const AppAlert = ({ show = false, mode = '', body = '', severity = ALERT_TYPE_ERROR, sx, toast = false, handleClose, ...rest }) => {

    const rendererContent = () => {
        return <Alert severity={severity} sx={{ width: '100%', ...sx }} onClose={handleClose}
            elevation={8}
            {...rest}>
            <AlertTitle>{alertTitle[severity || 'default']}</AlertTitle>
            {body}
        </Alert>;
    }

    if (toast) {
        return (
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={show}
                autoHideDuration={5000}
                onClose={handleClose}>
                {rendererContent()}
            </Snackbar>
        )
    }
    return rendererContent();
}

AppAlert.propTypes = {
    body: PropTypes.string.isRequired,
    severity: PropTypes.oneOf([ALERT_TYPE_ERROR, ALERT_TYPE_INFO, ALERT_TYPE_SUCCESS, ALERT_TYPE_WARNING])
}

export default AppAlert;