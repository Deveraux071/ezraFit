import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { WelcomeBanner } from "../components/welcome-banner";
import { theme } from "../theme"
import { Box, Typography, Grid, Button, TextField } from "@mui/material"
import { PinkOutlineButton } from "../components/pink-outline-button"
import { PinkFillButton } from "../components/pink-fill-button"
import { TabPanel } from '../components/account-page-components/tab-panel';
import { PasswordChangePopup } from '../components/account-page-components/password-change-popup';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { Navigation } from "../components/navigation";

export const EditAccount = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('Leslie Knope')
    const [email, setEmail] = useState('leslieknope@gmail.com')
    const [pwChange, setPwChange] = useState(false);

    const changePW = () => {
        console.log('change')
        setPwChange(true)
    }

    const onDelete = () => {
        console.log('delete')
    }

    const onCancel = () => {
        navigate('/account')
    }

    const onSave = () => {
        console.log('save')
        navigate('/account')
    }

    const onPWCancel = () => {
        setPwChange(false)
    }

    const onPwSave = () => {
        console.log('password saved')
        setPwChange(false)
    }
    return (
        <div>
            <Navigation loggedIn={true}/>
            <WelcomeBanner text='Edit Account'/>
            <TabPanel activeTab='account'/>
            <Box component="form" noValidate display='flex' flexDirection='column' justifyContent='center' width='50%' alignItems='center' sx={{m:'auto'}} >
                <Grid container sx={{m: 1}} display='flex' flexDirection='row' alignItems='center'>
                    <Grid item xs={4} display='flex' flexDirection='row' justifyContent='flex-end' sx={{pr: 2}}>
                        <Typography fontSize='1.5rem' fontWeight={650}>Name: </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <TextField
                            margin="normal"
                            defaultValue={name}
                            required
                            fullWidth
                            id="name"
                            name="name"
                            autoComplete="name"
                            autoFocus
                            inputProps={{ style: {fontSize: '1.5rem'}}}
                            onChange={(e) => {setName(e.target.value)}}
                        />
                    </Grid>
                </Grid>
                <Grid container sx={{m: 1}} display='flex' flexDirection='row' alignItems='center'>
                    <Grid item xs={4} display='flex' flexDirection='row' justifyContent='flex-end' sx={{pr: 2}}>
                        <Typography fontSize='1.5rem' fontWeight={650}>Email: </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <TextField
                            margin="normal"
                            defaultValue={email}
                            required
                            fullWidth
                            id="email"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            inputProps={{ style: {fontSize: '1.5rem'}}}
                            onChange={(e) => {setEmail(e.target.value)}}
                        />
                    </Grid>
                </Grid>
                <Grid display='flex' flexDirection='row' container sx={{m: 1}} alignItems='center'>
                    <Grid item xs={4} display='flex' flexDirection='row' justifyContent='flex-end' sx={{pr: 2}}>
                        <Typography fontSize='1.5rem' fontWeight={650}>Password: </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <Button variant='outlined' onClick={() => changePW()} sx={{border: 2, background: theme.colors.white, borderColor: theme.colors.dark_gray, borderRadius: '20px', m: 1, textTransform: 'none'}}>
                            <Typography fontSize='1.25rem' color={theme.colors.dark_gray} fontWeight={600}>
                                Change Password
                            </Typography>
                        </Button>
                    </Grid>
                </Grid>
                <Box display='flex' flexDirection='row' justifyContent='space-between' alignItems='center' sx={{mt: 5}}>
                    
                    <Button variant='outlined' onClick={() => onDelete()} startIcon={<DeleteForeverOutlinedIcon sx={{ color: theme.colors.red}}/>} sx={{background: theme.colors.white, borderColor: theme.colors.red, borderRadius: '20px', textTransform: 'none'}}>
                        <Typography sx={{color: theme.colors.red}} fontSize='1.25rem' fontWeight={650}>
                            Delete My Account
                        </Typography>
                    </Button>
                </Box>
                <Box width='100%' display='flex' flexDirection='row' justifyContent='flex-end' sx={{mt: 10}}>
                    <PinkOutlineButton text='Cancel' onClick={() => onCancel()} width='15%'/>
                    <PinkFillButton text='Save Changes' onClick={() => onSave()} width='25%'/>
                </Box>
            </Box>
            <PasswordChangePopup onCancel={() => onPWCancel()} onSave={() => onPwSave()} open={pwChange}/>
        </div>
    )
}