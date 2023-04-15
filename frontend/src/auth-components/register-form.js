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
        <Box sx={{ paddingTop: 3, paddingBottom: 6, display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: theme.colors.white, width: '40%'}}>
            <Typography fontSize='2.5rem' fontWeight="1000">Welcome! <span style={{fontWeight:'300'}}> - Sign Up</span> </Typography>
            <Box sx={{ mt: 1, width: '80%', marginTop: "0px"}} width={formWidth} display='flex' flexDirection='column' justifyContent='center' alignSelf="center">
            <GridFormItem title='First Name:' height="50px" titleSize='1rem' textSize='0.75rem' id='first_name' onChange={(e) => {setFirst(e.target.value)}}/>
            <GridFormItem title='Last Name:' height="50px" titleSize='1rem' textSize='0.75rem' id='last_name' onChange={(e) => {setLast(e.target.value)}}/>
            <GridFormItem title='Email:' height="50px" titleSize='1rem' textSize='0.75rem' id='email' onChange={(e) => {setEmail(e.target.value)}}/>
            <GridFormItem title='Password:' height="50px" titleSize='1rem' textSize='0.75rem' id='password' onChange={(e) => {setPw(e.target.value)}} type="password"/>
                <Typography textAlign="center" fontSize='1rem' color={theme.colors.red}>{err}</Typography>
                <Box display='flex' flexDirection='column' justifyContent='top' alignItems='center' sx={{marginTop: 3}}>
                    <PinkFillButton text='Sign Up' fontSize='1rem' onClick={(e) => onSubmit(e)} />
                    <Typography marginTop="10px">
                        Already have an account? <Link component="button" onClick={() => navigate('/login')}>Log in here!</Link>
                    </Typography>
                    <Typography marginBottom="15px" marginTop="15px" fontSize='1.5rem' fontWeight="1000"> OR </Typography>
                    <PinkOutlineButton text='Continue as a guest' onClick={() => navigate('/take-image')} fontSize='1rem'/>
                </Box>
            </Box>
        </Box>
    );
}
