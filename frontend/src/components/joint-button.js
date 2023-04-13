import { Button, Typography, Box } from "@mui/material"
import { theme } from "../theme"

export const JointButton = ( {info} ) => {
    const getRadius = (index) => {
        return index === 0 ? '20px 0 0 20px' : '0 20px 20px 0'
    }

    return (
        <Box display='flex' flexDirection='row'>
            {info.map((btn, index) => {
                return (
                    <Button key={index} variant='outlined' onClick={btn['click']} sx={{border: 2, background: theme.colors.white, borderColor: theme.colors.pink, borderRadius: getRadius(index), m: 0}}>
                        <Typography color={theme.colors.pink} fontWeight={600}>{btn['text']}</Typography>
                    </Button>   
                )
            })}
        </Box>
    )
}
