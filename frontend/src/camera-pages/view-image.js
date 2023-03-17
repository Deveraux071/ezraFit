import { useState, useEffect } from 'react';
import { Grid, Box, Typography, Button } from "@mui/material"
import { useNavigate, useLocation } from 'react-router-dom';

export const ViewImage = ( {imageNum, imageType, next} ) => {
    const location = useLocation();
    if (!imageNum) {
        imageNum = location.state.imageNum
        imageType = location.state.imageType
        next = location.state.next
    }
    
    const navigate = useNavigate();
    const [img, setImg] = useState();
    
    useEffect(() => {
        setImg(localStorage.getItem(imageType));
    }, [])

    const onNext = (e) => {
        e.preventDefault();
        if (next === 'side') {
            navigate('/take-image', {state: {imageType: 'side', svgType: 'side'}})
            return;
        }
        navigate('/calculating');
    }

    const onPrev = (e) => {
        e.preventDefault();
        localStorage.setItem(imageType, '')
        navigate('/take-image', {state: {imageType: imageType, svgType: imageType}})
    }

    let num = 'First';
    if (imageNum === 2) {
        num = 'Second';
    }
    return (
        <Box>
            <Grid container>
                <Grid item xs={2}>

                </Grid>
                <Grid item xs={6} display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
                    <Typography fontSize='2rem'>Scan to Get Your Measurements!</Typography>
                    <Box position='relative'>
                        <img src={img}></img>
                    </Box>
                </Grid>
                <Grid item xs={4} display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
                    <Typography fontSize='2rem'>Here's Your {num} Image!</Typography>
                    <Button onClick={(e) => onNext(e)}>
                        Next 
                    </Button>
                    <Button onClick={(e) => onPrev(e)}>
                        Retake
                    </Button>
                    <Button>
                        Cancel
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
}