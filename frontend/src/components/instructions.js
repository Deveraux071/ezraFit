import { Box, Typography } from "@mui/material"

export const Instructions = ( {imageType} ) => {
    return (
        <Box display='flex' flexDirection='column'>
            <Typography fontSize='2rem' sx={{marginTop: 5, marginBottom: 3}} justifyContent='center'>Instructions</Typography>
            <Box sx={{m: 1}}>
                <Typography fontSize='1.2rem'>
                    1. Set the timer to your desired length.
                </Typography>
                <Typography fontSize='1.2rem'>
                    2. Press start button.
                </Typography>
                <Typography fontSize='1.2rem'>
                    {imageType === 'check' ? '3. Hold up the checkboard to your chest.' : '3. Stand in the silhouette.'}
                </Typography>
                <Typography fontSize='1.2rem'>
                    EzraFit will automatically take a picture when the timer runs out!
                </Typography>
            </Box>
        </Box>
    )
}
