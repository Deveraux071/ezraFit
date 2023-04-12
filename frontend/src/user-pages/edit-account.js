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
import { GridFormItem } from '../components/styled-grids/grid-form-item';
import { PrimaryLayout } from '../components/layout-components/primary-layout';
import { PasswordChangeComp } from '../components/account-page-components/password-change-comp';

export const EditAccount = () => {
    const { user, updateEm, updateName, deleteAccount } = useAuth()
    const db = useDatabase();
    const navigate = useNavigate();
    const [currName, setCurrName] = useState(user?.displayName)
    const [currEmail, setCurrEmail] = useState(user?.email)
    const [pwChange, setPwChange] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    
    const onDelete = async () => {
        await deleteAccount().then(() => navigate('/register')).catch(e => console.log(e))
    }

    const updateValue = async (key, value, old) => {
        if (value === old) return;
        update(ref(db, '/users/' + user.uid), key === 'email' ? {email: value} : {username: value});
        key === 'email' ? await updateEm(value) : await updateName(value)
    }

    const onSave = async (e) => {
        e.preventDefault();
        updateValue('email', currEmail, user?.email).then(() => {
            updateValue('name', currName, user?.displayName).then(() => {
                navigate('/account')
            }).catch(() => {setErrMsg('Failed to update. Please try again.')})
        }).catch(() => {setErrMsg('Failed to update. Please try again.')})
    }

    return (
        <PrimaryLayout loggedIn={true} welcomeText='Edit Account' showWelcome={true} showTab={true} activeTab='account'>
            <Box component="form" onSubmit={onSave} noValidate display='flex' flexDirection='column' justifyContent='center' width='50%' alignItems='center' sx={{m:'auto'}} >
                <Typography fontSize='1rem' color={theme.colors.red}>{errMsg}</Typography>
                <GridFormItem title='Name:' defaultValue={currName} id='name' onChange={(e) => {setCurrName(e.target.value)}}/>
                <GridFormItem title='Email:' defaultValue={currEmail} id='email' onChange={(e) => {setCurrEmail(e.target.value)}}/>
                <PasswordChangeComp onClick={() => setPwChange(true)}/>
                <Button variant='outlined' onClick={() => onDelete()} startIcon={<DeleteForeverOutlinedIcon sx={{ color: theme.colors.red}}/>} sx={{background: theme.colors.white, borderColor: theme.colors.red, borderRadius: '20px', textTransform: 'none'}}>
                    <Typography sx={{color: theme.colors.red}} fontSize='1.25rem' fontWeight={650}>Delete My Account</Typography>
                </Button>
                <Box width='100%' display='flex' flexDirection='row' justifyContent='flex-end' sx={{mt: 10}}>
                    <PinkOutlineButton text='Cancel' onClick={() => navigate('/account')} width='15%'/>
                    <PinkFillButton text='Save Changes' width='25%' type='submit'/>
                </Box>
            </Box>
            <PasswordChangePopup onCancel={() => setPwChange(false)} open={pwChange}/>
        </PrimaryLayout>
    )
}
