import * as React from 'react';
import { PinkFillButton } from '../pink-fill-button';
import { PinkOutlineButton } from '../pink-outline-button';
import { Box, Typography, TextField, Grid, Link } from '@mui/material';
import { theme } from '../../theme';
import { useNavigate } from 'react-router-dom';
import { useAuth, useDatabase } from '../../contexts/auth-context';
import { useState } from 'react';
import { updateProfile } from 'firebase/auth'
import { getAuth } from 'firebase/auth';
import { ref, set} from "firebase/database";

export default function RegisterForm({formWidth}) {
    const db = useDatabase();
    const auth = useAuth()
    const navigate = useNavigate();
    const [err, setErr] = useState('')
    
    const onSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const first_name = data.get('first_name')
        const last_name = data.get('last_name')
        const name = first_name + ' ' + last_name
        const email = data.get('email')
        const password = data.get('password')

        await auth.register(email, password).then(() => {
            updateProfile(getAuth().currentUser, { displayName: name }).then(() => {
                const userId = getAuth().currentUser.uid;
                set(ref(db, '/users/' + userId), {
                    username: name,
                    email: email,
                    password : password
                });
                console.log('Registered new user.')
                navigate('/login');
                }
            ).catch((err) => {
                console.log(err)
                setErr('Failed to set name.')
            })
            }
        ).catch((err) => {
            console.log(err)
            setErr('Failed to create account. Try again.')
        })

    };

    

    const onCancel = (e) => {
        e.preventDefault();
        navigate('/landing');
    }

    const toLogin = (e) => {
        e.preventDefault();
        navigate('/login');
    }
    return (
        <Box
            sx={{
                paddingTop: 8,
                paddingBottom: 8,
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: theme.colors.white,
                width: '35%'
            }}
        >
            <Typography fontSize='2.5rem'>
                Sign Up
            </Typography>
            {err !== '' && <Typography fontSize='1rem' color={theme.colors.red}>{err}</Typography>}
            <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1, width: '75%' }} width={formWidth} display='flex' flexDirection='column' justifyContent='center'>
                <Grid container alignItems='center' justifyContent='space-between'>
                    <Grid item xs={4}>
                        <Typography fontSize='1.25rem'>First Name: </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="first_name"
                            name="first_name"
                            autoFocus
                        />
                    </Grid>
                </Grid>
                <Grid container alignItems='center' justifyContent='space-between'>
                    <Grid item xs={4}>
                        <Typography fontSize='1.25rem'>Last Name: </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="last_name"
                            name="last_name"
                            autoFocus
                        />
                    </Grid>
                </Grid>
                <Grid container alignItems='center' justifyContent='space-between'>
                    <Grid item xs={4}>
                        <Typography fontSize='1.25rem'>Email: </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            name="email"
                            autoFocus
                        />
                    </Grid>
                </Grid>
                <Grid container alignItems='center' justifyContent='space-between'>
                    <Grid item xs={4}>
                        <Typography fontSize='1.25rem'>Password: </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            type="password"
                            id="password"
                        />
                    </Grid>
                </Grid>
                <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' sx={{marginTop: 8}}>
                    <PinkFillButton text='Sign Up' fontSize='1.5rem' type='submit'/>
                    <PinkOutlineButton text='Cancel' onClick={(e) => onCancel()} fontSize='1.5rem'/>
                </Box>
            </Box>
            <Typography>
                Already have an account? <Link onClick={(e) => toLogin(e)}>Login here!</Link>
            </Typography>
        </Box>
    );
}
