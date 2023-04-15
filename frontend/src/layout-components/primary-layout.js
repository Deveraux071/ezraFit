import { Box } from "@mui/material"
import { Navigation } from "../components/navigation"
import { TabPanel } from "../account-page-components/tab-panel"
export const PrimaryLayout = ({loggedIn, showTab, activeTab, children}) => {
    return (
        <Box>
            <Navigation loggedIn={loggedIn}/>
            {showTab && <TabPanel activeTab={activeTab}/>}
            {children}
        </Box>
    )
}
