import { Button, Typography } from "@mui/material"
import { theme } from "../theme"

export const PinkFillButton = ( {onClick, text, icon, fontSize, width='50%', type, testId} ) => {
    return (
        <Button 
            data-testid={testId} 
            type={type} 
            onClick={onClick} 
            startIcon={icon} 
            sx={{'&:hover': { background: theme.colors.dark_pink }, background: theme.colors.pink, borderRadius: '20px', m: 1, width:width}}
            >
                <Typography fontSize={fontSize} color={theme.colors.white}>{text}</Typography>
        </Button>
    )
}
