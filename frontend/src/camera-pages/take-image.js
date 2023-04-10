import Webcam from 'react-webcam';
import { useNavigate, useLocation } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import { Grid, Box, Typography } from "@mui/material"
import { DropDown } from '../components/dropdown';
import { Timer } from '../components/timer';
import { FrontSilhouette } from '../assets/front-silhouette';
import { SideSilhouette } from '../assets/side-silhouette';
import { PinkFillButton } from '../components/pink-fill-button';
import { PinkOutlineButton } from '../components/pink-outline-button';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import { theme } from '../theme';
import { AllImagePlacers } from '../components/all-image-placers';

import { ArmsSpread } from '../assets/arms-spread';
export const TakeImage = ( {imageType, svgType} ) => {
    const location = useLocation();
    if (!imageType) {
        imageType = location.state !== null ? location.state.imageType : 'check'
        svgType = location.state !== null ? location.state.svgType : 'front'
    }

    const navigate = useNavigate();
    const webRef = useRef(null);
    const [time, setTime] = useState(-1);
    const [dropdownVal, setDropdownVal] = useState(-1);
    const [isTimeSet, setIsTimeSet] = useState(false);    
    
    let svg;
    if (svgType === 'spread') {
        svg = <ArmsSpread/>
    }
    else if (svgType === 'side') {
        svg = <SideSilhouette/>
    }
    else if (svgType === 'leg') {
        svg = <FrontSilhouette/>
    }
    
    let imageNum = 1;
    if (imageType === 'spread') {
        imageNum = 2;
    }
    else if (imageType === 'side') {
        imageNum = 3;
    }
    else if (imageType === 'leg') {
        imageNum = 4;
    }

    const getNext = () => {
        if (imageNum === 1) {
            return 'spread'
        }
        else if (imageNum === 2) {
            return 'side'
        }
        else if (imageNum === 3) {
            return 'leg'
        }
        else {
            return 'fin'
        }
    }

    const showImage = () => {
        let img = webRef.current.getScreenshot();
        localStorage.setItem(imageType, img);
    }

    const onDropdownSelect = (t) => {
        setDropdownVal(t);
    }

    const onStart = () => {
        if (dropdownVal < 0) {
            return;
        }
        setTime(dropdownVal);
        setIsTimeSet(true);
    }

    useEffect(() => {
        if (time < 0) {
            return;
        }
        if (time === 0) {
            showImage();
            navigate('/view-image', {state: {imageNum: imageNum, imageType: imageType, next: getNext()}})
            return;
        }
        
        setTimeout(() => {
            const newTime = time - 1;
            setTime(newTime);
        }, 1000)
    
        return clearInterval(time)
    }, [time, ])

    const times = [3, 5, 8, 10, 15, 20]

    return (
        <Box>
            <Grid container>
                <Grid item xs={2}>
                    <AllImagePlacers/>
                </Grid>
                <Grid item xs={6} display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
                    <Typography fontSize='2rem'>Scan to Get Your Measurements!</Typography>
                    <Box position='relative'>
                        <Webcam ref={webRef} height='100%' data-testid='webcam'/>
                        <div style={{position: 'absolute', display: 'flex', justifyContent: 'center', alignItems: 'center', top: 0, right: 0, bottom: 0, left: 0, margin: 'auto'}}>
                            {svg}
                        </div>
                    </Box>
                </Grid>
                <Grid item xs={4} display='flex' flexDirection='column'>
                    <Typography fontSize='2rem' sx={{marginTop: 5, marginBottom: 5}}>Instructions</Typography>
                    <Box sx={{m: 1}}>
                        <Typography fontSize='1.2rem'>
                            1. Set the timer to your desired length.
                        </Typography>
                        <Typography fontSize='1.2rem'>
                            2. Press start button.
                        </Typography>
                        <Typography fontSize='1.2rem'>
                            3. Stand in the silhouette.
                        </Typography>
                        <Typography fontSize='1.2rem'>
                            EzraFit will automatically take a picture when the timer runs out!
                        </Typography>
                    </Box>
                    <Box display='flex' flexDirection='row' justifyContent='space-evenly' alignItems='center'>
                        <Typography sx={{fontSize: '1.35rem', fontWeight: 900}}>Timer: </Typography>
                        <DropDown data={times} onClick={onDropdownSelect}/>
                    </Box>
                    <Box display='flex' flexDirection='column' justifyContent='space-evenly' alignItems='center'>
                        <PinkFillButton onClick={() => onStart()} text='Start' icon={<CameraAltOutlinedIcon sx={{color: theme.colors.white}}/>}/>
                        <PinkOutlineButton text='Cancel'/>
                    </Box>
                    <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
                        {isTimeSet ? (
                            <Timer time={time}/>
                        ) : (<></>)}
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}
