import { Box } from "@mui/material"
import { ViewAccountForm } from "../components/account-page-components/view-account-form"
import { useNavigate } from 'react-router-dom';
import { WelcomeBanner } from "../components/welcome-banner";

export const ViewAccount = () => {

    const navigate = useNavigate();
    const name = 'Leslie Knope'
    const email = 'leslieknope@gmail.com'

    const changePW = () => {
        console.log('change')
    }

    const onEdit = () => {
        navigate('/edit')
    }

    return (
        <Box>
            <WelcomeBanner/>
            <ViewAccountForm name={name} email={email} changePW={() => changePW()} onEdit={() => onEdit()}/>
        </Box>
    )
}
