import { Box, Typography, Link } from "@mui/material"
import { useNavigate } from 'react-router-dom';
import { theme } from "../../theme"

/*
TODOs:
1. update the Style Recommendations and Measurements urls
2. add icons to each link
*/ 

export const TabPanel = ( {activeTab} ) => {
    const navigate = useNavigate()
    
    const navigateTo = (e, url) => {
        e.preventDefault()
        navigate(url)
    }

    return (
        <Box display='flex' flexDirection='row' alignItems='center' justifyContent='space-evenly' height='10vh' sx={{
            background: 'rgba(255, 158, 158, 0.07)',
        }}>
            <Link fontSize='1.5rem' fontWeight={800} color={activeTab === 'style' ? theme.colors.pink : theme.colors.gray} onClick={(e) => navigateTo(e, '/style')}>
                Style Recommendations
            </Link>
            <Link fontSize='1.5rem' fontWeight={800} color={activeTab === 'measure' ? theme.colors.pink : theme.colors.gray} onClick={(e) => navigateTo(e, '/measure')}>
                Measurements
            </Link>
            <Link fontSize='1.5rem' fontWeight={800} color={activeTab === 'account' ? theme.colors.pink : theme.colors.gray} onClick={(e) => navigateTo(e, '/account')}>
                Account
            </Link>
        </Box>
    )
}