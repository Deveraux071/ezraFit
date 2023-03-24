import { useState, useEffect } from 'react';
import { Grid, Box, Typography, Button } from "@mui/material"
import { useNavigate, useLocation } from 'react-router-dom';
import { ReturnToHome } from '../components/return';
import { PinkFillButton } from '../components/pink-fill-button';
import { PinkOutlineButton } from '../components/pink-outline-button';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import { ImagePlacer } from '../components/image-placer';
import { theme } from '../theme';

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
                    <ReturnToHome/>
                    <Box display='flex' flexDirection='column'>
                        <ImagePlacer view='front' img={localStorage.getItem('front')} height={200} width={100}/>
                        {imageType === 'side' ? (    
                            <ImagePlacer view='side' img={localStorage.getItem('side')} height={200} width={100}/>
                        ) : (<ImagePlacer view='side' height={200} width={100}/>)}
                    </Box>
                </Grid>
                <Grid item xs={6} display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
                    <Typography fontSize='2rem'>Scan to Get Your Measurements!</Typography>
                    <Box position='relative'>
                        <img src={img}></img>
                    </Box>
                </Grid>
                <Grid item xs={4} display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
                    <Typography fontSize='2rem' fontWeight={900}>Here's Your {num} Image!</Typography>
                    <PinkFillButton onClick={(e) => onNext(e)} text='Next'/>
                    <PinkOutlineButton onClick={(e) => onPrev(e)} text='Retake' icon={<CameraAltOutlinedIcon sx={{color: theme.colors.pink}}/>}/>
                    <PinkOutlineButton text='Cancel'/>
                </Grid>
            </Grid>
        </Box>
    )
}