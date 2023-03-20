import { Button, Typography } from "@mui/material"
import { theme } from "../theme"

export const PinkFillButton = ( {onClick, text, icon} ) => {
    return (
        <Button onClick={onClick} startIcon={icon} sx={{background: theme.colors.pink, borderRadius: '20px', m: 1, width:'50%'}}>
            <Typography color={theme.colors.white}>{text}</Typography>
        </Button>
    )
}