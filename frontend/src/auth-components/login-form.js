import * as React from 'react';
import { PinkFillButton } from '../components/pink-fill-button';
import { PinkOutlineButton } from '../components/pink-outline-button';
import { Box, Typography, Link } from '@mui/material';
import { theme } from '../theme';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../contexts/auth-context";
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
            setErr('Incorrect email or password.')
        })
    };

    return (
        <Box sx={{ paddingTop: 3, paddingBottom: 6, display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: theme.colors.white, width: '35%'}}>
            <Typography fontSize='2.5rem' fontWeight="1000">Welcome! <span style={{fontWeight:'300'}}> - Log In</span> </Typography>
            <Box sx={{ mt: 1, width: '80%', marginTop: "0px"}} width={formWidth} display='flex' flexDirection='column' justifyContent='center' alignSelf="center">
                <GridFormItem title='Email:' height="50px" titleSize='1rem' textSize='0.75rem' id='email' onChange={(e) => {setEmail(e.target.value)}}/>
                <GridFormItem title='Password:' height="50px" titleSize='1rem' textSize='0.75rem' id="password" onChange={(e) => {setPw(e.target.value)}} type="password"/>
                <Typography textAlign="center" fontSize='1rem' color={theme.colors.red}>{err}</Typography>
                <Box display='flex' flexDirection='column' justifyContent='top' alignItems='center' sx={{marginTop: 3}}>
                    <PinkFillButton text='Log In' fontSize='1rem' onClick={(e) => onSubmit(e)} disabled={loading}/>
                    <Typography marginTop="10px">
                        Don't have an account? <Link component="button" onClick={() => navigate('/register')}>Sign up here!</Link>
                    </Typography>
                    <Typography marginBottom="15px" marginTop="15px" fontSize='1.5rem' fontWeight="1000"> OR </Typography>
                    <PinkOutlineButton text='Continue as a guest' onClick={() => navigate('/take-image')} fontSize='1rem'/>
                </Box>
            </Box>
        </Box>
    );
}
