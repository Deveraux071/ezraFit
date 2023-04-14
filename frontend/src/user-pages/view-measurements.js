import { useState, useEffect } from 'react';
import { Box } from "@mui/material"
import { WelcomeBanner } from "../components/welcome-banner";
import { TabPanel } from '../components/account-page-components/tab-panel';
import { Navigation } from "../components/navigation";
import './view-measurements.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useAuth, useDatabase } from '../contexts/auth-context';
import { onValue, ref, get } from "firebase/database";


export const ViewMeasurements = () => {
    // TODO: make the measurements dynamic (connect to backend)
    // weight is in lb, the rest in inches
    const { user } = useAuth()
    const db = useDatabase();
    const [measurements, setMeasurements] = useState([['CHEST'], ['HIP'], ['LEG'], ['SHOULDER'], ['SLEEVE'], ['WAIST']])
   
    useEffect(() => {
        const dbRef = ref(db, '/users/' + user.uid + '/data');
        onValue(dbRef, (snapshot) => {
        if (snapshot.exists()){
            const measure_list = snapshot.val()
            let i = 0
            const new_measurements = []
            Object.entries(measure_list)
            .map(([key, value]) => new_measurements.push([key.toUpperCase(), value]) )
            setMeasurements(new_measurements)
        }
        })
    }, [user]) 

    return (
        <div>
            <Navigation loggedIn={true}/>
            <WelcomeBanner text='My Measurements'/>
            <TabPanel activeTab='measurements'/>
            <Box className='main-content'>
                <TableContainer sx={{ width: 160, boxShadow: "none" }} component={Paper}>
                    <Table aria-label="simple table">
                        <TableBody >
                        {measurements.map((preference) => (
                                <TableRow
                                    key={preference}
                                    sx={{ 'td, th': { border: 0 }, 'th': { fontWeight: 1000 } }}>
                                <TableCell component="th" scope="row" className='measurement-label'>
                                    {preference[0]}
                                </TableCell>
                                <TableCell align="center">
                                    {preference[1]} 
                                </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </div>
    )
}