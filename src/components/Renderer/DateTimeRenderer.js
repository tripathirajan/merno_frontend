import React from 'react'
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { DATETIME_FORMAT } from '../../constants';

const DateTimeRenderer = props => {
    const { value } = props;
    const renderValue = (value && dayjs(value).format(DATETIME_FORMAT)) || 'N/A';
    return (<div>{renderValue}</div>)
}

DateTimeRenderer.propTypes = {
    value: PropTypes.any.isRequired
}
export default DateTimeRenderer