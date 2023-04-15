import { Grid, Typography } from "@mui/material"

export const GridLabel = ( {text, size} ) => {
    return (
        <Grid item xs={4} display='flex' flexDirection='row' justifyContent='flex-end' sx={{pr: 2}}>
            <Typography fontSize={size} fontWeight={650}>{text}</Typography>
        </Grid>
    )
}
