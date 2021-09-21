import React from 'react';
import './Headerbutton.css';
import { Link } from 'react-router-dom'

const Headerbutton = () => {
    return (
        <div className="header_cr">
            <Link to="/login" className="hb_ul">
        <div className="headerbutton">
            <div className="hbutton">
                Sign in Customer
            </div>
        </div>
        </Link>
        <Link to="/reslogin" className="hb_ul">
        <div className="headerbutton">
            <div className="hbutton">
                Sign in Resturant
            </div>
        </div>
        </Link>
        </div>
    ) 
}



export default Headerbutton;