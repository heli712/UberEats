import React, {useState, useEffect}from 'react';
import Homeside from './Homeside';
import {useSelector} from 'react-redux';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Link} from 'react-router-dom';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

const modef = [
    {
        value: 'Delivery',
        label: 'Delivery'
    },
    {
        value: 'Pickup',
        label: 'Pickup'
    }
];

const statusf = [
    {
        value: 'Order placed',
        label: 'Order placed'
    },
    {
        value: 'Preparing',
        label: 'Preparing'
    },
    {
        value: 'Ready for pickup',
        label: 'Ready for pickup'
    },
    {
        value: 'Completed',
        label: 'Completed'
    }
];

const Pastorders = () => {
    const user = useSelector((state) => state.user);
    const [past, setPast] = useState([]);
    const [mode, setMode] = useState("Delivery");
    const [status, setStatus] = useState("Completed");
    useEffect(() => {
        getorders()
    },[mode,status])
    const getorders = () => {
        const cusId = {
            customerId : user.user.customerId,
            mode: mode,
            status : status,
        }
        axios.post("http://localhost:8080/resturant/pasto", cusId).then(responseData => {
            console.log("response data on past order page", responseData.data)
            setPast(responseData.data)
        })
    }
    return (
    <div>
       <Homeside />
       <div style={{display: 'flex', flexDirection: "column"}}>
            <h1 style={{marginLeft:'25px'}}>Past Orders</h1>
            <div style={{display: 'flex', flexDirection: "row"}}>
            <TextField
            style ={{width: "400px",marginLeft:'25px'}}
            id="filled-select-status"
            select
            label="Select"
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            helperText="Select the mode"
            variant="filled"
        >
        {modef.map((option) => (
            <MenuItem key={option.value} value={option.value}>
                {option.label}
            </MenuItem>
        ))}
        </TextField>
        <TextField
            style ={{width: "400px",marginLeft:'25px'}}
            id="filled-select-status"
            select
            label="Select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            helperText="Select the Status"
            variant="filled"
        >
        {statusf.map((option) => (
            <MenuItem key={option.value} value={option.value}>
                {option.label}
            </MenuItem>
        ))}
        </TextField>
        </div>
        </div>

       <div>
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Resturant</TableCell>
                    <TableCell align="right">Status</TableCell>
                    <TableCell align="right">Total($)</TableCell>
                    <TableCell align="right">Delivery</TableCell>
                    <TableCell align="right">Pickup</TableCell>
                    <TableCell align="right">Date</TableCell>
                    <TableCell align="right">Dishes</TableCell>
                </TableRow>
                </TableHead>
                {   past.length == 0 
                    ? 
                    <TableBody> 
                        <TableRow
                        key={12}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            
                        <TableCell component="th" scope="row">
                        </TableCell>
                        <TableCell align="right">-</TableCell>
                        <TableCell align="right">-</TableCell>
                        <TableCell align="right">-</TableCell>
                        <TableCell align="right">-</TableCell>
                        <TableCell align="right">-</TableCell>
                        <TableCell align="right" style={{color:'blue'}}>-</TableCell>  
                        </TableRow>    
                    </TableBody>
                    :
                    past.map(option => (
                    <TableBody> 
                        <TableRow
                        key={option.rname}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            
                        <TableCell component="th" scope="row">
                            {option.rname}
                        </TableCell>
                        <TableCell align="right">{option.statusf}</TableCell>
                        <TableCell align="right">{option.total}</TableCell>
                        <TableCell align="right">{option.delivery}</TableCell>
                        <TableCell align="right">{option.pickup}</TableCell>
                        <TableCell align="right">{option.checkoutDate}</TableCell>
                        <Link to={{pathname:`/orderdishes/${option.checkoutId}`}} style={{textDecoration:'none'}}><TableCell align="right" style={{color:'blue'}}>View Dishes</TableCell></Link>     
                        </TableRow>    
                    </TableBody>
                 ))
                }
            </Table>
            </TableContainer>
       </div>
    </div>)
}


export default Pastorders;