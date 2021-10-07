import React,{useState, useEffect} from 'react';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';


const statusf = [
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
const Status = ({checkoutId}) => {
    const [status, setStatus] = useState();
    const [message,setMessage] = useState();
    const [dstatus, setDstatus] = useState()
    useEffect(() => {
        showstatus()
    },[])
    
    const showstatus = () => {
        const check = {
            checkoutId: checkoutId
        }
        axios.post("http://localhost:8080/resturant/checkstatus",check).then(responseData => {
            console.log("status",responseData.data[0].statusf)
            setStatus( responseData.data[0].statusf)
        })
    }
    const getstatus = async () => {
        const stat = {
            checkoutId:checkoutId,
            statusf:status
        }
        const res = await axios.post("http://localhost:8080/resturant/status",stat);
        console.log("response", res);
        setMessage(res.data.message);
    }
    return (
    <div style={{ display: 'flex', flexDirection: "column",marginTop:'50px', marginLeft:'50px'}}>
        <div style={{marginLeft:'25px'}}>
        <TextField
            style ={{width: "400px"}}
            id="filled-select-cuisine"
            select
            label="Select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            helperText="Change the status"
            variant="filled"
        >
        {statusf.map((option) => (
            <MenuItem key={option.value} value={option.value}>
                {option.label}
            </MenuItem>
        ))}
        </TextField>
       </div>
        <div>
        <Button style={{margin:'25px', backgroundColor:'green', color:'white', width:'400px',height:'50px',border:'1px solid green'}} onClick={getstatus}>Update the status</Button>
        </div>
        <p>Current Status: {status}</p>
        <p>{message}</p>
    </div>
    )
}

export default Status;