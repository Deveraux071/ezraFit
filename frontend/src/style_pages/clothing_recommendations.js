import { useState, useEffect } from 'react';
import axios from 'axios'
import { onValue, ref } from "firebase/database";
import { useAuth, useDatabase } from '../contexts/auth-context';
import { Box, Typography } from "@mui/material"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useUserPreferences } from '../hooks/get_user_preferences';


export const ClothingRecommendationsPage = () => {
    const initialPreferences = [['Article Type'], ['Usage'], ['Season'], ['Colour']]
    const [preferences, setPreferences] = useState([])
    useUserPreferences({
        initialPreferences: initialPreferences,
        setPreferences: setPreferences
    });
    const [keywords, setKeywords] = useState([])

    // calcualte keywords if the preferences are set
    useEffect(() => {
        // console.log("preferences changed")
        if (preferences.length > 0 && keywords.length === 0) {
            getKeywords()
        }
    }, [preferences]);
    
    const getKeywords = () => {
        // console.log("getting keywords")

        // let url = 'https://ezrafit-backend.onrender.com/get-keywords'
        let url = 'http://localhost:5000/get-keywords'
        // add preferences as query params
        url += preferences[0] ? "?" : ""
        preferences.forEach((preference) =>
            url += `${encodeURIComponent(preference[0])}:${encodeURIComponent(preference[1])}&`
        )
        url = url.substring(url.length - 1) === "&" ? url.substring(0, url.length-1) : url  // remove last char if it's "&"
        // console.log("url: ", url)

        const config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'content_type' : 'multipart/form-data'
            },
        }

        axios.get(url, config).then((res) => {
            // console.log("result:", res.data)
            setKeywords(res.data)
        })
    }

    return (
        <Box sx={{padding:"30px", width:"100%"}}>
            <Typography>Zoe's Boutique</Typography>
            <Typography>Here are some keywords that can be inputted into the store's search bar:</Typography>
            <TableContainer sx={{ width: "100%", boxShadow: "none" }} component={Paper}>
                <Table>
                    <TableBody>
                    {keywords.map((keyword) => (
                        <TableRow key={keyword} sx={{ 'td, th': { border: 0 }}}>
                            <TableCell align="left">
                                {keyword} 
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}
