import { Box, Grid, TextField, Typography, Dialog } from "@mui/material"
import { PinkOutlineButton } from "../pink-outline-button"
import { PinkFillButton } from "../pink-fill-button"
import { useAuth } from "../../contexts/auth-context";
import { useState } from "react";
import { theme } from "../../theme";

export const PasswordChangePopup = ( {onCancel, open}) => {
    const { updatePassword } = useAuth()
    const [err, setErr] = useState('')

    const onSave = async (e) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        const old_pw = data.get('current_pw')
        const new_pw = data.get('new_pw')
        const new_pw_rep = data.get('con_new_pw')
        
        if (old_pw === '' && new_pw === '' && new_pw_rep === '' ) {
            onCancel()
        }
        else if (old_pw !== localStorage.getItem('password')) {
            setErr('Current password is incorrect.')
        }
        else if (new_pw === '' || new_pw_rep === '' || new_pw !== new_pw_rep) {
            setErr('New passwords do not match.')
        }
        else {
            try {
                await updatePassword(new_pw)
                localStorage.setItem('password', new_pw)
                onCancel()
            } catch (e) {
                console.log(e)
            }
        }
    }

    return (
        <Dialog onClose={onCancel} open={open} fullWidth maxWidth='lg'>
            <Box component='form' onSubmit={onSave} noValidate display='flex' flexDirection='column' justifyContent='center' width='100%' alignItems='center' sx={{m:'auto', p:4,  zIndex: 100, borderRadius: '20px', boxShadow: 2}}>
                <Typography fontSize='1.5rem' fontWeight={650}>Change Password</Typography>
                <Grid display='flex' flexDirection='row' container sx={{m: 1}} alignItems='center'>
                    <Grid item xs={4} display='flex' flexDirection='row' justifyContent='flex-end' sx={{pr: 2}}>
                        <Typography fontSize='1.5rem' fontWeight={650}>Current Password: </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="current_pw"
                            name="current_pw"
                            autoComplete="current_pw"
                            autoFocus
                            inputProps={{ style: {fontSize: '1.5rem'}}}
                        />
                    </Grid>
                </Grid>
                <Grid display='flex' flexDirection='row' container sx={{m: 1}} alignItems='center'>
                    <Grid item xs={4} display='flex' flexDirection='row' justifyContent='flex-end' sx={{pr: 2}}>
                        <Typography fontSize='1.5rem' fontWeight={650}>New Password: </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="new_pw"
                            name="new_pw"
                            autoComplete="new_pw"
                            autoFocus
                            inputProps={{ style: {fontSize: '1.5rem'}}}
                        />
                    </Grid>
                </Grid>
                <Grid display='flex' flexDirection='row' container sx={{m: 1}} alignItems='center'>
                    <Grid item xs={4} display='flex' flexDirection='row' justifyContent='flex-end' sx={{pr: 2}}>
                        <Typography fontSize='1.5rem' fontWeight={650}>Confirm New Password: </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="con_new_pw"
                            name="con_new_pw"
                            autoComplete="con_new_pw"
                            autoFocus
                            inputProps={{ style: {fontSize: '1.5rem'}}}
                        />
                    </Grid>
                </Grid>
                <Box width='100%' display='flex' flexDirection='row' justifyContent='flex-end' sx={{mt: 3}}>
                    <PinkOutlineButton text='Cancel' onClick={onCancel} width='15%'/>
                    <PinkFillButton text='Save Changes' width='25%' type='submit'/>
                </Box>
                {err !== '' && <Typography  fontSize='1.5rem' color={theme.colors.red}>{err}</Typography>}
            </Box>
        </Dialog>
    )
}