import { Typography, Box } from "@mui/material"

export default function Calculating() {
    return (
        <Box display='flex' flexDirection='column'>
            <Typography fontSize='2rem'>
                Please stand by while we calculate your measurements! 
            </Typography>
            <Typography fontSize='1.5rem'>
                Loading... 
            </Typography>
        </Box>
        
    )
}