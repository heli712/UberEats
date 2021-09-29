import React from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import './Header.css';
import Sidebar from './Sidebar'

const Header = () => {

    return (
        <div className="header">
            <div className="header__icons">
                <Sidebar />
            </div>
        </div>
    )
}



export default Header;