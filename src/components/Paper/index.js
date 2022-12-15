import { Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

const SecondaryPaper = styled((props) => <Paper  {...props} />)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.main,
    color: '#fff'
}));


const AppPaper = ({ darkMode = false, children, ...rest }) => {
    if (darkMode) {
        return (<SecondaryPaper {...rest}>{children}</SecondaryPaper>)
    }
    return (<Paper {...rest}>{children}</Paper>)
}

export default AppPaper