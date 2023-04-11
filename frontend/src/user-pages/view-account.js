import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { WelcomeBanner } from "../components/welcome-banner";
import { theme } from "../theme"
import { Box, Typography, Grid, Button } from "@mui/material"
import { EditButton } from "../components/edit-button"
import { TabPanel } from '../components/account-page-components/tab-panel';
import { PasswordChangePopup } from '../components/account-page-components/password-change-popup';
import { Navigation } from "../components/navigation";
import { useAuth } from '../contexts/auth-context';

export const ViewAccount = () => {
    const { user, updatePassword } = useAuth()
    const navigate = useNavigate();
    const [name, setName] = useState(user ? user.displayName : '')
    const [email, setEmail] = useState(user ? user.email : '')
    const [pwChange, setPwChange] = useState(false);
    const [err, setErr] = useState('');

    const changePW = () => {
        setPwChange(true)
    }

    const onEdit = () => {
        navigate('/edit')
    }

    const onPWCancel = () => {
        setPwChange(false)
    }

    const onPwSave = async (e) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        const old_pw = data.get('current_pw')
        const new_pw = data.get('new_pw')
        const new_pw_rep = data.get('con_new_pw')
        
        if (old_pw !== localStorage.getItem('password')) {
            setErr('Current password incorrect')
        }
        else if (new_pw === '' || new_pw_rep === '' || new_pw !== new_pw_rep) {
            setErr('New passwords do not match')
        }
        else {
            try {
                await updatePassword(new_pw)
                setPwChange(false)
                localStorage.setItem('password')
            } catch (e) {
                console.log(e)
            }
        }
    }

    return (
        <Box>
            <Navigation loggedIn={true}/>
            <WelcomeBanner text='My Account'/>
            <TabPanel activeTab='account'/>
            <Box display='flex' flexDirection='column' justifyContent='center' width='35%' alignItems='center' sx={{m:'auto'}}>
                <Box display='flex' flexDirection='row' justifyContent='flex-end' width='100%'>
                    <EditButton onClick={() => onEdit()} fontSize='1.25rem' fontWeight={650}/>
                </Box>
                <Grid container sx={{m: 1}}>
                    <Grid item xs={4} display='flex' flexDirection='row' justifyContent='flex-end' sx={{pr: 2}}>
                        <Typography fontSize='1.5rem' fontWeight={650}>Name: </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography fontSize='1.5rem'>{name}</Typography>
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
                        <Button variant='outlined' onClick={() => changePW()} sx={{border: 2, background: theme.colors.white, borderColor: theme.colors.dark_gray, borderRadius: '20px', m: 1, textTransform: 'none'}}>
                            <Typography fontSize='1.25rem' color={theme.colors.dark_gray} fontWeight={600}>
                                Change Password
                            </Typography>
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            <PasswordChangePopup onCancel={() => onPWCancel()} open={pwChange}/>
        </Box>
    )
}
