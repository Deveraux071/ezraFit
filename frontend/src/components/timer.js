import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { CircularProgress, Typography, Box } from '@mui/material'

export const Timer = ( {time} ) => {
    
    return (
        <div style={{ display: 'flex', justifyContent:'center', alignItems:'center', position: 'relative', width: '6rem' }}>
            <CircularProgress variant="determinate" value={time*10} size='6rem'/>
            <Typography sx={{fontSize: '2.5rem', position: 'absolute', fontWeight: 700}}>
                {time}
            </Typography>
        </div>
        
    )
}