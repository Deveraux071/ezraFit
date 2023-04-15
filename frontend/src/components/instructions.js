import { Box, Typography } from "@mui/material"

export const Instructions = ( {imageType} ) => {
    let info = 'with your arms spread out.';
    if (imageType === 'side') {
        info = 'looking towards the left.'
    }
    else if (imageType === 'leg') {
        info = 'showing your full body.'
    }

    const instructions = imageType === 'check' ? ["Get out 9x6 inch black and white checkboard image, where the side length of each square is 2.84cm long."] : []
    instructions.push(... [
        `Set the desired timer length, in seconds, in the "Timer" dropdown below.`,
        `Press the pink "START" button to start the countdown.`,
    ])
    instructions.push(imageType === 'check' ? `Hold up the checkboard to your chest.'` : `Stand in the silhouette ${info}`)

    return (
        <Box display='flex' flexDirection='column'>
            <Typography fontSize='2rem' sx={{marginTop: 5, marginBottom: 2}} justifyContent='center'>Instructions</Typography>
            <Box sx={{m: 1}}>
                {instructions.map((instruction, i) => 
                    <Typography fontSize='1.2rem' key={instruction}>
                        {`${i+1}. ${instruction}`}
                    </Typography>
                )}
                <Typography fontSize='1.2rem' marginTop="5px" marginBottom="10px" fontWeight="600">
                    EzraFit will automatically take a picture when the timer runs out!
                </Typography>
            </Box>
        </Box>
    )
}
