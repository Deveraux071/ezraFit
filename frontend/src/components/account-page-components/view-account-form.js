import { theme } from "../../theme"
import { Box, Typography, Grid, Button } from "@mui/material"
import { EditButton } from "../edit-button"

export const ViewAccountForm = ( { name, email, changePW, onEdit } ) => {
    return (
        <Box display='flex' flexDirection='column' justifyContent='center' width='35%' alignItems='center' sx={{m:'auto'}}>
            <Box display='flex' flexDirection='row' justifyContent='flex-end' width='100%'>
                <EditButton onClick={onEdit} fontSize='1.25rem' fontWeight={650}/>
            </Box>
            <Grid container sx={{m: 1}}>
                <Grid item xs={4} display='flex' flexDirection='row' justifyContent='flex-end' sx={{pr: 2}}>
                    <Typography fontSize='1.5rem' fontWeight={650}>Name: </Typography>
                </Grid>
                <Grid item xs={8}>
                    <Typography fontSize='1.5rem'>{name}</Typography>
                </Grid>
            </Grid>
            <Grid container sx={{m: 1}}>
                <Grid item xs={4} display='flex' flexDirection='row' justifyContent='flex-end' sx={{pr: 2}}>
                    <Typography fontSize='1.5rem' fontWeight={650}>Email: </Typography>
                </Grid>
                <Grid item xs={8}>
                    <Typography fontSize='1.5rem'>{email}</Typography>
                </Grid>
            </Grid>
            <Grid display='flex' flexDirection='row' container sx={{m: 1}} alignItems='center'>
                <Grid item xs={4} display='flex' flexDirection='row' justifyContent='flex-end' sx={{pr: 2}}>
                    <Typography fontSize='1.5rem' fontWeight={650}>Password: </Typography>
                </Grid>
                <Grid item xs={8}>
                    <Button variant='outlined' onClick={() => changePW()} sx={{border: 2, background: theme.colors.white, borderColor: theme.colors.dark_gray, borderRadius: '20px', m: 1}}>
                        <Typography fontSize='1rem' color={theme.colors.dark_gray} fontWeight={600}>Change Password</Typography>
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
}