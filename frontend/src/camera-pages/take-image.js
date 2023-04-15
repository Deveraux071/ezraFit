import Webcam from 'react-webcam';
import { Helmet } from 'react-helmet';
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
import { Instructions } from '../components/instructions';

const times = [3, 5, 8, 10, 15, 20]
const imgInfo = {
    'check': {
        'svg': <></>,
        'nxt': 'spread',
    },
    'spread': {
        'svg': <ArmsSpread/>,
        'nxt': 'side',
    }, 
    'side': {
        'svg': <SideSilhouette/>,
        'nxt': 'leg',
    }, 
    'leg': {
        'svg': <FrontSilhouette/>,
        'nxt': 'fin',
    }, 
}

export const TakeImage = ( {imageType} ) => {
    const location = useLocation();
    imageType = imageType || location.state?.imageType 
    if (!imageType) {
        imageType = 'check'
        localStorage.removeItem('check')
        localStorage.removeItem('spread')
        localStorage.removeItem('side')
        localStorage.removeItem('leg')
    }

    const navigate = useNavigate();
    const webRef = useRef(null);
    const [time, setTime] = useState(-1);
    const [dropdownVal, setDropdownVal] = useState(-1);
    const [isTimeSet, setIsTimeSet] = useState(false);    
    let svg = imgInfo[imageType]['svg'];
    let nxt = imgInfo[imageType]['nxt'];

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
            navigate('/view-image', {state: {imageType: imageType, next: nxt}})
            return;
        }
        
        setTimeout(() => {
            const newTime = time - 1;
            setTime(newTime);
        }, 1000)
    
        return clearInterval(time)
    }, [time, ])

    return (
        <Box>
            <Helmet>
                <title>Get Measurements - Take Image | EzraFit</title>
            </Helmet>
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
                <Grid item xs={4} display='flex' flexDirection='column' justifyContent='center'>
                    <Instructions imageType={imageType}/>
                    <Box display='flex' flexDirection='row' justifyContent='space-evenly' alignItems='center'>
                        <Typography sx={{fontSize: '1.35rem', fontWeight: 900}}>Timer: </Typography>
                        <DropDown data={times} onClick={onDropdownSelect}/>
                    </Box>
                    <Box display='flex' flexDirection='column' justifyContent='space-evenly' alignItems='center'>
                        <PinkFillButton onClick={() => onStart()} text='Start' icon={<CameraAltOutlinedIcon sx={{color: theme.colors.white}}/>}/>
                        <PinkOutlineButton text='Cancel'/>
                    </Box>
                    <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
                        {isTimeSet ? ( <Timer time={time}/> ) : (<></>)}
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}
