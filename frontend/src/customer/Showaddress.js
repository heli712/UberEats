import React, {useState, useEffect}from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';



const Showaddress = () => {
    const user = useSelector((state) => state.user);
    const [address, setAddress] = useState([]);
    const [value, setValue] = React.useState();

    const handleChange = (event) => {
        console.log("Inside handleChange")
        setValue(event.target.value);
    };

    useEffect(() => {
        const getAddress = () => {
            console.log("show address", user.user.customerId)
            const cusId = {
                customerId : user.user.customerId
            }
            axios.post("http://localhost:8080/customer/getAddress", cusId).then(responseData => {
                console.log("response", responseData)
                setAddress(responseData.data)
            })
        }
        getAddress()
    }, [])
    return (
    <div style={{display: 'flex', flexDirection: "column", margin:'25px'}}>
        <p>{value}</p>
      <RadioGroup name="use-radio-group" onChange={handleChange}>
        {   
            address.map(option => (
                <div>
                <FormControlLabel key={option.caddressId} value={option.caddressId} control={<Radio />}  label={option.street} />
                        <div style={{display: 'flex', flexDirection: "row"}}>
                        <p style={{marginRight:'10px',marginTop:'-10px', marginLeft:'20px'}}>{option.city},</p>
                        <p style={{marginTop:'-10px'}}>{option.state}</p>
                        </div>
                        <p style={{marginTop:'-15px', marginLeft:'20px'}}>{option.country}</p>
             </div>
            ))
            }
            </RadioGroup>
            
    </div>
    )
}


export default Showaddress;