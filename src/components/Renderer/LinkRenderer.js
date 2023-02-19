import React from 'react'
import PropTypes from 'prop-types'
import {
    Link,
} from '@mui/material';
import { NavLink as RouterLink } from 'react-router-dom';

const LinkRenderer = props => {
    const { text, url } = props;

    return <Link component={RouterLink} variant="subtitle2" to={url}>
        {text}
    </Link>
}

LinkRenderer.propTypes = {
    text: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
}

export default LinkRenderer