import { Box } from "@mui/material"
import RegisterForm from "../auth-components/register-form"
import image from "../assets/background_combined.jpg"
import { Navigation } from "../components/navigation";

export const Register = () => {
    return (
        <Box>
            <Navigation loggedIn={false}/>
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
        </Box>
    )
}
