import React from 'react'
import PropTypes from 'prop-types';
import { NavLink as RouterLink } from 'react-router-dom';
import { Box, List, ListItemText, ListItemIcon, ListItemButton, ListSubheader } from '@mui/material';
import { styled } from '@mui/material/styles';
import icons from '../../../config/icons';

export const StyledNavItem = styled((props) => <ListItemButton disableGutters {...props} />)(({ theme }) => ({
    ...theme.typography.body2,
    height: 48,
    position: 'relative',
    textTransform: 'capitalize',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    color: theme.palette.text.secondary,
    borderRadius: '8px',
    '&:before': {
        top: 0,
        right: 0,
        width: 3,
        bottom: 0,
        content: "''",
        display: 'none',
        position: 'absolute',
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4,
        backgroundColor: theme.palette.primary.main
    },
    '&.active': {
        color: theme.palette.secondary.main,
        backgroundColor: theme.palette.action.selected,
        fontWeight: theme.typography.fontWeightMedium
    },
}));

export const StyledNavItemIcon = styled(ListItemIcon)({
    width: 22,
    height: 22,
    color: 'inherit',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
});

const StyledList = styled((props) => <List {...props} />)(({ theme }) => ({
    // padding: theme.spacing(0, 2)
}));

const StylesListSubheader = styled((props) => <ListSubheader {...props} />)(({ theme }) => ({
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    padding: theme.spacing(1, 1, 1),
    color: theme.palette.text.secondary,
    lineHeight: 1
}));

const NavSection = ({ data = [], ...other }) => {
    return (
        <Box {...other}>
            {
                data.map((items, i) => (
                    <StyledList
                        key={`lstx_${i}`}
                        disablePadding
                        subheader={
                            <StylesListSubheader component="div">
                                {items.title}
                            </StylesListSubheader>
                        }
                    >
                        {items.children.map((item) => (!item.disabled &&
                            <NavItem key={item.title} item={item} />
                        ))}
                    </StyledList>
                ))
            }
        </Box>
    )
}

NavSection.propTypes = {
    data: PropTypes.array,
}


function NavItem({ item }) {
    const { title, path, icon, info } = item;
    const AppIcon = icons[icon];
    return (
        <StyledNavItem
            component={RouterLink}
            to={path}
        >
            <StyledNavItemIcon><AppIcon sx={{ fontSize: '1.2rem' }} /></StyledNavItemIcon>

            <ListItemText disableTypography primary={title} />

            {info && info}
        </StyledNavItem>
    );
}
NavItem.propTypes = {
    item: PropTypes.object,
};

export default NavSection