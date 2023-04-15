import { useState, useEffect } from 'react';
import axios from 'axios'
import { Helmet } from 'react-helmet';
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

    // calculate keywords if the preferences are set
    useEffect(() => {
        if (preferences.length > 0 && keywords.length === 0) {
            getKeywords()
        }
    }, [preferences]);
    
    const getKeywords = () => {

        // let url = 'https://ezrafit-backend.onrender.com/get-keywords'
        let url = 'http://localhost:5000/get-keywords'
        // add preferences as query params
        url += preferences[0] ? "?" : ""
        preferences.forEach((preference) =>
            url += `${encodeURIComponent(preference[0])}:${encodeURIComponent(preference[1])}&`
        )
        url = url.substring(url.length - 1) === "&" ? url.substring(0, url.length-1) : url  // remove last char if it's "&"

        const config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'content_type' : 'multipart/form-data'
            },
        }

        axios.get(url, config).then((res) => {
            setKeywords(res.data)
        })
    }

    return (
        <Box sx={{padding:"30px", width:"100%"}}>
            <Helmet>
                <title>EzraFit Recommendations | Zoe's Boutique</title>
            </Helmet>
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
