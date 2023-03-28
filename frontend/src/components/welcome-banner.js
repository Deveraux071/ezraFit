import { Box, Typography } from "@mui/material"

export const WelcomeBanner = () => {
    return (
        <Box display='flex' flexDirection='row' alignItems='center' height='15vh' sx={{
            background: 'rgba(255, 158, 158, 0.25)',
        }}>
            <Typography fontSize='3rem' fontWeight={800} sx={{pl: 10}}>Welcome!</Typography>
        </Box>
    )
}