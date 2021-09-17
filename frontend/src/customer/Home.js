import React from 'react';
import './Home.css'
import HomeSearch from './HomeSearch';
import Header from './Header'
import Headerbutton from './Headerbutton';

const Home = () => {
    return (
        <div>
            <div className="home__background">
            <div style={{backgroundImage: `url("https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/f54fdfb464db5da7c42e62c735bdf8f1.svg")`, 
                backgroundRepeat: 'no-repeat',
                width: '610px',
                height: '812px'
            }}> <Header />
                <HomeSearch />
            </div> 
                <div></div>     
                <div style={{backgroundImage: `url("https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/bab80ef67bbbc99f2b7d45cfc395eb1b.svg")`, 
                    backgroundRepeat: 'no-repeat',
                    width: '739px',
                    height: '812px'
                }}>
                    <Headerbutton/>
                </div>
            </div>
        </div>
    )
}


export default Home;