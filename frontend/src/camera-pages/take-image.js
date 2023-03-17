import Webcam from 'react-webcam';
import { useNavigate, useLocation } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import { Grid, Box, Typography, Button } from "@mui/material"
import { DropDown } from '../components/dropdown';
import { Timer } from '../components/timer';
import { FrontSilhouette } from '../assets/front-silhouette';
import { SideSilhouette } from '../assets/side-silhouette';

// TODO: fix timer

export const TakeImage = ( {imageType, svgType} ) => {
    const location = useLocation();
    if (!imageType) {
        imageType = location.state.imageType
        svgType = location.state.svgType
    }

    const navigate = useNavigate();
    const webRef = useRef(null);
    const [time, setTime] = useState('');
    const [dropdownVal, setDropdownVal] = useState('');
    const [isTimeSet, setIsTimeSet] = useState(false);    
    
    let imageNum = 1;
    if (imageType === 'side') {
        imageNum = 2;
    }

    const showImage = () => {
        let img = webRef.current.getScreenshot();
        localStorage.setItem(imageType, img);
    }

    const onDropdownSelect = (t) => {
        setDropdownVal(t);
    }

    const onStart = () => {
        setTime(dropdownVal);
        setIsTimeSet(true);
    }

    useEffect(() => {
        if (time.isNan) {
            return;
        }
        if (time === 0) {
            showImage();
            let next = 'side';
            if (imageNum === 2) {
                next = 'fin'
            }
            navigate('/view-image', {state: {imageNum: imageNum, imageType: imageType, next: next}})
            return;
        }
        
        setTimeout(() => {
            const newTime = time - 1;
            setTime(newTime);
        }, 1000)
    
        return clearInterval(time)
    }, [time])

    const times = [3, 5, 8, 10, 15, 20]

    return (
        <Box>
            <Grid container>
                <Grid item xs={2}>

                </Grid>
                <Grid item xs={6} display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
                    <Typography fontSize='2rem'>Scan to Get Your Measurements!</Typography>
                    <Box position='relative'>
                        <Webcam ref={webRef} />
                        <div style={{position: 'absolute', width: '34%', top: 0, right: 0, bottom: 0, left: 0, margin: 'auto'}}>
                            {svgType === 'front' ? (
                                <FrontSilhouette width='inherit' height='inherit'/>
                            ) : (
                                <SideSilhouette width='inherit' height='inherit'/>
                            )}
                        </div>
                    </Box>
                </Grid>
                <Grid item xs={4} display='flex' flexDirection='column'>
                    <Typography fontSize='2rem'>Instructions</Typography>
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
                    <Box display='flex' flexDirection='row'>
                        <Typography>Timer: </Typography>
                        <DropDown data={times} onClick={onDropdownSelect}/>
                    </Box>
                    <Button onClick={() => onStart()}>
                        Start 
                    </Button>
                    <Button>
                        Cancel
                    </Button>
                    {isTimeSet ? (
                        <Timer time={time}/>
                    ) : (<></>)}
                </Grid>
            </Grid>
        </Box>
    )
}