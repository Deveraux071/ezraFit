import { Logo } from "../assets/logo"
import { useNavigate } from 'react-router-dom';
import { theme } from "../theme"
import { JointButton } from "./joint-button";
import { Grid, Link, Typography, Divider, Box } from "@mui/material";

export const Navigation = () => {
    const navigate = useNavigate();
    const loggedIn = false;
    
    const navigateTo = (url) => {
        navigate(url);
    }

    const logOut = (e) => {
        e.preventDefault();
        // delete credentials from local storage/cookies
        navigate('/login')
    }
    return (
        <Box>
            <Grid container alignItems='center' display='flex' flexDirection='row'>
                <Grid item xs={2} display='flex' flexDirection='row' sx={{p: 2}} justifyContent='flex-end'>
                    <Logo width='18%'/>
                    <Typography color={theme.colors.black} fontSize='2.25rem' fontWeight={700} sx={{paddingLeft: 2, paddingRight: 2}}>EzraFit</Typography>
                </Grid>
                <Divider orientation="vertical" variant="middle" flexItem/>
                <Grid item xs={5} sx={{p: 2}} display='flex' flexDirection='row'>
                    <Typography color={theme.colors.black} fontSize='1.75rem' fontWeight={500}>Get your fit</Typography>
                </Grid>
                <Grid item xs={1} display='flex' flexDirection='row' justifyContent='center'>
                    <Link onClick={() => navigateTo('/about')} sx={{color: theme.colors.pink, fontSize:'1.15rem'}} underline='none'>About Us</Link>
                </Grid>
                <Grid item xs={1} display='flex' flexDirection='row' justifyContent='center'>
                    <Link onClick={() => navigateTo('/contact')} sx={{color: theme.colors.pink, fontSize:'1.15rem'}} underline='none'>Contact</Link>
                </Grid>
                <Grid item xs={2} display='flex' flexDirection='row' justifyContent='center' sx={{marginLeft: 3, marginRight: 3}}>
                    {loggedIn ? (
                        <JointButton text1='Settings' text2='Log out' onClick1={() => navigateTo('/settings')} onClick2={() => logOut()}/>
                    ) : (
                        <JointButton text1='Log in' text2='Sign up' onClick1={() => navigateTo('/login')} onClick2={() => navigateTo('/register')}/>
                    )}
                </Grid>
                
            </Grid>
        </Box>
    )
}
