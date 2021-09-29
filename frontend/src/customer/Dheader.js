import React from 'react';
import './Dheader.css'
import {Link} from 'react-router-dom';

const Dheader = () => {
    return (
        <div className="nav">
            <div className="nav__title">
                <Link to='/dashboard' style={{textDecoration:'none', color:'white'}}><h2>Uber</h2></Link>
            </div>
            <div className="nav_fun">
                <h4>Help</h4>
                <h4>Name</h4>
            </div>
        </div>
    )
}


export default Dheader;