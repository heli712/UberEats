import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Link} from 'react-router-dom'


const Orderdetails = ({rname,status,total,delivery,pickup,date,resId}) => {
    console.log("ndjnfdk", resId);
    return (<div>
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
        <TableBody> 
            <TableRow
              key={rname}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                
              <TableCell component="th" scope="row">
                {rname}
              </TableCell>
              <TableCell align="right">{status}</TableCell>
              <TableCell align="right">{total}</TableCell>
              <TableCell align="right">{delivery}</TableCell>
              <TableCell align="right">{pickup}</TableCell>
              <TableCell align="right">{date}</TableCell>
              <Link to={{pathname:`/orderdishes/${resId}`}} style={{textDecoration:'none'}}><TableCell align="right" style={{color:'blue'}}>View Dishes</TableCell></Link>     
            </TableRow>    
        </TableBody>
      </Table>
    </TableContainer>
    </div>)
}


export default Orderdetails;