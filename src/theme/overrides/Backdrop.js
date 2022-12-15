import { alpha } from '@mui/material/styles'

// ----------------------------------------------------------------------

export default function Backdrop(theme) {
    return {
        MuiBackdrop: {
            styleOverrides: {
                root: {
                    backdropFilter: 'blur(4px)',
                    WebkitBackdropFilter: 'blur(4px)', // Fix on Mobile
                    backgroundColor: alpha(theme.palette.grey[500], 0.2),
                    '&.MuiBackdrop-invisible': {
                        background: 'transparent !important',
                        backdropFilter: 'blur(0) !important',
                        WebkitBackdropFilter: 'blur(0)!important'
                    }
                }
            }
        }
    }
}