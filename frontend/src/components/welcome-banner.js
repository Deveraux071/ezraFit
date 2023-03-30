import { Box, Typography } from "@mui/material"

export const WelcomeBanner = ( {text} ) => {
    return (
        <Box display='flex' flexDirection='row' alignItems='center' justifyContent='center' height='15vh' sx={{
            background: 'rgba(255, 158, 158, 0.25)',
        }}>
            <Typography fontSize='3rem' fontWeight={800} sx={{pl: 10}}>{text}</Typography>
        </Box>
    )
}