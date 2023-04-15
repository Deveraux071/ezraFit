import { Box } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export const ContentBox = ( { preferences }) => {
    return (
        <Box className='main-content' sx= {{ display: 'flex', alignItems: "center", width: 400, marginLeft: "auto", marginRight: "auto"}}>
            <TableContainer sx={{ width: 300, boxShadow: "none" }} component={Paper}>
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
)
}