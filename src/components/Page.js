import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';
import { forwardRef } from 'react';
import { Box, Container, IconButton, Stack, Typography } from '@mui/material';
import ArrowBackIosNewTwoToneIcon from '@mui/icons-material/ArrowBackIosNewTwoTone';
import { useNavigate } from 'react-router-dom';

const Page = forwardRef((props, ref) => {
    const { children, title = '', actions, legend, subtitle, enableGoBack = false, ...other } = props;
    const navigate = useNavigate();

    const handleOnBackClick = () => {
        navigate(-1);
    }
    return (
        <PageWithTitle title={title} ref={ref} {...other}>
            <Container>
                <Stack direction="column" alignItems="flexStart" justifyContent="flexStart" mb={2}>
                    <Stack
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                    >
                        {
                            enableGoBack && <IconButton title="Go Back" color="secondary" size="normal" onClick={handleOnBackClick}>
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
        </PageWithTitle>
    )
});

Page.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string,
    enableGoBack: PropTypes.bool
};

export default Page;

export const PageWithTitle = forwardRef((props, ref) => {
    const { children, title = '', ...other } = props;

    return (
        <Box ref={ref} {...other}>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            {children}
        </Box>
    )
});
PageWithTitle.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string
};