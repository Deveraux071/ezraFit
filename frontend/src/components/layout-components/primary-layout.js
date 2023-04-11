import { Box } from "@mui/material"
import { Navigation } from "../navigation"
import { TabPanel } from "../account-page-components/tab-panel"
import { WelcomeBanner } from "../welcome-banner"
export const PrimaryLayout = ({loggedIn, welcomeText, showWelcome, showTab, activeTab, children}) => {
    return (
        <Box>
            <Navigation loggedIn={loggedIn}/>
            {showWelcome && <WelcomeBanner text={welcomeText}/>}
            {showTab && <TabPanel activeTab={activeTab}/>}
            {children}
        </Box>
    )
}