import { Typography } from "@mui/material"

export const SubHeading = ( {title} ) => {
    return (
        <div style={{background:'rgba(255, 158, 158, 0.2)'}}>
            <Typography fontSize='1.5rem' fontWeight={650} marginTop={'1.5%'}>{title}</Typography>
        </div>
    )   
}
