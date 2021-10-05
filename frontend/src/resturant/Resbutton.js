import React from 'react';
import './Resbutton.css'
import { Link,useHistory} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { logoutResturant } from '../app/resActions';


const Resbutton = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    function signout() {
        dispatch(logoutResturant());
        localStorage.setItem('token',null);
        history.push("/");
    }
    return (
        <div className="head_cr">
            <Link to="/home" className="heb_ul">
            <div className="headbutton">
                <div className="hebutton" onClick={signout}>
                    Sign out
                </div>
            </div>
            </Link>
            <Link to="/addish" className="heb_ul">
            <div className="headbutton">
                <div className="hebutton">
                    Add Dish
                </div>
            </div>
            </Link>
        </div>
    )
}


export default Resbutton;