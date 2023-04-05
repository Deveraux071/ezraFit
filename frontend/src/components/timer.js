import React from 'react';
import { CircularProgress, Typography } from '@mui/material'
import { theme } from '../theme';

export const Timer = ( {time} ) => {
    return (
        <div data-testid='timer' style={{ display: 'flex', justifyContent:'center', alignItems:'center', position: 'relative', width: '6rem' }}>
            <CircularProgress variant="determinate" value={time*10} size='6rem' sx={{color: theme.colors.pink}}/>
            <Typography sx={{fontSize: '2.5rem', position: 'absolute', fontWeight: 700}}>
                {time}
            </Typography>
        </div>
    )
}
