import { Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledPaper = styled((props) => <Paper  {...props} />)(({ theme }) => ({
    padding: theme.spacing(2)
}));

const SecondaryPaper = styled((props) => <StyledPaper  {...props} />)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.main,
    color: '#fff',
}));

const LightPaper = styled((props) => <StyledPaper  {...props} />)(({ theme }) => ({
    backgroundColor: theme.palette.background.neutral,
    color: '#fff',
}));


const AppPaper = ({ variant = 'default', children, ...rest }) => {
    switch (variant) {
        case 'dark':
            return (<SecondaryPaper elevation={0} {...rest}>{children}</SecondaryPaper>);
        case 'light':
            return (<LightPaper elevation={0} {...rest}>{children}</LightPaper>);
        default:
            return (<StyledPaper variant="outlined" {...rest}>{children}</StyledPaper>);
    }

}

export default AppPaper