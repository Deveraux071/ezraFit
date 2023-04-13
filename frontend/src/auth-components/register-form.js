import * as React from 'react';
import { PinkFillButton } from '../components/pink-fill-button';
import { PinkOutlineButton } from '../components/pink-outline-button';
import { Box, Typography, Link } from '@mui/material';
import { theme } from '../theme';
import { useNavigate } from 'react-router-dom';
import { useAuth, useDatabase } from '../contexts/auth-context';
import { useState } from 'react';
import { updateProfile } from 'firebase/auth'
import { getAuth } from 'firebase/auth';
import { ref, set } from "firebase/database";
import { GridFormItem } from '../styled-grids/grid-form-item';

export default function RegisterForm( {formWidth} ) {
    const db = useDatabase();
    const auth = useAuth()
    const navigate = useNavigate();
    const [err, setErr] = useState('')
    const [first, setFirst] = useState('')
    const [last, setLast] = useState('')
    const [email, setEmail] = useState('')
    const [pw, setPw] = useState('')

    const onSubmit = async (e) => {
        e.preventDefault();
        const name = first + ' ' + last
        await auth.register(email, pw).then(() => {
            updateProfile(getAuth().currentUser, { displayName: name }).then(() => {
                const userId = getAuth().currentUser.uid;
                set(ref(db, '/users/' + userId), {
                    username: name,
                    email: email
                });
                navigate('/login');
                }
            ).catch(() => {
                setErr('Failed to set name.')
                })
            }
        ).catch((err) => {
            setErr('Failed to create account. Try again.')
        })
    };

    return (
        <Box sx={{paddingTop: 8, paddingBottom: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: theme.colors.white, width: '35%'}}>
            <Typography fontSize='2.5rem'>Sign Up</Typography>
            <Typography fontSize='1rem' color={theme.colors.red}>{err}</Typography>
            <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1, width: '75%' }} width={formWidth} display='flex' flexDirection='column' justifyContent='center'>
                <GridFormItem title='First Name:' titleSize='1.25rem' textSize='1rem' id='first_name' onChange={(e) => {setFirst(e.target.value)}}/>
                <GridFormItem title='First Name:' titleSize='1.25rem' textSize='1rem' id='last_name' onChange={(e) => {setLast(e.target.value)}}/>
                <GridFormItem title='Email:' titleSize='1.25rem' textSize='1rem' id='email' onChange={(e) => {setEmail(e.target.value)}}/>
                <GridFormItem title='Password:' titleSize='1.25rem' textSize='1rem' id='password' onChange={(e) => {setPw(e.target.value)}} type="password"/>
                <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' sx={{marginTop: 8}}>
                    <PinkFillButton text='Sign Up' fontSize='1.5rem' onClick={(e) => onSubmit(e)}/>
                    <PinkOutlineButton text='Cancel' onClick={() => navigate('/landing')} fontSize='1.5rem'/>
                </Box>
            </Box>
            <Typography>
                Already have an account? <Link onClick={() => navigate('/login')}>Login here!</Link>
            </Typography>
        </Box>
    );
}
