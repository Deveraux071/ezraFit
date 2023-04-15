import { Typography, Box } from "@mui/material"
import { PinkOutlineButton } from "../components/pink-outline-button"
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { CalculatedPopup } from "../components/calculated-popup";
import { useAuth } from '../contexts/auth-context';

export default function Calculated() {
    const navigate = useNavigate()
    const location = useLocation()
    const { user } = useAuth()

    useEffect(() => {
        localStorage.removeItem('check')
        localStorage.removeItem('spread')
        localStorage.removeItem('side')
        localStorage.removeItem('leg')
    }, [])

    const [showSize, setShowSize] = useState(false);
    const size = location.state !== null ? location.state.size : {upper: 0, lower: 0};

    const onContinue = (e) => {
        e.preventDefault();
        setShowSize(true);
    }

    return (
        <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' sx={{height: '100vh'}}>
            <Typography fontSize='2rem' fontWeight={800}>
                We have calculated your measurements!
            </Typography>
            <PinkOutlineButton onClick={(e) => onContinue(e)} text='Continue Shopping >' fontSize='1.75rem'/>
            <Typography fontSize='1.5rem' fontWeight={700}>
                Do more with EzraFit!
            </Typography>
            <PinkOutlineButton onClick={() => navigate('/style')} text='Get Style Recommendations' fontSize='1.75rem'/>
            {user ? <PinkOutlineButton onClick={() => navigate('/account')} text='View Account' fontSize='1.75rem'/> : <PinkOutlineButton onClick={() => navigate('/register')} text='Create Account' fontSize='1.75rem'/>}
            <CalculatedPopup onCancel={() => setShowSize(false)} open={showSize} size={size}/>
        </Box>
    )
}
