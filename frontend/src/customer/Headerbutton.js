import React from 'react';
import './Headerbutton.css';
import { Link } from 'react-router-dom'

const Headerbutton = () => {
    return (
        <div className="header_cr">
            <Link to="/login" className="hb_ul">
        <div className="headerbutton">
            <div className="hbutton">
                Sign in 
            </div>
        </div>
        </Link>
        </div>
    ) 
}



export default Headerbutton;