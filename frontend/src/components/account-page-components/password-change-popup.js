import { Box, Grid, TextField, Typography, Dialog } from "@mui/material"
import { PinkOutlineButton } from "../pink-outline-button"
import { PinkFillButton } from "../pink-fill-button"

export const PasswordChangePopup = ( {onCancel, onSave, open}) => {
    return (
        <Dialog onClose={onCancel} open={open} fullWidth maxWidth='lg'>
            <Box display='flex' flexDirection='column' justifyContent='center' width='100%' alignItems='center' sx={{m:'auto', p:4,  zIndex: 100, borderRadius: '20px', boxShadow: 2}}>
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
                    <PinkFillButton text='Save Changes' onClick={onSave} width='25%'/>
                </Box>
            </Box>
        </Dialog>
    )
}