import { Typography, Box } from "@mui/material"
import { theme } from "../theme"
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/auth-context';

export default function Calculating( {points} ) {
    const { user } = useAuth()
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true)
    const [size, setSize] = useState([])

    useEffect(() => {
        const check = localStorage.getItem('check').split(',')[1]
        const bodyParams = {
            checkboardImg: check, 
            points: points, 
            company: 'zara', 
            user: user ? user.uid : ''
        }
        fetch('http://localhost:5000/get-measurements1', {
            method: 'POST',
            headers: { 
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bodyParams)
        }).then(response => response.json())
            .then(data => {
                setLoading(false)
                setSize(data)
                navigate('/view-size', {state: {size: size}})
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
