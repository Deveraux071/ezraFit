import { Box } from "@mui/material"
import { useNavigate } from 'react-router-dom';
import { theme } from "../theme"
import { MeasuringTape } from "../assets/measuring-tape";
import { AccountIcon } from "../assets/account-icon";
import { ClothesIcon } from "../assets/clothes";
import { IndividualTab } from "./individual-tab";

export const TabPanel = ( {activeTab} ) => {
    const navigate = useNavigate()
    const tabs = [ {
            'name': 'style',
            'text': 'Style Recommendations',
            'icon': <ClothesIcon width='25px' color={activeTab === 'style' ? theme.colors.pink : theme.colors.gray}/>
        }, 
        {
            'name': 'measurements',
            'text': 'Measurements',
            'icon': <MeasuringTape width='25px' color={activeTab === 'measurements' ? theme.colors.pink : theme.colors.gray}/>
        },
        {
            'name': 'account',
            'text': 'Account',
            'icon': <AccountIcon width='25px' color={activeTab === 'account' ? theme.colors.pink : theme.colors.gray}/>
        }
    ]

    return (
        <Box display='flex' flexDirection='row' alignItems='center' justifyContent='space-evenly' height='10vh' sx={{background: 'rgba(255, 158, 158, 0.07)'}}>
            {tabs.map((tab) => {
                return (
                    <IndividualTab key={tab['name']} icon={tab['icon']} text={tab['text']} onClick={() => navigate('/'+tab['name'])} isActive={activeTab === tab['name']}/>
                )
            })}
        </Box>
    )
}