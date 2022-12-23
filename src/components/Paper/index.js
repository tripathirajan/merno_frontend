import { Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledPaper = styled((props) => <Paper  {...props} />)(({ theme }) => ({
    padding: theme.spacing(2)
}));

const SecondaryPaper = styled((props) => <StyledPaper  {...props} />)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.main,
    color: '#fff',
}));


const AppPaper = ({ darkMode = false, children, ...rest }) => {
    if (darkMode) {
        return (<SecondaryPaper {...rest}>{children}</SecondaryPaper>)
    }
    return (<StyledPaper {...rest}>{children}</StyledPaper>)
}

export default AppPaper