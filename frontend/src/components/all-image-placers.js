import { ImagePlacer } from "./image-placer"
import { Box } from "@mui/material"
export const AllImagePlacers = () => {
    return (
        <Box display='flex' flexDirection='column'>
            <ImagePlacer view='Check View' img={localStorage.getItem('check')} height={200} width={100}/>
            <ImagePlacer view='Arms Spread' img={localStorage.getItem('spread') || null} height={200} width={100}/>
            <ImagePlacer view='Side View' img={localStorage.getItem('side') || null} height={200} width={100}/>
            <ImagePlacer view='Full Body' img={localStorage.getItem('leg') || null} height={200} width={100}/>
        </Box>
        
    )
}
