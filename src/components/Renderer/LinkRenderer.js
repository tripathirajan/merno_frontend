import React from 'react'
import PropTypes from 'prop-types'
import {
    Link,
} from '@mui/material';
import { NavLink as RouterLink } from 'react-router-dom';

const LinkRenderer = props => {
    const { text, url, tooltip } = props;

    return <Link title={tooltip || text} component={RouterLink} to={url} sx={{
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden'
    }}>
        {text}
    </Link>
}

LinkRenderer.propTypes = {
    text: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
}

export default LinkRenderer