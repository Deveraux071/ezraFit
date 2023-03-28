import { Button, Typography } from "@mui/material"
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { theme } from "../theme"

export const EditButton = ( {onClick, fontSize, fontWeight} ) => {
    return (
        <Button variant='outlined' startIcon={<EditOutlinedIcon/>} onClick={onClick} sx={{border: 0, background: theme.colors.white, m: 1, width: '50%', textTransform: 'none'}}>
            <Typography fontSize={fontSize} fontWeight={fontWeight} color={theme.colors.black}>Edit</Typography>
        </Button>
    )
}