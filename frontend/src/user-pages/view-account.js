import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { WelcomeBanner } from "../components/welcome-banner";
import { theme } from "../theme"
import { Box, Typography, Grid, Button } from "@mui/material"
import { EditButton } from "../components/edit-button"
import { TabPanel } from '../components/account-page-components/tab-panel';
import { PasswordChangePopup } from '../components/account-page-components/password-change-popup';

export const ViewAccount = () => {

    const navigate = useNavigate();
    const [name, setName] = useState('Leslie Knope')
    const [email, setEmail] = useState('leslieknope@gmail.com')
    const [pwChange, setPwChange] = useState(false);

    const changePW = () => {
        console.log('change')
        setPwChange(true)
    }

    const onEdit = () => {
        navigate('/edit')
    }

    const onPWCancel = () => {
        setPwChange(false)
    }

    const onPwSave = () => {
        console.log('password saved')
        setPwChange(false)
    }

    return (
        <Box>
            <WelcomeBanner/>
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
            <PasswordChangePopup onCancel={() => onPWCancel()} onSave={() => onPwSave()} open={pwChange}/>
        </Box>
    )
}
