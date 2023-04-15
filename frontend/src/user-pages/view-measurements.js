import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from "@mui/material"
import { WelcomeBanner } from "../components/welcome-banner";
import { TabPanel } from '../account-page-components/tab-panel';
import { Navigation } from "../components/navigation";
import './view-measurements.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { PrimaryLayout } from '../layout-components/primary-layout';
import { PinkOutlineButton } from '../components/pink-outline-button';

export const ViewMeasurements = () => {
    // TODO: make the measurements dynamic (connect to backend)
    // weight is in lb, the rest in inches
    const navigate = useNavigate()
    const [measurements, setMeasurements] = useState([
        ["Height", 64],
        ["Weight", 130],
        ["Waist", 25],
        ["Legs", 28],
    ]);


    return (
        <PrimaryLayout loggedIn={true} welcomeText='My Measurements' showWelcome={true} showTab={true} activeTab='measurements'>
            <Box className='main-content'>
                <TableContainer sx={{ width: 160, boxShadow: "none" }} component={Paper}>
                    <Table aria-label="simple table">
                        <TableBody>
                        {measurements.map((measurement) => (
                            <TableRow
                                key={measurement}
                                sx={{ 'td, th': { border: 0 }, 'th': { fontWeight: 1000 } }}>
                            <TableCell component="th" scope="row" className='measurement-label'>
                                {measurement[0]}
                            </TableCell>
                            <TableCell align="right">
                                {/* all measurements are in inches, except for weight */}
                                {`${measurement[1]} ${(measurement[0].localeCompare("Weight") !== 0) ? "in" : "lb"}`}
                            </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            <PinkOutlineButton text='Take Pictures' onClick={() => navigate('/take-image')}/>
        </PrimaryLayout>
    )
}