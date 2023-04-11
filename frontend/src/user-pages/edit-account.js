import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { theme } from "../theme"
import { Box, Typography, Grid, Button } from "@mui/material"
import { PinkOutlineButton } from "../components/pink-outline-button"
import { PinkFillButton } from "../components/pink-fill-button"
import { PasswordChangePopup } from '../components/account-page-components/password-change-popup';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { useAuth, useDatabase } from '../contexts/auth-context';
import { ref, update } from "firebase/database";
import { getAuth } from 'firebase/auth';
import { GridFormItem } from '../components/styled-grids/grid-form-item';
import { PrimaryLayout } from '../components/layout-components/primary-layout';

export const EditAccount = () => {
    const { user, updateEm, updateName, deleteAccount } = useAuth()
    const db = useDatabase();
    const navigate = useNavigate();
    const [currName, setCurrName] = useState(user?.displayName)
    const [currEmail, setCurrEmail] = useState(user?.email)
    const [pwChange, setPwChange] = useState(false);
    const [err, setErr] = useState(false)
    const [errMsg, setErrMsg] = useState('');
    const userId = getAuth().currentUser?.uid;
    
    const onDelete = async () => {
        await deleteAccount().then(() => navigate('/register')).catch(e => console.log(e))
    }

    const updateValue = async (key, value) => {
        update(ref(db, '/users/' + userId), key === 'email' ? {email: value} : {username: value});
        key === 'email' ? await updateEm(value).catch((e) => {setErr(true)}) : await updateName(value).catch((e) => {setErr(true)})
    }

    const onSave = async (e) => {
        e.preventDefault();
        if (user?.email !== currEmail) {
            updateValue('email', currEmail)
        }
        if (user?.displayName !== currName && !err) {
            updateValue('name', currName)
        }
        !err ? navigate('/account') : setErrMsg('Failed to update. Please try again.')
    }

    return (
        <PrimaryLayout loggedIn={true} welcomeText='Edit Account' showWelcome={true} showTab={true} activeTab='account'>
            <Box>
                <Box component="form" onSubmit={onSave} noValidate display='flex' flexDirection='column' justifyContent='center' width='50%' alignItems='center' sx={{m:'auto'}} >
                    {err && <Typography fontSize='1rem' color={theme.colors.red}>{errMsg}</Typography>}
                    <GridFormItem title='Name:' defaultValue={currName} id='name' onChange={(e) => {setCurrName(e.target.value)}}/>
                    <GridFormItem title='Email:' defaultValue={currEmail} id='email' onChange={(e) => {setCurrEmail(e.target.value)}}/>
                    <Grid display='flex' flexDirection='row' container sx={{m: 1}} alignItems='center'>
                        <Grid item xs={4} display='flex' flexDirection='row' justifyContent='flex-end' sx={{pr: 2}}>
                            <Typography fontSize='1.5rem' fontWeight={650}>Password: </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Button variant='outlined' onClick={() => setPwChange(true)} sx={{border: 2, background: theme.colors.white, borderColor: theme.colors.dark_gray, borderRadius: '20px', m: 1, textTransform: 'none'}}>
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
                        <PinkOutlineButton text='Cancel' onClick={() => navigate('/account')} width='15%'/>
                        <PinkFillButton text='Save Changes' width='25%' type='submit'/>
                    </Box>
                </Box>
                <PasswordChangePopup onCancel={() => setPwChange(false)} open={pwChange}/>
            </Box>
        </PrimaryLayout>
    )
}
