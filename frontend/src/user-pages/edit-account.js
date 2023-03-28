import { Box } from "@mui/material"
import { useNavigate } from 'react-router-dom';
import { WelcomeBanner } from "../components/welcome-banner";
import { EditAccountForm } from "../components/account-page-components/edit-account-form";

export const EditAccount = () => {
    const navigate = useNavigate();
    const name = 'Leslie Knope'
    const email = 'leslieknope@gmail.com'

    const changePW = () => {
        console.log('change')
    }

    const onDelete = () => {
        console.log('delete')
        //navigate('/edit')
    }

    const onCancel = () => {
        navigate('/account')
    }

    const onSave = () => {
        console.log('save')
        //navigate('/edit')
    }
    return (
        <Box>
            <WelcomeBanner/>
            <EditAccountForm name={name} email={email} changePW={() => changePW()} onDelete={() => onDelete()} onCancel={() => onCancel()} onSave={() => onSave()}/>
        </Box>
    )
}