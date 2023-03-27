import { Button, Typography } from "@mui/material"
import { theme } from "../theme"

export const PinkOutlineButton = ( {onClick, text, icon, fontSize} ) => {
    return (
        <Button variant='outlined' startIcon={icon} onClick={onClick} sx={{background: theme.colors.white, borderColor: theme.colors.pink, borderRadius: '20px', m: 1, width: '50%'}}>
            <Typography fontSize={fontSize} color={theme.colors.pink}>{text}</Typography>
        </Button>
    )
}
