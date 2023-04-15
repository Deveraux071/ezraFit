import { Logo } from "../assets/logo"
import { useNavigate } from 'react-router-dom';
import { theme } from "../theme"
import { JointButton } from "./joint-button";
import { Grid, Link, Typography, Divider, Box } from "@mui/material";
import { useAuth } from "../contexts/auth-context";

export const Navigation = ( {loggedIn} ) => {
    const navigate = useNavigate();
    const { logout } = useAuth(); 

    const logOut = async () => {
        await logout();
        navigate('/login')
    }

    let btns;
    loggedIn ? (btns = [{'text': 'Account', 'click': () => navigate('/account')}, {'text': 'Log out', 'click': () => logOut()}]) : (btns = [{'text': 'Log in', 'click': () => navigate('/login')}, {'text': 'Sign up', 'click': () => navigate('/register')}])

    return (
        <Box sx={{backgroundColor: theme.colors.white}}>
            <Grid container alignItems='center' display='flex' flexDirection='row'>
                <Grid item xs={2} display='flex' flexDirection='row' sx={{p: 2}} justifyContent='flex-end'>
                    <Logo width='18%'/>
                    <Typography color={theme.colors.black} fontSize='2.25rem' fontWeight={700} sx={{paddingLeft: 2, paddingRight: 2}}>EzraFit</Typography>
                </Grid>
                <Divider orientation="vertical" variant="middle" flexItem/>
                <Grid item xs={6} sx={{p: 2}} display='flex' flexDirection='row'>
                    <Typography color={theme.colors.black} fontSize='1.75rem' fontWeight={500}>Get your fit</Typography>
                </Grid>
                <Grid item xs={3} display='flex' flexDirection='row' justifyContent='flex-end' sx={{marginLeft: 3}}>
                    <JointButton info={btns}/>
                </Grid>
            </Grid>
        </Box>
    )
}
