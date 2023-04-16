import { Box, Typography, Dialog } from "@mui/material"
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { PinkOutlineButton } from "../components/pink-outline-button"
import { PinkFillButton } from "../components/pink-fill-button"
import { useAuth } from "../contexts/auth-context";
import { useState } from "react";
import { theme } from "../theme";
import { GridFormItem } from "../styled-grids/grid-form-item";

export const PasswordChangePopup = ( {onCancel, open} ) => {
    const { updatePW } = useAuth()
    const [err, setErr] = useState('')
    const [oldPw, setOldPw] = useState('')
    const [newPw, setNewPw] = useState('')
    const [newPwRep, setNewPwRep] = useState('')

    const onSave = async (e) => {
        e.preventDefault()
        if (!oldPw && !newPw && !newPwRep) {
            onCancel()
        }
        else if (oldPw !== localStorage.getItem('password')) {
            setErr('Current password is incorrect.')
        }
        else if (!newPw || !newPwRep || newPw !== newPwRep) {
            setErr('New passwords do not match.')
        }
        else {
            await updatePW(newPw).then(() => {
                localStorage.setItem('password', newPw)
                onCancel()
            }).catch(() => {setErr('Failed to update password. Try again.')})
        }
    }

    return (
        <Dialog onClose={onCancel} open={open} fullWidth maxWidth='lg'>
            <Box component='form' onSubmit={onSave} noValidate display='flex' flexDirection='column' justifyContent='center' width='100%' alignItems='center' sx={{m:'auto', p:4,  zIndex: 100, borderRadius: '20px', boxShadow: 2}}>
                <Typography fontSize='1.5rem' fontWeight={650}>Change Password</Typography>
                <GridFormItem title='Current Password' id='current_pw' onChange={(e) => setOldPw(e.target.value)}/>
                <GridFormItem title='New Password' id='new_pw' onChange={(e) => setNewPw(e.target.value)}/>
                <GridFormItem title='Confirm New Password' id='con_new_pw' onChange={(e) => setNewPwRep(e.target.value)}/>
                <Box width='100%' display='flex' flexDirection='row' justifyContent='flex-end' sx={{mt: 3}}>
                    <PinkOutlineButton text='Cancel' onClick={onCancel} width='15%'/>
                    <PinkFillButton text='Save Changes' width='25%' type='submit'/>
                </Box>
                {err ? <Typography display='flex' justifyContent="center" textAlign="center" alignItems="center" fontSize='1.5rem' color={theme.colors.red}>
                        <ErrorOutlineIcon/>
                        {err}
                    </Typography> : null
                }
            </Box>
        </Dialog>
    )
}