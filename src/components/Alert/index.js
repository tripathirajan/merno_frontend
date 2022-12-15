import React from 'react'
import PropTypes from 'prop-types'
import { ALERT_TYPE_ERROR, ALERT_TYPE_INFO, ALERT_TYPE_SUCCESS, ALERT_TYPE_WARNING } from '../../constants'
import Alert from '@mui/material/Alert';


const AppAlert = ({ mode = '', body = '', severity = ALERT_TYPE_ERROR, sx, ...rest }) => {
    return (
        <Alert severity={severity} sx={{ width: '100%', ...sx }} {...rest}>{body}</Alert>
    )
}

AppAlert.propTypes = {
    body: PropTypes.string.isRequired,
    severity: PropTypes.oneOf([ALERT_TYPE_ERROR, ALERT_TYPE_INFO, ALERT_TYPE_SUCCESS, ALERT_TYPE_WARNING])
}

export default AppAlert;