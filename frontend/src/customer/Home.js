import React from 'react';
import './Home.css'
import HomeSearch from './HomeSearch';
import Headerbutton from './Headerbutton';
import Sidebar from './Sidebar'

const Home = () => {
    return (
        <div>
            <div className="home__background">
            <div style={{backgroundImage: `url("https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/7f3767e1f1931a0b3d5e2af48b47575b.svg")`, 
                backgroundRepeat: 'no-repeat',
                width: '593px',
                height: '812px',
                minHeight: '100%'
            }}> <Sidebar />
                <HomeSearch />
            </div> 
                <div></div>     
                <div style={{backgroundImage: `url("https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/57dc47b168662ba80b01c66ed1e1420c.svg")`, 
                    backgroundRepeat: 'no-repeat',
                    width: '635px',
                    height: '812px',
                    minHeight: '100%'
                }}>
                    <Headerbutton/>
                </div>
            </div>
        </div>
    )
}


export default Home;