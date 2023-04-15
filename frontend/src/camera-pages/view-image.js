import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Grid, Box, Typography } from "@mui/material"
import { useNavigate, useLocation } from 'react-router-dom';
import { PinkFillButton } from '../components/pink-fill-button';
import { PinkOutlineButton } from '../components/pink-outline-button';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import { theme } from '../theme';
import { AllImagePlacers } from '../components/all-image-placers';

const imgCharacteristics = {
    'check': {
        'next': 'spread',
        'num': 'First'
    },
    'spread': {
        'next': 'side',
        'num': 'Second',
    },
    'side': {
        'next': 'leg',
        'num': 'Third',
    },
    'leg': {
        'next': 'fin',
        'num': 'Fourth',
    }
}

export const ViewImage = ( {imageType} ) => {
    const location = useLocation();
    imageType = imageType || location.state?.imageType 
    if (!imageType) {
        imageType = 'check'
    }
    const navigate = useNavigate();
    const [img, setImg] = useState();
    
    let nextImgType;
    let num;
    for (const image in imgCharacteristics) {
        if (image === imageType) {
            nextImgType = imgCharacteristics[image]['next']
            num = imgCharacteristics[image]['num']
            break;
        }
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
            navigate('/take-image', {state: {imageType: nextImgType}})
        }
    }

    const onPrev = (e) => {
        e.preventDefault();
        localStorage.setItem(imageType, '')
        navigate('/take-image', {state: {imageType: imageType}})
        return;
    }
    
    return (
        <Box>
            <Helmet>
                <title>Get Measurements - View Captured Image | EzraFit</title>
            </Helmet>
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
