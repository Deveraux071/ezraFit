import { Helmet } from 'react-helmet';
import { Typography, Box } from "@mui/material"
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { theme } from "../theme"
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/auth-context';
import { PinkFillButton } from "../components/pink-fill-button";

export default function Calculating() {
    const location = useLocation()
    let points = location.state?.points || {};
    const { user } = useAuth()
    const navigate = useNavigate();
    const [errMsg, setErrMsg] = useState('')

    useEffect(() => {
        const check = localStorage.getItem('check') !== null ? localStorage.getItem('check').split(',')[1] : ''
        fetch('http://localhost:5000/get-measurements', {
            method: 'POST',
            headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            body: JSON.stringify({checkboardImg: check, points: points, company: 'zara', user: user ? user.uid : ''})
        }).then(response => response.json()).then(data => {
                navigate('/calculated', {state: {size: data}})}).catch(() => setErrMsg('Your checkboard was not detected. Please use clearer images and try again.'))}, [])
    
    return (
        <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' sx={{height: '100vh'}}>
            <Helmet>
                <title>Get Measurements - Calculating Measurements | EzraFit</title>
            </Helmet>
            {errMsg ? <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
                <Typography display='flex' justifyContent="center" textAlign="center" alignItems="center" fontSize='1.25rem' fontWeight={600} color={theme.colors.red}>
                    <ErrorOutlineIcon/>
                    {errMsg}
                </Typography>
                <PinkFillButton onClick={() => navigate('/take-image')} text='Retake Images'/>
            </Box> : <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
                <Typography fontSize='2rem' fontWeight={800}>
                    Please stand by while we calculate your measurements! 
                </Typography>
                <Typography fontSize='1.5rem' fontWeight={700} color={theme.colors.gray}>Loading... </Typography>
            </Box>}
        </Box>
    )
}
