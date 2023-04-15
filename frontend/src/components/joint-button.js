import { ButtonGroup, Button, Typography } from "@mui/material"
import { theme } from "../theme"

export const JointButton = ( {info} ) => {
    const getRadius = (index) => {
        return index === 0 ? '20px 0 0 20px' : '0 20px 20px 0'
    }

    return (
        <ButtonGroup variant= "outlined" >
            {info.map((btn, index) => {
                return (
                    <Button key={index} 
                            variant='outlined' 
                            onClick={btn['click']} 
                            sx={{'&:hover': { border: 2, color: theme.colors.dark_pink, backgroundColor: theme.colors.faint_pink }, border: 2, background: theme.colors.white, borderColor: theme.colors.pink, color: theme.colors.pink, borderRadius: getRadius(index), m: 0}}
                    >
                        <Typography 
                            fontWeight={600}>
                                {btn['text']}
                        </Typography>
                    </Button>   
                )}
            )}
        </ButtonGroup>
    )
}
