import { Typography, Box } from "@mui/material"
import { theme } from "../theme"

export default function Calculating( {points} ) {
    console.log(points)
    return (
        <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' sx={{height: '100vh'}}>
            <Typography fontSize='2rem' fontWeight={800}>
                Please stand by while we calculate your measurements! 
            </Typography>
            <Typography fontSize='1.5rem' fontWeight={700} color={theme.colors.gray}>
                Loading... 
            </Typography>
        </Box>
        
    )
}
