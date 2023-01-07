import { alpha } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function Button(theme) {
    return {
        MuiButton: {
            styleOverrides: {
                root: {
                    boxShadow: theme.shadows[0],
                    '&:hover': {
                        boxShadow: 'none',
                    },
                    borderRadius: Number(theme.shape.borderRadiusMd) * 2
                },
                sizeLarge: {
                    height: 48,
                },
                containedInherit: {
                    color: theme.palette.grey[800],
                    '&:hover': {
                        backgroundColor: theme.palette.grey[400],
                    },
                },
                outlinedInherit: {
                    border: `1px solid ${alpha(theme.palette.grey[500], 0.32)}`,
                    '&:hover': {
                        backgroundColor: theme.palette.action.hover,
                    },
                },
                text: {
                    backgroundColor: theme.palette.grey[200],
                    paddingLeft: 20,
                    paddingRight: 20,
                    '&:hover': {
                        backgroundColor: theme.palette.action.hover,
                    },
                },
                textInherit: {
                    '&:hover': {
                        backgroundColor: theme.palette.action.hover,
                    },
                },
            },
        },
    };
}