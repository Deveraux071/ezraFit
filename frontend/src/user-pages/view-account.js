import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from "@mui/material"
import { EditButton } from "../components/edit-button"
import { PasswordChangePopup } from '../account-page-components/password-change-popup';
import { useAuth } from '../contexts/auth-context';
import { PrimaryLayout } from '../layout-components/primary-layout';
import { GridViewItem } from '../styled-grids/grid-view-item';
import { PasswordChangeComp } from '../account-page-components/password-change-comp';

export const ViewAccount = () => {
    const { user } = useAuth()
    const navigate = useNavigate();
    const [pwChange, setPwChange] = useState(false);
    return (
        <PrimaryLayout loggedIn={true} welcomeText='View Account' showWelcome={true} showTab={true} activeTab='account'>
            <Box display='flex' flexDirection='column' justifyContent='center' width='35%' alignItems='center' sx={{m:'auto'}}>
                <Box display='flex' flexDirection='row' justifyContent='flex-end' width='100%'>
                    <EditButton onClick={() => navigate('/edit')} fontSize='1.25rem' fontWeight={650}/>
                </Box>
                <GridViewItem title='Name:' text={user?.displayName}/>
                <GridViewItem title='Email:' text={user?.email}/>
                <PasswordChangeComp onClick={() => setPwChange(true)}/>
            </Box>
            <PasswordChangePopup onCancel={() => setPwChange(false)} open={pwChange}/>
        </PrimaryLayout>
    )
}
