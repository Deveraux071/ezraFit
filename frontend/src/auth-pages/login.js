import { Box } from "@mui/material"
import LoginForm from "../components/auth-components/login-form"
import image from "../assets/background_combined.jpg"

export const Login = () => {
    return (
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
    )
}
