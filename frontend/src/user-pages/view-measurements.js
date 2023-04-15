import { useState, useEffect } from 'react';
import { Navigation } from "../components/navigation";
import './view-measurements.css';
import { useAuth, useDatabase } from '../contexts/auth-context';
import { onValue, ref, get } from "firebase/database";
import { ContentBox } from '../components/box-component';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { Box } from "@mui/material"
import './view-measurements.css';
import { PrimaryLayout } from '../layout-components/primary-layout';
import { PinkOutlineButton } from '../components/pink-outline-button';

export const ViewMeasurements = () => {
    // TODO: make the measurements dynamic (connect to backend)
    // weight is in lb, the rest in inches
    const navigate = useNavigate();
    const { user } = useAuth()
    const db = useDatabase();
    const [measurements, setMeasurements] = useState([['CHEST'], ['HIP'], ['LEG'], ['SHOULDER'], ['SLEEVE'], ['WAIST']])
   
    useEffect(() => {
        const dbRef = ref(db, '/users/' + user?.uid + '/data');
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
        <PrimaryLayout loggedIn={true} showTab={true} activeTab='measurements'>
            <Helmet>
                <title>My Measurements | EzraFit</title>
            </Helmet>
            <ContentBox preferences={measurements}>
            </ContentBox>
            <Box textAlign='center'>
                <PinkOutlineButton text='Take Pictures' onClick={() => navigate('/take-image')}/>
            </Box>
        </PrimaryLayout>

    )
}