import { useState, useEffect } from 'react';
import { Grid, Box, Typography, Button } from "@mui/material"
import { useNavigate } from 'react-router-dom';

// next could be take-image or calculation page
// prev is always take-image
// TODO: send props with navigate
export const ViewImage = ( {imageNum, imageType, next, prev} ) => {
    const navigate = useNavigate();
    const [img, setImg] = useState();
    
    useEffect(() => {
        setImg(localStorage.getItem(imageType));
    }, [])

    const onNext = (e) => {
        e.preventDefault();
        const toNav = '/' + next
        navigate(toNav);
    }

    const onPrev = (e) => {
        e.preventDefault();
        const toNav = '/' + prev
        navigate(toNav);
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
                <Grid item xs={6} display='flex' flexDirection='column'>
                    <Typography>Scan to Get Your Measurements!</Typography>
                    <Box position='relative'>
                        <img src={img}></img>
                    </Box>
                </Grid>
                <Grid item xs={4} display='flex' flexDirection='column'>
                    <Typography>Here's Your {num} Image!</Typography>
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