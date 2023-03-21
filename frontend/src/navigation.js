import { Logo } from "./logo"

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
            <Grid container>
                <Grid item xs={2}>
                    <Logo/>
                    <Typography>EzraFit</Typography>
                </Grid>
                <Divider orientation="vertical" flexItem/>
                <Grid item xs={5}>
                    <Typography>Get your fit</Typography>
                </Grid>
                <Grid item xs={1}>
                    <Link onClick={navigateTo('/about')}>About Us</Link>
                </Grid>
                <Grid item xs={1}>
                    <Link onClick={navigateTo('/contact')}>About Us</Link>
                </Grid>
                {loggedIn ? (
                    <Grid item xs={3} display='flex' flexDirection='row'>
                        <PinkOutlinedButton text='Log in' onClick={navigateTo('/login')}></PinkOutlinedButton>
                        <PinkOutlinedButton text='Sign up' onClick={navigateTo('/register')}></PinkOutlinedButton>
                    </Grid>
                ) : (
                    <Grid item xs={3} display='flex' flexDirection='row'>
                        <PinkOutlinedButton text='Settings' onClick={navigateTo('/settings')}></PinkOutlinedButton>
                        <PinkOutlinedButton text='Log out' onClick={(e) => logOut(e)}></PinkOutlinedButton>
                    </Grid>
                )}
                
            </Grid>
        </Box>
    )
}