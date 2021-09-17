import React, {useState} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { addingDetails } from '../features/detailsSlice';
import { selectUser } from '../features/userSlice';
import axios from 'axios';
import {useHistory} from 'react-router-dom';

const Details = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [mobileNo, setMobileNo] = useState();
    const [DOB, setDOB] = useState()
    const [about, setAbout] = useState()
    const [nickname, setNickname] = useState()
    const user = useSelector(selectUser);
    console.log("key", user.key)
    async function updatingDetails(event) {
        event.preventDefault();
        try {
            const sendDetails = {
                cname : user.name,
                email : user.email,
                DOB,
                nickname,
                mobileNo,
                customerId : user.customerId,
                about
            }
            console.log("try", sendDetails)
            
            const response = await axios.post("http://localhost:8080/updateDetails",sendDetails)
            console.log("response", response);
            if(response.data.success == 1){
                dispatch(addingDetails({
                    cname: user.name,
                    email: user.email,
                    DOB,
                    nickname,
                    mobileNo,
                    customerId: user.customerId,
                    about
                }))
            }
        }catch(err) {
            console.log(err);
            console.log("incatch");
        }
    }

    function profilepic() {
        history.push("/profilepic")
    }
    return (
    <div>
        <form onSubmit={updatingDetails}>
            <input placeholder="Enter mobile number" value={mobileNo} onChange={(e) => setMobileNo(e.target.value)} ></input>
            <input placeholder="Enter you date of birth" value={DOB} onChange={(e) => setDOB(e.target.value)}></input>
            <input placeholder="Nickname" value={nickname} onChange={(e) => setNickname(e.target.value)}></input>
            <input placeholder="About" value={about} onChange={(e) => setAbout(e.target.value)}></input> 
            <button type="submit">Save Changes</button>
        </form>
        <button placeholder="enter profile pic " onClick={profilepic}>Update profile pic</button>
        <img src={`https://localhost:8080/images/${user.key}`}></img>
    </div>
    )
}


export default Details;