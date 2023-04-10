import { Typography, Box } from "@mui/material"
import { theme } from "../theme"
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/auth-context';

export default function Calculating() {
    const location = useLocation()
    let points = location.state !== null ? location.state.points : {};
    const { user } = useAuth()
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true)
    const [size, setSize] = useState([])

    useEffect(() => {
        const check = localStorage.getItem('check') !== null ? localStorage.getItem('check').split(',')[1] : ''
        fetch('http://localhost:5000/get-measurements', {
            method: 'POST',
            headers: { 
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({checkboardImg: check, points: points, company: 'zara', user: user ? user.uid : ''})
        }).then(response => response.json())
            .then(data => {
                setLoading(false)
                setSize(data)
                console.log(data)
                //navigate('/view-size', {state: {size: size}})
            }).catch(err => {
                console.log(err)
        })
    }, [])
    
    return (
        <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' sx={{height: '100vh'}}>
            <Typography fontSize='2rem' fontWeight={800}>
                Please stand by while we calculate your measurements! 
            </Typography>
            {loading && <Typography fontSize='1.5rem' fontWeight={700} color={theme.colors.gray}>
                Loading... 
            </Typography>}
        </Box>
        
    )
}
