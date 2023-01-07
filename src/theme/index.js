import React, { useMemo } from 'react';
import { CssBaseline, StyledEngineProvider, ThemeProvider, createTheme } from '@mui/material'
import palette from './palette';
import shadows from './shadows';
import customShadows from './shadows/customShadows';
import typography from './typography';
import GlobalStyles from './globalStyles';
import ComponentsOverrides from './overrides';

const AppThemeProvider = ({ children }) => {

    const options = useMemo(() => ({
        palette,
        shape: {
            borderRadius: 12,
            borderRadiusSm: 16,
            borderRadiusMd: 20
        },
        breakpoints: {
            values: {
                xs: 0,
                sm: 600,
                md: 900,
                lg: 1200,
                xl: 1536
            }
        },
        shadows: shadows(),
        customShadows: customShadows(),
        typography
    }), []);

    const theme = createTheme(options);
    theme.components = ComponentsOverrides(theme);

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <GlobalStyles />
                {children}
            </ThemeProvider>

        </StyledEngineProvider>
    )
}

export default AppThemeProvider;