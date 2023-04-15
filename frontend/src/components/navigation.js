import { Logo } from "../assets/logo"
import { useNavigate } from 'react-router-dom';
import { theme } from "../theme"
import { JointButton } from "./joint-button";
import { Grid, Typography, Divider, Box } from "@mui/material";
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
            <Grid container justifyContent='space-between' display='flex' flexDirection='row' alignItems='center'>
                <Grid item width="500px" display='flex' flexDirection='row' sx={{p: 2}} justifyContent='center'>
                    <Logo width='50px'/>
                    <Typography color={theme.colors.black} fontSize='2.25rem' fontWeight={700} sx={{paddingLeft: 2, paddingRight: 2}}>EzraFit</Typography>
                    <Divider orientation="vertical" variant="middle" flexItem/>
                    <Typography color={theme.colors.black} fontSize='1.75rem' fontWeight={500} sx={{paddingLeft: 2, paddingRight: 2, paddingTop: "7px"}}>Get your fit</Typography>
                </Grid>
                <Grid item display='flex' flexDirection='row' justifyContent='flex-end' sx={{marginRight: 2}}>
                    <JointButton info={btns}/>
                </Grid>
            </Grid>
        </Box>
    )
}
