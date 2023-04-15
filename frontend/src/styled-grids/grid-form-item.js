import { Grid, TextField } from "@mui/material"
import { GridLabel } from "./grid-label"

export const GridFormItem = ( {title, titleSize='1.5rem', textSize='1.5rem', defaultValue, id, onChange, type} ) => {
    return (
        <Grid container sx={{m: 1}} display='flex' flexDirection='row' alignItems='center'>
            <GridLabel text={title} size={titleSize}/>
            <Grid item xs={8}>
                <TextField
                    margin="normal"
                    defaultValue={defaultValue}
                    required
                    fullWidth
                    id={id}
                    name={id}
                    autoComplete={id}
                    type={type}
                    autoFocus
                    inputProps={{ style: {fontSize: textSize}}}
                    onChange={onChange}
                />
            </Grid>
        </Grid>
    )
}
