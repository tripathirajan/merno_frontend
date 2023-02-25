import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { Box, Drawer, Typography } from '@mui/material';
import useResponsive from '../../../hooks/useResponsive';
import Scrollbar from '../../../components/Scrollbar';
import menus from '../../../config/menus';
import NavSection from './NavSection';
import { DRAWER_WIDTH } from '../../../constants';

const NAV_WIDTH = DRAWER_WIDTH;

const SideNav = ({ title = "Merno", openNav, onCloseNav }) => {
    const { pathname } = useLocation();
    const isDesktop = useResponsive('up', 'lg');

    useEffect(() => {
        if (openNav) {
            onCloseNav();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    const renderContent = (
        <Scrollbar
            sx={{
                height: 1,
                '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
            }}
        >
            <Box sx={{ px: 1.5, py: 2, display: 'inline-flex', justifyContent: 'center' }}>
                <Typography variant="h6" component="h6" color="secondary" sx={{
                    fontWeight: 'fontWeightBold'
                }}>{title}</Typography>
            </Box>

            <NavSection data={menus} sx={{ mt: 2 }} mobiledrawer={!isDesktop} />

        </Scrollbar>
    );
    return (
        <Box
            component="nav"
            sx={{
                flexShrink: { lg: 0 },
                width: { lg: NAV_WIDTH },
            }}
        >
            {isDesktop ? (
                <Drawer
                    open
                    variant="permanent"
                    PaperProps={{
                        sx: {
                            width: NAV_WIDTH,
                            bgcolor: 'background.neutral',
                            borderRightStyle: 'none',
                            padding: 1
                        },
                    }}
                >
                    {renderContent}
                </Drawer>
            ) : (
                <Drawer
                    open={openNav}
                    onClose={onCloseNav}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    PaperProps={{
                        sx: { width: NAV_WIDTH },
                    }}
                >
                    {renderContent}
                </Drawer>
            )}
        </Box>
    )
}

export default SideNav