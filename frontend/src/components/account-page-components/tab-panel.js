import { Box, Typography, Link } from "@mui/material"
import { useNavigate } from 'react-router-dom';
import { theme } from "../../theme"
import { MeasuringTape } from "../../assets/measuring-tape";
import { AccountIcon } from "../../assets/account-icon";
import { ClothesIcon } from "../../assets/clothes";

/*
TODOs:
1. update the Style Recommendations and Measurements urls
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
                <Box display='flex' flexDirection='row' justifyContent='center' alignItems='center'>
                    <ClothesIcon width='5%' color={activeTab === 'style' ? theme.colors.pink : theme.colors.gray}/>
                    <Typography sx={{ml: 1}} fontSize='1.5rem' fontWeight={800}>Style Recommendations</Typography>
                </Box>
            </Link>
            <Link fontSize='1.5rem' fontWeight={800} color={activeTab === 'measure' ? theme.colors.pink : theme.colors.gray} onClick={(e) => navigateTo(e, '/measure')}>
                <Box display='flex' flexDirection='row' justifyContent='center' alignItems='center'>
                    <MeasuringTape width='5%' color={activeTab === 'measure' ? theme.colors.pink : theme.colors.gray}/>
                    <Typography sx={{ml: 1}} fontSize='1.5rem' fontWeight={800}>Measurements</Typography>
                </Box>
            </Link>
            <Link fontSize='1.5rem' fontWeight={800} color={activeTab === 'account' ? theme.colors.pink : theme.colors.gray} onClick={(e) => navigateTo(e, '/account')}>
                <Box display='flex' flexDirection='row' justifyContent='center' alignItems='center'>
                    <AccountIcon width='5%' color={activeTab === 'account' ? theme.colors.pink : theme.colors.gray}/>
                    <Typography sx={{ml: 1}} fontSize='1.5rem' fontWeight={800}>Account</Typography>
                </Box>
            </Link>
        </Box>
    )
}