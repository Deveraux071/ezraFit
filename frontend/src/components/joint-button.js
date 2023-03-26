import { Button, Typography, Box } from "@mui/material"
import { theme } from "../theme"

export const JointButton = ( {onClick1, onClick2, text1, text2} ) => {
    return (
        <Box display='flex' flexDirection='row'>
            <Button variant='outlined' onClick={onClick1} sx={{border: 2, background: theme.colors.white, borderColor: theme.colors.pink, borderRadius: '20px 0 0 20px', m: 1, marginRight: 0, }}>
                <Typography color={theme.colors.pink} fontWeight={600}>{text1}</Typography>
            </Button>
            <Button variant='outlined' onClick={onClick2} sx={{border: 2, background: theme.colors.white, borderColor: theme.colors.pink, borderRadius: '0 20px 20px 0', m: 1, marginLeft: 0, }}>
                <Typography color={theme.colors.pink} fontWeight={600}>{text2}</Typography>
            </Button>
        </Box>
        
    )
}
