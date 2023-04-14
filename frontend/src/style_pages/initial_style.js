import { ChangeEvent ,useState, useRef, useCallback, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { WelcomeBanner } from "../components/welcome-banner";
import { theme } from "../theme"
import { Box, Typography, Grid, Button, CardActionArea, Card, Divider } from "@mui/material"
import { EditButton } from "../components/edit-button"
import { TabPanel } from '../components/account-page-components/tab-panel';
import { PasswordChangePopup } from '../components/account-page-components/password-change-popup';
import { Navigation } from "../components/navigation";
import {useDropzone} from 'react-dropzone'
import { PinkFillButton } from '../components/pink-fill-button';
import { PinkOutlineButton } from '../components/pink-outline-button';
import axios from 'axios'
import '../user-pages/view-measurements.css';
import { getAuth } from 'firebase/auth';
import { onValue, ref, set, get } from "firebase/database";
import { useAuth, useDatabase } from '../contexts/auth-context';
import { ContentBox } from '../components/box-component';

export const InitialStylePage = () => {

    // const [file, setFile] = useState()
    const file = useRef(null)
    const [uploaded, setUploaded] = useState(false)
    let preference_values = []
    const [preferences, setPreferences] = useState([['Article Type'], ['Usage'], ['Season'], ['Colour']])
    const db = useDatabase();
    const { user } = useAuth()
    // const [userId, setUserId] = useState(null)
    
    const handleFileUpload = async (event) => {
        // setFile(event.target.files[0])
        await file.current.click()
        handleSubmit()
    }

    // const getUserID = () => {
    //     setUserId(getAuth().currentUser.uid)
    //     return "ok"
    // }

    useEffect(() => {
            const docRef = ref(db, '/users/' + user?.uid + '/preferences')
            onValue(docRef, (snapshot) => {
            if (snapshot.exists()){
                const pref_list = snapshot.val()
                let starter = [['Article Type'], ['Usage'], ['Season'], ['Colour']]
                let i = 0
                starter.map(s => {
                    s.push(pref_list[i])
                    i += 1
                })
                setPreferences(starter)
            }
            })
        }, [user]) 
        

    const handleSubmit = () => {
        
        console.log('here')
        const url = 'http://localhost:5000/predict_all'
        const formData = new FormData()
        formData.append('file', acceptedFiles[0])
        formData.append('fileName', acceptedFiles[0].path)
        const config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'content_type' : 'multipart/form-data'
            },
        }
        
        const userId = getAuth().currentUser.uid;
        // userName = getAuth().currentUser.displayName

        axios.post(url, formData, config).then((res) => {
            // preference_values = res
            let new_preferences = []
            let result = res.data
            console.log(result[0])
            let i = 0
            preferences.map(p => {
                new_preferences[i] = p.concat([result[i]])
                i += 1
            })
            set(ref(db, '/users/' + userId), {
                username: getAuth().currentUser.displayName,
                email: getAuth().currentUser.email,
                preferences: result
                })
            console.log(res)
            console.log(new_preferences)
            setPreferences(new_preferences)
            console.log(preferences[0][0])
        })
    }

    const handleCancel = () => {
        setUploaded(false)
    }

    const onDrop = useCallback(uploaded_file => {
        setUploaded(true)
        console.log(uploaded_file)
    })


    const {acceptedFiles, getRootProps, getInputProps, isDragActive} = useDropzone({maxFiles:1, onDrop})

    const uploaded_files = acceptedFiles.map(f => (
        <div>{f.path}</div>
    ))
    
    return(
        <Box>
            <Navigation loggedIn={true}/>
            <WelcomeBanner text='My Style Recommendations'/>
            <TabPanel activeTab='style'/>
            <Box marginLeft={'10%'} marginRight={'10%'} marginTop={'2%'} marginBottom={'10%'}>
                <Typography fontSize='1.5rem' fontWeight={650}>No Recommendations yet!</Typography>
                <div style={{background:'rgba(255, 158, 158, 0.2)'}}>
                    <Typography fontSize='1.5rem' fontWeight={650} marginTop={'1.5%'}>Your Preferences</Typography>
                </div>
                {preferences[0].length == 1? 
                
                <Typography fontSize='1rem' fontWeight={500} marginTop={'1.5%'}>No preferences set yet. Upload an image of your preferred style below and we will take care of the rest!</Typography>
                : <Typography fontSize='1rem' fontWeight={500} marginTop={'1.5%'}>Update your preferences by uploading an image below!</Typography>}
                <ContentBox preferences={preferences}>
                </ContentBox>
                <div style={{background:'rgba(255, 158, 158, 0.2)'}}>
                    <Typography fontSize='1.5rem' fontWeight={650} marginTop={'1.5%'}>Update your Preferences</Typography>
                </div>
                    {uploaded === false ?
                    <Box display='flex' flexDirection='column' justifyContent='center' width='100%' alignItems='center' sx={{m:'auto'}} paddingTop={'5%'}>
                        <div className='container'>
                            <div style={{borderStyle:'solid', marginLeft: '10%', width:'80%', borderColor:theme.colors.pink, borderWidth: '2px', textAlign:'center', padding:'1%'}} {...getRootProps()}>
                                <input {...getInputProps()}/>
                                {
                                    <div>
                                        <p style={{color:theme.colors.pink, fontSize:'1.25rem', fontWeight:650}}> Upload an Image and update your preferences</p>
                                        <p style={{color:theme.colors.gray, fontSize:'1.25rem', fontWeight:650}}> Click here to upload an image that shows your style and we will recommend clothes that match it!</p>
                                    </div>
                                }
                            </div>
                        </div>
                        {/* <Box display='flex' flexDirection='row' justifyContent='center' width='80%'>
                            <Button variant='outlined' onClick={handleFileUpload} sx={{width:'70%', borderColor:theme.colors.pink, borderWidth: '2px', 
                            padding:'4%', paddingLeft:'3%', paddingRight:'3%', textTransform:'none'}}>
                                <div>
                                    <input ref={file} type='file' style={{display:'none'}}/>
                                    <Typography color={theme.colors.pink} align='center' fontSize={'1.25rem'} paddingRight={'3%'}>
                                        Upload Images
                                    </Typography> */}
                                    {/* <Divider orientation="vertical" variant="middle" flexItem/> */}
                                    {/* <Typography color={theme.colors.gray} align='center' fontSize={'1.25rem'} marginTop={'2%'}>
                                        Upload images that show your style and we will recommend clothes that match it!
                                    </Typography>
                                </div>
                            </Button>
                        </Box> */}
                    </Box>:
                    <Box width='100%' alignItems='center' paddingLeft={'25%'} paddingRight={'25%'} paddingTop={'5%'}>
                        <Box textAlign={'center'} fontSize={'1.5rem'}>Confirm your file</Box>
                        <Box textAlign={'center'} color={theme.colors.gray} fontSize={'1.25rem'}>{uploaded_files}</Box>
                        <Box paddingLeft={'32%'} marginTop={'3%'}>
                            <PinkFillButton text={'Submit'} onClick={handleSubmit}></PinkFillButton>
                            <PinkOutlineButton text={'Cancel'} onClick={handleCancel}></PinkOutlineButton>
                        </Box>
                    </Box>}
            </Box>
        </Box> 
    )
}