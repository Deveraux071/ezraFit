import { Box } from "@mui/material"
import RegisterForm from "../components/auth-components/register-form"
import image from "../assets/background_combined.jpg"

export const Register = () => {
    return (
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
    )
}
