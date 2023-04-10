import { Box, Typography, Dialog } from "@mui/material"
import { PinkOutlineButton } from "./pink-outline-button"

export const CalculatedPopup = ( {onCancel, open, size} ) => {
    return (
        <Dialog onClose={onCancel} open={open} fullWidth maxWidth='md'>
            <Box display='flex' flexDirection='column' justifyContent='center' width='100%' alignItems='center' sx={{m:'auto', p:4,  zIndex: 100, borderRadius: '20px', boxShadow: 2}}>
                <Typography fontSize='1.5rem' fontWeight={650}>Here are your Measurements!</Typography>
                <Typography fontSize='1.25rem' fontWeight={550}>Upper Body: {size.upper}</Typography>
                <Typography fontSize='1.25rem' fontWeight={550}>Lower Body: {size.lower}</Typography>
                <Box width='100%' display='flex' flexDirection='row' justifyContent='flex-end' sx={{mt: 3}}>
                    <PinkOutlineButton text='Close' onClick={onCancel} width='15%'/>
                </Box>
            </Box>
        </Dialog>
    )
}
