import { Box } from "@mui/material"
import RegisterForm from "../auth-components/register-form"
import image from "../assets/background_combined.jpg"
import { Navigation } from "../components/navigation";
import { PrimaryLayout } from "../layout-components/primary-layout";

export const Register = () => {
    return (
        <PrimaryLayout showWelcome={false} showTab={false} loggedIn={false}>
            <Box sx={{
                backgroundImage: `url(${image})`,
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <RegisterForm formWidth='40%'/>
            </Box>
        </PrimaryLayout>
    )
}
