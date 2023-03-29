import * as React from 'react';
import { PinkFillButton } from '../pink-fill-button';
import { PinkOutlineButton } from '../pink-outline-button';
import { Box, Typography, TextField, Grid, Link } from '@mui/material';
import { theme } from '../../theme';
import { useNavigate } from 'react-router-dom';

export default function LoginForm( {formWidth} ) {
    const navigate = useNavigate();
    const onSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        console.log({
        email: data.get('email'),
        password: data.get('password'),
        });
        navigate('/home');
    };

    const onCancel = (e) => {
        e.preventDefault();
        navigate('/landing');
    }

    const toRegister = (e) => {
        navigate('/register');
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
                Log in
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1, width: '75%' }} width={formWidth} display='flex' flexDirection='column' justifyContent='center'>
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
                    <PinkFillButton onClick={(e) => onSubmit(e)} text='Log In' fontSize='1.5rem'/>
                    <PinkOutlineButton text='Cancel' onClick={(e) => onCancel(e)} fontSize='1.5rem'/>
                </Box>
            </Box>
            <Typography>
                Don't have an account? <Link onClick={(e) => toRegister(e)}>Register here!</Link>
            </Typography>
        </Box>
    );
}
