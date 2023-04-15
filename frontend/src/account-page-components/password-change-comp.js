import { Grid, Typography, Button } from "@mui/material"
import { theme } from "../theme"

export const PasswordChangeComp = ( {onClick} ) => {
    return (
        <Grid display='flex' flexDirection='row' container sx={{m: 1}} alignItems='center'>
            <Grid item xs={4} display='flex' flexDirection='row' justifyContent='flex-end' sx={{pr: 2}}>
                <Typography fontSize='1.5rem' fontWeight={650}>Password: </Typography>
            </Grid>
            <Grid item xs={8}>
                <Button variant='outlined' onClick={onClick} sx={{border: 2, background: theme.colors.white, borderColor: theme.colors.dark_gray, borderRadius: '20px', m: 1, textTransform: 'none'}}>
                    <Typography fontSize='1.25rem' color={theme.colors.dark_gray} fontWeight={600}>
                        Change Password
                    </Typography>
                </Button>
            </Grid>
        </Grid>
    )
}
