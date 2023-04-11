import { useState, useEffect } from 'react';
import { Grid, Box, Typography } from "@mui/material"
import { useNavigate, useLocation } from 'react-router-dom';
import { PinkFillButton } from '../components/pink-fill-button';
import { PinkOutlineButton } from '../components/pink-outline-button';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import { theme } from '../theme';
import { AllImagePlacers } from '../components/all-image-placers';

export const ViewImage = ( {imageNum, imageType} ) => {
    const location = useLocation();
    if (!imageNum) {
        imageNum = location.state !== null ? location.state.imageNum : 1
        imageType = location.state !== null ? location.state.imageType : 'front'
    }
    
    const navigate = useNavigate();
    const [img, setImg] = useState();
    
    let nextImgType;
    let nextSvgType = 'side';

    if (imageType === 'check') {
        nextImgType = 'spread'
    }
    else if (imageType === 'spread') {
        nextImgType = 'side'
    }
    else if (imageType === 'side') {
        nextImgType = 'leg'
    }
    else {
        nextImgType = 'fin'
    }
    useEffect(() => {
        setImg(localStorage.getItem(imageType));
    }, [imageType,])

    const onNext = (e) => {
        e.preventDefault();
        if (nextImgType === 'fin') {
            navigate('/select', {state: {img: 'spread', type: 'waist', dict: {}}})
        }
        else {
            navigate('/take-image', {state: {imageType: nextImgType, svgType: nextSvgType}})
        }
    }

    const onPrev = (e) => {
        e.preventDefault();
        localStorage.setItem(imageType, '')
        navigate('/take-image', {state: {imageType: imageType, svgType: imageType}})
        return;
    }

    let num = 'First';
    if (imageNum === 2) {
        num = 'Second';
    }
    else if (imageNum === 3) {
        num = 'Third'
    }
    else if (imageNum === 4) {
        num = 'Fourth'
    }
    
    return (
        <Box>
            <Grid container>
                <Grid item xs={2}>
                    <AllImagePlacers/>
                </Grid>
                <Grid item xs={6} display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
                    <Typography fontSize='2rem'>Scan to Get Your Measurements!</Typography>
                    <Box position='relative'>
                        <img src={img} alt={imageType} data-testid='img-position'></img>
                    </Box>
                </Grid>
                <Grid item xs={4} display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
                    <Typography fontSize='2rem' fontWeight={900}>Here's Your {num} Image!</Typography>
                    <PinkFillButton onClick={(e) => onNext(e)} text='Next' testId='next-btn'/>
                    <PinkOutlineButton onClick={(e) => onPrev(e)} text='Retake' icon={<CameraAltOutlinedIcon sx={{color: theme.colors.pink}}/>}/>
                    <PinkOutlineButton text='Cancel'/>
                </Grid>
            </Grid>
        </Box>
    )
}
