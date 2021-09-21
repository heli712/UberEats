import React, {useState} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import Dheader from './Dheader.js';
import './Details.css'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import Showprofile from './Showprofile';
import Profilepic from './Profilepic';
import { addingDetails } from '../app/detailActions';

const Details = () => {
    const user = useSelector((state) => state.user);
    const userDetails = useSelector((state) => state.userDetails);

    const history = useHistory();
    const dispatch = useDispatch();
    const [mobileNo, setMobileNo] = useState(userDetails.userDetails.mobileNo);
    const [email , setEmail] = useState(userDetails.userDetails.email);
    const [name, setName] = useState(userDetails.userDetails.name);
    const [DOB, setDOB] = useState(userDetails.userDetails.DOB)
    const [about, setAbout] = useState(userDetails.userDetails.about)
    const [nickname, setNickname] = useState(userDetails.userDetails.nickname)
    const [city, setCity] = useState(userDetails.userDetails.city)
    const [country, setCountry] = useState(userDetails.userDetails.country)
    const [region, setRegion] = useState(userDetails.userDetails.region)

    async function updatingDetails(event) {
        event.preventDefault();
        try {
            const sendDetails = {
                cname : name,
                email : email,
                DOB,
                nickname,
                mobileNo,
                customerId : user.user.customerId,
                about,
                country,
                city,
                region
            }
            console.log("about", sendDetails)
            dispatch(addingDetails({
                cname : name,
                email : email,
                DOB : DOB,
                nickname : nickname,
                mobileNo : mobileNo,
                customerId : user.user.customerId,
                about : about,
                country : country,
                city : city,
                region : region
            }))
            console.log("try", sendDetails)
            const response = await axios.post("http://localhost:8080/updateDetails",sendDetails)
            console.log("response", response);
        }catch(err) {
            console.log(err);
            console.log("incatch");
        }

    }
    return (
        <div>
        <Dheader />
        <div className="details">
            <div className="details_title">
               <div className="details_edit">
                    <h1 className="details_customer">{user.user.name}</h1>
               </div>
                <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                 }}
                noValidate
                 autoComplete="off"
                >
                    <div className="details_input">
                    <TextField
                        style ={{width: "350px"}}
                        id="filled-name-input"
                        label="Name"
                        type="text"
                        autoComplete="current-name"
                        defaultValue = {userDetails.userDetails.cname}
                        variant="filled"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField style ={{width: "350px"}}
                        id="filled-email-input"
                        label="Email"
                        type="email"
                        defaultValue = {userDetails.userDetails.email}
                        autoComplete="current-email"
                        variant="filled"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField style ={{width: "350px"}}
                        id="filled-password-input"
                        label="Enter mobile Number"
                        type="text"
                        autoComplete="current-mobile-number"
                        defaultValue = {userDetails.userDetails.mobileNo}
                        variant="filled"
                        value={mobileNo}
                        onChange={(e) => setMobileNo(e.target.value)}
                    />
                    <TextField style ={{width: "350px"}}
                        id="filled-password-input"
                        label="Date of birth"
                        type="date"
                        autoComplete="current-DOB"
                        defaultValue = {userDetails.userDetails.DOB}
                        variant="filled"
                        value={DOB}
                        onChange={(e) => setDOB(e.target.value)}
                    />
                    <TextField style ={{width: "350px"}}
                        id="filled-password-input"
                        label="NickName"
                        type="text"
                        autoComplete="current-password"
                        defaultValue = {userDetails.userDetails.nickname}
                        variant="filled"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                    />
                    <TextField style ={{width: "350px"}}
                        id="filled-multiline-static"
                        label="About"
                        multiline
                        rows={4}
                        variant="filled"
                        defaultValue = {userDetails.userDetails.about}
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                    />
                    <TextField style ={{width: "350px"}}
                        id="filled-email-input"
                        label="City"
                        type="text"
                        autoComplete="current-email"
                        defaultValue = {userDetails.userDetails.city}
                        variant="filled"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                   <CountryDropdown
                        value={country}
                        onChange={(val) => setCountry(val)}
                        className="details_country"
                    />{" "}
                    <RegionDropdown
                        country={country}
                        value={region}
                        defaultValue = {userDetails.userDetails.region}
                        onChange={(val) => setRegion(val)}
                        className="details_region"
                     />            
                     <Button variant="contained" className = "details_save" onClick={updatingDetails}>Save Changes</Button>
                    </div>
                </Box>
            </div>
            <div className="details_img">
                <Showprofile /> 
                <Profilepic />
            </div>
        </div>  
    </div>
    )
}

export default Details;

