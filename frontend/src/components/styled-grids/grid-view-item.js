import { Grid, Typography } from "@mui/material"

export const GridViewItem = ( {title, titleSize='1.5rem', text, textSize='1.5rem'} ) => {
    return (
        <Grid container sx={{m: 1}}>
            <Grid item xs={4} display='flex' flexDirection='row' justifyContent='flex-end' sx={{pr: 2}}>
                <Typography fontSize={titleSize} fontWeight={650}>{title}</Typography>
            </Grid>
            <Grid item xs={8}>
                <Typography fontSize={textSize}>{text}</Typography>
            </Grid>
        </Grid>
    )
}
