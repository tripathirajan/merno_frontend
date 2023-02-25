import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';
import { forwardRef } from 'react';
import { Box, Container, IconButton, Stack, Typography } from '@mui/material';
import ArrowBackIosNewTwoToneIcon from '@mui/icons-material/ArrowBackIosNewTwoTone';
const Page = forwardRef((props, ref) => {
    const { children, title = '', actions, legend, subtitle, onBackClick, ...other } = props;

    return (
        <Box ref={ref} {...other}>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <Container>
                <Stack direction="column" alignItems="flexStart" justifyContent="flexStart" mb={2}>
                    <Stack
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                    >
                        {
                            onBackClick && <IconButton title="Go Back" color="secondary" size="normal" onClick={onBackClick}>
                                <ArrowBackIosNewTwoToneIcon fontSize="inherit" />
                            </IconButton>
                        }
                        <Typography variant="h4" color="secondary">
                            {legend}
                        </Typography>
                    </Stack>
                    {
                        subtitle && <Typography variant="caption" gutterBottom>
                            {subtitle}
                        </Typography>
                    }

                </Stack>
                {children}
            </Container>
        </Box>
    )
});

Page.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string
};

export default Page;