import { Link, Box, Typography } from "@mui/material"
import { theme } from "../theme"

export const IndividualTab = ({onClick, text, icon, isActive}) => {
    return (
        <Link component="button" fontSize='1.5rem' fontWeight={800} color={isActive ? theme.colors.pink : theme.colors.gray} onClick={onClick}>
            <Box display='flex' flexDirection='row' justifyContent='center' alignItems='center'>
                {icon}
                
                <Typography sx={{ml: 1}} fontSize='1.5rem' fontWeight={800}>{text}</Typography>
            </Box>
        </Link>
    )
}