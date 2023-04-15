import { Button, Typography } from "@mui/material"
import { theme } from "../theme"

export const PinkOutlineButton = ( {onClick, text, icon, fontSize, width='50%'} ) => {
    return (
        <Button 
            variant='outlined' 
            startIcon={icon} 
            onClick={onClick} 
            sx={{'&:hover': { color: theme.colors.dark_pink, borderColor: theme.colors.dark_pink, backgroundColor: theme.colors.faint_pink }, background: theme.colors.white, borderColor: theme.colors.pink, color: theme.colors.pink, borderRadius: '20px', m: 1, width: width}}>
                <Typography fontSize={fontSize} >{text}</Typography>
        </Button>
    )
}
