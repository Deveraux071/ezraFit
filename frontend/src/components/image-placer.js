import { Box, Typography } from "@mui/material"
import { theme } from '../theme';

export const ImagePlacer = ( {img, width, height, view} ) => {
    return (
        <Box display='flex' flexDirection='column' justifyContent='flex-end' alignItems='center' height={height} sx={{position:'relative', backgroundColor:theme.colors.gray, m: 2}}>
            { img ? (
                <img src={img} alt='test' style={{position: 'absolute', height: '100%'}}></img>
            ) : (
                <></>
            )}
            <Typography> {view} </Typography>
        </Box>
    )
}
