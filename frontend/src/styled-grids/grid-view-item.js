import { Grid, Typography } from "@mui/material"
import { GridLabel } from "./grid-label"

export const GridViewItem = ( {title, titleSize='1.5rem', text, textSize='1.5rem'} ) => {
    return (
        <Grid container sx={{m: 1}}>
            <GridLabel text={title} size={titleSize}/>
            <Grid item xs={8}>
                <Typography fontSize={textSize}>{text}</Typography>
            </Grid>
        </Grid>
    )
}
