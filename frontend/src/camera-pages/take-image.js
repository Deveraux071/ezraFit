import Webcam from 'react-webcam';
import { useRef, useState, useEffect } from 'react';
import { Grid, Box, Typography, Button } from "@mui/material"
import { DropDown } from '../components/dropdown';
import { Timer } from '../components/timer';

export const TakeImage = () => {
    const webRef = useRef(null);
    const [img, setImg] = useState('')
    const [start, setStart] = useState(false);
    const [imageTaken, setImageTaken] = useState(false);
    const [time, setTime] = useState(0);
    const [isTimeSet, setIsTimeSet] = useState(false);    

    const showImage = () => {
        let img = webRef.current.getScreenshot();
        localStorage.setItem('image1', img);
        setImageTaken(true);
    }

    const onDropdownSelect = (t) => {
        setTime(t);
        setIsTimeSet(true);
    }

    const onStart = () => {
        setStart(true);
    }

    useEffect(() => {
        if (time === 0) {
            showImage();
            console.log('timer out');
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
                <Grid item xs={3}>

                </Grid>
                <Grid item xs={6} display='flex' flexDirection='column'>
                    <Typography>Scan to Get Your Measurements!</Typography>
                    <Webcam ref={webRef}/>
                </Grid>
                <Grid item xs={3} display='flex' flexDirection='column'>
                    <Typography>Instructions</Typography>
                    <Typography >
                        1. Set the timer to your desired length.
                        2. Press start button.
                        3. Stand in the silhouette.
                        4. EzraFit will automatically take a picture when the timer runs out!
                    </Typography>
                    <DropDown data={times} onClick={onDropdownSelect}/>
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
            {imageTaken ? (
                <img src={img}></img>
            ) : (<></>)}
        </Box>
    )
}