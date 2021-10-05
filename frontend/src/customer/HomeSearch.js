import React from 'react';
import './HomeSearch.css'
import RoomIcon from '@material-ui/icons/Room';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import {Link} from 'react-router-dom';

const HomeSearch = () => {
    return (
        <div className="homesearch">
            <div className="homesearch_title">
                <h1>Order your neighborhood's top spots</h1>
                <div className="homesearch__input">
                    <div className="homesearch__address">
                        <div style={{padding:'15px'}}><RoomIcon /></div>
                        <input placeholder="Enter delivery address"></input>
                    </div>
                    <div className="homesearch__space"></div>
                    <div className="homesearch__delivery">
                        <div style={{padding:'15px'}}><WatchLaterIcon size="large"/></div>
                        <input placeholder="Deliver now"></input>
                    </div>
                    <div className="homesearch__space"></div>
                    <button>Find Food</button>
                </div>
                <div className="homesearch__line">
                    <Link to="/login" className="hs_ul"><p className="homesearch__signin">Sign In</p></Link>
                    <p>for your recent addresses</p>
                </div>
            </div>
        </div>
    )
}


export default HomeSearch;