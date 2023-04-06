import { Typography, Box } from "@mui/material"
import { theme } from "../theme"
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';

export default function Calculating( {points} ) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true)
    const [size, setSize] = useState([])

    // TODO: fix cors issue, remove prefix from checkImg - send only the base64 string
    useEffect(() => {
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000'
            },
            body: JSON.stringify({checkImg: localStorage.getItem('check')})
        };

        fetch('http://localhost:5000/get-measurements1', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({checkImg: localStorage.getItem('check')})
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
