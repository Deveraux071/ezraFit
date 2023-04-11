import * as React from 'react';
import { PinkFillButton } from '../pink-fill-button';
import { PinkOutlineButton } from '../pink-outline-button';
import { Box, Typography, TextField, Grid, Link } from '@mui/material';
import { theme } from '../../theme';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../contexts/auth-context";
import { useState } from 'react';
import { GridFormItem } from '../styled-grids/grid-form-item';

export default function LoginForm( {formWidth} ) {
    const auth = useAuth()
    const navigate = useNavigate();
    const [err, setErr] = useState('')
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [pw, setPw] = useState('')
    const onSubmit = async (e) => {
        e.preventDefault();
        setErr('')
        setLoading(true)
        await auth.login(email, pw).then(() => {
            localStorage.setItem('password', pw)
            navigate('/account');
            setLoading(false)
        }).catch(() => {
            setErr('Incorrect username or password.')
        })
    };

    return (
        <Box sx={{ paddingTop: 8, paddingBottom: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: theme.colors.white, width: '35%'}}>
            <Typography fontSize='2.5rem'>Log in</Typography>
            {err !== '' && <Typography fontSize='1rem' color={theme.colors.red}>{err}</Typography>}
            <Box sx={{ mt: 1, width: '75%' }} width={formWidth} display='flex' flexDirection='column' justifyContent='center'>
                <GridFormItem title='Email:' titleSize='1.25rem' textSize='1rem' id='email' onChange={(e) => {setEmail(e.target.value)}}/>
                <GridFormItem title='Password:' titleSize='1.25rem' textSize='1rem' id='password' onChange={(e) => {setPw(e.target.value)}}/>
                <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' sx={{marginTop: 8}}>
                    <PinkFillButton text='Log In' fontSize='1.5rem' onClick={(e) => onSubmit(e)} disabled={loading}/>
                    <PinkOutlineButton text='Cancel' onClick={() => navigate('/landing')} fontSize='1.5rem'/>
                </Box>
            </Box>
            <Typography>
                Don't have an account? <Link onClick={() => navigate('/register')}>Register here!</Link>
            </Typography>
        </Box>
    );
}
