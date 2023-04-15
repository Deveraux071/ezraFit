import { Logo } from "../assets/logo"
import { useNavigate } from 'react-router-dom';
import { theme } from "../theme"
import { JointButton } from "./joint-button";
import { Grid, Link, Typography, Divider, Box } from "@mui/material";
import { useAuth } from "../contexts/auth-context";

const links = [{
    title: 'About Us',
    nav: '/about',
}]

export const Navigation = ( {loggedIn} ) => {
    const navigate = useNavigate();
    const { logout } = useAuth(); 

    const logOut = async () => {
        await logout();
        navigate('/login')
    }

    let btns;
    loggedIn ? (btns = [{'text': 'Settings', 'click': () => navigate('/account')}, {'text': 'Log out', 'click': () => logOut()}]) : (btns = [{'text': 'Log in', 'click': () => navigate('/login')}, {'text': 'Sign up', 'click': () => navigate('/register')}])

    return (
        <Box sx={{backgroundColor: theme.colors.white}}>
            <Grid container alignItems='center' display='flex' flexDirection='row'>
                <Grid item xs={2} display='flex' flexDirection='row' sx={{p: 2}} justifyContent='flex-end'>
                    <Logo width='18%'/>
                    <Typography color={theme.colors.black} fontSize='2.25rem' fontWeight={700} sx={{paddingLeft: 2, paddingRight: 2}}>EzraFit</Typography>
                </Grid>
                <Divider orientation="vertical" variant="middle" flexItem/>
                <Grid item xs={5} sx={{p: 2}} display='flex' flexDirection='row'>
                    <Typography color={theme.colors.black} fontSize='1.75rem' fontWeight={500}>Get your fit</Typography>
                </Grid>
                {links.map((link, index) => {
                    return (
                        <Grid item key={index} xs={1} display='flex' flexDirection='row' justifyContent='center'>
                            <Link onClick={() => navigate(link.nav)} sx={{color: theme.colors.pink, fontSize:'1.15rem'}} underline='none'>{link.title}</Link>
                        </Grid>
                    )
                })}
                <Grid item xs={2} display='flex' flexDirection='row' justifyContent='center' sx={{marginLeft: 3, marginRight: 3}}>
                    <JointButton info={btns}/>
                </Grid>
            </Grid>
        </Box>
    )
}
