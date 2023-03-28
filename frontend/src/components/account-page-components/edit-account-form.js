import { theme } from "../../theme"
import { Box, Typography, Grid, Button, TextField } from "@mui/material"
import { PinkOutlineButton } from "../pink-outline-button"
import { PinkFillButton } from "../pink-fill-button"
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

export const EditAccountForm = ( { name, email, changePW, onDelete, onCancel, onSave } ) => {
    return (
        <Box component="form" noValidate display='flex' flexDirection='column' justifyContent='center' width='50%' alignItems='center' sx={{m:'auto'}} >
            <Grid container sx={{m: 1}}>
                <Grid item xs={4} display='flex' flexDirection='row' justifyContent='flex-end' sx={{pr: 2}}>
                    <Typography fontSize='1.5rem' fontWeight={650}>Name: </Typography>
                </Grid>
                <Grid item xs={8}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label={name}
                        id="email"
                        name="email"
                        autoFocus
                    />
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
            <Box display='flex' flexDirection='row' justifyContent='space-between' alignItems='center' sx={{mt: 5}}>
                <DeleteForeverOutlinedIcon fontSize='large' sx={{ color: theme.colors.red, m: 1}}/>
                <Button variant='outlined' onClick={onDelete} sx={{background: theme.colors.white, borderColor: theme.colors.red, borderRadius: '20px', m: 1}}>
                    <Typography sx={{color: theme.colors.red}} fontSize='1.25rem' fontWeight={650}>
                        Delete My Account
                    </Typography>
                </Button>
            </Box>
            <Box width='100%' display='flex' flexDirection='row' justifyContent='flex-end' sx={{mt: 10}}>
                <PinkOutlineButton text='Cancel' onClick={onCancel} width='15%'/>
                <PinkFillButton text='Save Changes' onClick={onSave} width='25%'/>
            </Box>
        </Box>
    )
}