import { useState, useEffect } from 'react';
import { WelcomeBanner } from "../components/welcome-banner";
import { TabPanel } from '../components/account-page-components/tab-panel';
import { Navigation } from "../components/navigation";
import './view-measurements.css';
import { useAuth, useDatabase } from '../contexts/auth-context';
import { onValue, ref, get } from "firebase/database";
import { ContentBox } from '../components/box-component';

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
            <ContentBox preferences={measurements}>
            </ContentBox>
        </div>
    )
}