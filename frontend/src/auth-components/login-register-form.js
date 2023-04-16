import * as React from 'react';
import { PinkFillButton } from '../components/pink-fill-button';
import { PinkOutlineButton } from '../components/pink-outline-button';
import { Box, Typography, Link } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { theme } from '../theme';
import { useNavigate } from 'react-router-dom';
import { GridFormItem } from '../styled-grids/grid-form-item';

// login or register form (if login === true, login form, otherwise, register form) 
export default function LoginRegisterForm( {formWidth, login, inputs, onSubmit, err, loading} ) {
    const navigate = useNavigate();

    return (
        <Box sx={{ paddingTop: 3, paddingBottom: 6, display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: theme.colors.white, width: '40%'}}>
            <Typography fontSize='2.5rem' fontWeight="1000">Welcome! <span style={{fontWeight:'300'}}> {`- ${login ? "Log In" : "Sign Up"}`}</span> </Typography>
            <Box sx={{ mt: 1, width: '80%', marginTop: "0px"}} width={formWidth} display='flex' flexDirection='column' justifyContent='center' alignSelf="center">
                {inputs.map(input => 
                    <GridFormItem 
                        key={input} 
                        title={input.label} 
                        height="50px" 
                        titleSize='1rem' 
                        textSize='0.75rem' 
                        id={input.id} 
                        onChange={(e) => {input.onChange(e.target.value)}}
                        type={input.type ?? "default"}
                    />
                )}
                { err ?
                    <Typography display='flex' justifyContent="center" textAlign="center" alignItems="center" fontSize='1rem' color={theme.colors.red}><ErrorOutlineIcon/>{err}</Typography>
                    : null
                }  
                <Box display='flex' flexDirection='column' justifyContent='top' alignItems='center' sx={{marginTop: 3}}>
                    <PinkFillButton 
                        text={`${login ? "Log In" : "Sign Up"}`} 
                        fontSize='1rem' 
                        onClick={(e) => onSubmit(e)} 
                        disabled={typeof loading !== "undefined" ? loading : false}
                    />
                    <Typography marginTop="10px">
                        { login ? <span> Don't have an account? <Link component="button" onClick={() => navigate('/register')}>Sign up here!</Link> </span>
                            : <span> Already have an account? <Link component="button" onClick={() => navigate('/login')}>Log in here!</Link> </span> }
                    </Typography>
                    <Typography marginBottom="15px" marginTop="15px" fontSize='1.5rem' fontWeight="1000"> OR </Typography>
                    <PinkOutlineButton text='Continue as a guest' onClick={() => navigate('/take-image')} fontSize='1rem'/>
                </Box>
            </Box>
        </Box>
    );
}
