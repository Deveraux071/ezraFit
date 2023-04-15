import { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { getAuth } from 'firebase/auth';
import { ref, set } from "firebase/database";
import { useDatabase } from '../contexts/auth-context';
import { theme } from "../theme";
import { useDropzone } from 'react-dropzone';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableRow, Paper } from "@mui/material";
import { SubHeading } from '../components/sub-heading';
import { PinkOutlineButton } from '../components/pink-outline-button';
import Popup from  '../components/popup';
import { useUserPreferences } from '../hooks/get_user_preferences';
import { PrimaryLayout } from '../layout-components/primary-layout';

export const InitialStylePage = () => {
    const navigate = useNavigate();
    const db = useDatabase();
    const onDrop = () => { setUploaded(true) }
    const {acceptedFiles, getRootProps, getInputProps} = useDropzone({maxFiles:1, onDrop})
    const [uploaded, setUploaded] = useState(false)
    const initialPreferences = [['Article Type'], ['Usage'], ['Season'], ['Colour']]
    const [preferences, setPreferences] = useState([])
    useUserPreferences({
        initialPreferences: initialPreferences,
        setPreferences: setPreferences
    });
        

    const handleSubmit = () => {
        // const url = 'https://ezrafit-backend.onrender.com/predict_all'
        const url = 'http://localhost:5000/predict_all'
        const formData = new FormData()
        formData.append('file', acceptedFiles[0])
        formData.append('fileName', acceptedFiles[0].path)
        const config = {
            headers: {'Access-Control-Allow-Origin': '*', 'content_type' : 'multipart/form-data'},
        }

        const currentUser = getAuth().currentUser
        if (typeof currentUser !== "undefined") {
            const userId = currentUser.uid;

            axios.post(url, formData, config).then((res) => {
                const new_preferences = [...initialPreferences]  // shallow copy of array
                const result = res.data

                new_preferences.forEach((p, i) => {
                    p.push(result[i])
                })
                set(ref(db, '/users/' + userId), {
                    username: currentUser.displayName,
                    email: currentUser.email,
                    preferences: result
                })
                
                setPreferences(new_preferences)
            })
        }
    }

    const handleCancel = () => {
        setUploaded(false)
    }
    
    return(
        <PrimaryLayout loggedIn={true} welcomeText='My Style Recommendations' showWelcome={true} showTab={true} activeTab='style'>
            <Helmet>
                <title>My Style Recommendations | EzraFit</title>
            </Helmet>
            <Box margin="40px">
                {preferences ? 
                    <div>
                    <Typography fontSize='1.5rem' fontWeight={650}>No Recommendations yet!</Typography> 
                        <Typography fontSize='1rem' fontWeight={500} marginTop={'1.5%'}>Upload an image of your preferred style below and we will take care of the rest!</Typography>
                    </div>
                    : <div>
                        <PinkOutlineButton text={"Get Recommendations"} onClick={() => navigate('/clothing-store')}/>
                        <Typography sx={{marginBottom: "30px"}}>You will be redirected to the Clothing Store you last shopped at.</Typography>
                <SubHeading title="My Preferences"/>
                        <Typography fontSize='1rem' fontWeight={500} marginTop={'1.5%'}>These preferences are based on what we gathered from the image you uploaded.</Typography>
                        <Box className='main-content'>
                            <TableContainer sx={{ width: 250, boxShadow: "none" }} component={Paper}>
                                <Table aria-label="simple table">
                                    <TableBody>
                                    {preferences.map((preference) => (
                                        <TableRow
                                            key={preference}
                                            sx={{ 'td, th': { border: 0 }, 'th': { fontWeight: 1000 } }}>
                                        <TableCell component="th" scope="row" className='measurement-label'>
                                            {preference[0]}
                                        </TableCell>
                                        <TableCell align="right">
                                            {preference[1]} 
                                        </TableCell>
                                        </TableRow>
                                    ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                        <SubHeading title={`${preferences.length === 0 ? "Set" : "Update"} Preferences`}/>
                        <Typography fontSize='1rem' fontWeight={500} marginTop={'1.5%'}>{preferences.length === 0 ? "Set" : "Update"} your preferences by uploading {preferences.length === 0 ? "an" : "another"} image!</Typography>
                    </div>
                }
                
                <Popup buttonText="Add Image" title="Add Style Image" submitText="Add" onSubmit={handleSubmit} onCancel={handleCancel} enableSubmit={!uploaded}>
                {!uploaded ?
                    <div style={{borderStyle:'solid', marginLeft: '10%', width:'80%', borderColor:theme.colors.pink, borderWidth: '2px', textAlign:'center', padding:'1%'}} {...getRootProps()}>
                        <input {...getInputProps()}/>
                        <div>
                            <p style={{color:theme.colors.pink, fontSize:'1.25rem', fontWeight:650}}> Upload an Image and update your preferences</p>
                            <p style={{color:theme.colors.gray, fontSize:'1.25rem', fontWeight:650}}> Click here to upload an image that shows your style and we will recommend clothes that match it!</p>
                        </div>
                        </div>
                        : <Box width='100%' alignItems='center'>
                        <Typography fontSize={'1.25rem'} marginBottom={'10px'}>
                            Your uploaded image:
                        </Typography>
                        <img style={{width:"100%"}} alt="The image you uploaded" src={URL.createObjectURL(acceptedFiles[0])}/>
                        <Typography sx={{textAlign:'center', color:theme.colors.gray, fontSize:'1.25rem'}}>
                            {acceptedFiles[0].path}
                        </Typography>
                    </Box>
                }
                </Popup>
            </Box>
        </PrimaryLayout>
    )
}
