import Webcam from 'react-webcam';
import { useRef, useState, useEffect } from 'react';
import { Grid, Box, Typography, Button } from "@mui/material"
import { DropDown } from '../components/dropdown';
import { Timer } from '../components/timer';
import { FrontSilhouette } from '../assets/front-silhouette';
import { SideSilhouette } from '../assets/side-silhouette';
export const TakeImage = ( {imageType, svgType} ) => {
    const webRef = useRef(null);
    const [img, setImg] = useState('')
    const [imageTaken, setImageTaken] = useState(false);
    const [time, setTime] = useState(0);
    const [dropdownVal, setDropdownVal] = useState('');
    const [isTimeSet, setIsTimeSet] = useState(false);    

    const showImage = () => {
        let img = webRef.current.getScreenshot();
        localStorage.setItem(imageType, img);
        // TODO: move these to next page, not needed here since image isn't displayed here
        setImg(img);
        setImageTaken(true);
    }

    const onDropdownSelect = (t) => {
        setDropdownVal(t);
    }

    const onStart = () => {
        setTime(dropdownVal);
        setIsTimeSet(true);
    }

    useEffect(() => {
        if (time.isNan || time === 0) {
            showImage();
            // TODO: navigate to next page
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
                <Grid item xs={6} display='flex' flexDirection='column'>
                    <Typography>Scan to Get Your Measurements!</Typography>
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
                    <Typography>Instructions</Typography>
                    <Typography>
                        1. Set the timer to your desired length.
                    </Typography>
                    <Typography>
                        2. Press start button.
                    </Typography>
                    <Typography>
                        3. Stand in the silhouette.
                    </Typography>
                    <Typography>
                        4. EzraFit will automatically take a picture when the timer runs out!
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
                {imageTaken ? (<img src={img}></img>) : (<></>)}
            </Grid>
        </Box>
    )
}