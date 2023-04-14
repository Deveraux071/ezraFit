import { Box } from "@mui/material"
import LoginForm from "../auth-components/login-form";
import image from "../assets/background_combined.jpg"
import { Navigation } from "../components/navigation";

export const Login = () => {
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
                
                <LoginForm formWidth='40%'/>
            </Box>
        </Box>
    )
}
