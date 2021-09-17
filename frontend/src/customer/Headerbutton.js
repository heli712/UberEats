import React from 'react';
import './Headerbutton.css';
import { Link } from 'react-router-dom'

const Headerbutton = () => {
    return (
        <Link to="/login" className="hb_ul">
        <div className="headerbutton">
            <div className="hbutton">
                Sign in
            </div>
        </div>
        </Link>
    ) 
}



export default Headerbutton;