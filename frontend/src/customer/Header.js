import React from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import './Header.css';

const Header = () => {
    return (
        <div className="header">
            <div className="header__icons">
                <MenuIcon />
                <img className="header__logo" 
                    src="https://d1a3f4spazzrp4.cloudfront.net/arch-frontend/1.1.1/d1a3f4spazzrp4.cloudfront.net/eats/eats-logo-1a01872c77.svg"
                    alt=""
                />
            </div>
        </div>
    )
}



export default Header;