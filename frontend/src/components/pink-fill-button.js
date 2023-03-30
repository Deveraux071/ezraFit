import { Button, Typography } from "@mui/material"
import { theme } from "../theme"

export const PinkFillButton = ( {onClick, text, icon, fontSize, width='50%', type} ) => {
    return (
        <Button type={type} onClick={onClick} startIcon={icon} sx={{background: theme.colors.pink, borderRadius: '20px', m: 1, width:width}}>
            <Typography fontSize={fontSize} color={theme.colors.white}>{text}</Typography>
        </Button>
    )
}
