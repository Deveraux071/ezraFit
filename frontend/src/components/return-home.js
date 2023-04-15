import { Typography, Link } from "@mui/material"
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { theme } from "../theme";

export const ReturnToHome = ( {onClick} ) => {
    return (
        <Link component="button" onClick={onClick} underline="always" display='flex' flexDirection='row'>
            <NavigateBeforeIcon/>
            <Typography fontWeight={800} sx={{color: theme.colors.black}}>Return to Home</Typography>
        </Link>
    )   
}
