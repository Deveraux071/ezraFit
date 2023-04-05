import { useState, useEffect } from 'react';
import { Grid, Box, Typography } from "@mui/material"
import { useNavigate, useLocation } from 'react-router-dom';
import { ReturnToHome } from '../components/return-home';
import { PinkFillButton } from '../components/pink-fill-button';
import { PinkOutlineButton } from '../components/pink-outline-button';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import { ImagePlacer } from '../components/image-placer';
import { theme } from '../theme';

export const ViewImage = ( {imageNum, imageType, next} ) => {
    const location = useLocation();
    if (!imageNum && location.state === null) {
        imageNum = 1
        imageType = 'front'
        next = 'side'
    }
    else if (!imageNum) {
        imageNum = location.state.imageNum
        imageType = location.state.imageType
        next = location.state.next
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
        console.log('going back')
        navigate('/take-image', {state: {imageType: imageType, svgType: imageType}})
        console.log('gone back')
        return;
    }

    let num = 'First';
    if (imageNum === 2) {
        num = 'Second';
    }
    else if (imageNum == 3) {
        num = 'Third'
    }
    else if (imageNum == 4) {
        num = 'Fourth'
    }
    
    return (
        <Box>
            <Grid container>
                <Grid item xs={2}>
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
