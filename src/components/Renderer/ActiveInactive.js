import React from 'react'
import PropTypes from 'prop-types'
import Label from '../Label';

const colors = {
    "Active": 'success',
    "InActive": 'error'
}
const ActiveInactive = props => {
    const { value } = props;
    const rendererValue = Boolean(value) ? 'Active' : 'InActive';
    return (<Label color={colors[rendererValue]} variant="ghost">{rendererValue}</Label>)
}

ActiveInactive.propTypes = {
    value: PropTypes.any.isRequired
}

export default ActiveInactive;