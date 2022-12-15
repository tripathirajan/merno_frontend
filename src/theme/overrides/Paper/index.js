export default function Paper(theme) {
    return {
        MuiPaper: {
            defaultProps: {
                elevation: 8
            },
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                    padding: theme.spacing(1),
                },
            },
        },
    };
}