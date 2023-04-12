import { Grid, TextField, Typography } from "@mui/material"

export const GridFormItem = ( {title, titleSize='1.5rem', textSize='1.5rem', defaultValue, id, onChange, type} ) => {
    return (
        <Grid container sx={{m: 1}} display='flex' flexDirection='row' alignItems='center'>
            <Grid item xs={4} display='flex' flexDirection='row' justifyContent='flex-end' sx={{pr: 2}}>
                <Typography fontSize={titleSize} fontWeight={650}>{title}</Typography>
            </Grid>
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
